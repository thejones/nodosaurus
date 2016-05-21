var stripeEvents = require('./stripe/stripe-events'),
    config = require('config'),
    Joi = require('joi'),
    preware = require('./preware'),
    Boom = require('boom'),
    createSendToken = require('./../../../helpers/jwt');

exports.webhooks = {
    auth: false,
    handler: stripeEvents
};

exports.postBilling = {
    pre: [
        preware.userByID
    ],
    handler: function(request, reply){
        var user = request.user;
        var stripeToken = request.payload.stripeToken;

        if(!stripeToken){
            reply(Boom.badRequest("Please provide a valid card"));
        }

        user.setCard(stripeToken, function (err) {
            if (err) {
                if(err.code && err.code == 'card_declined'){
                    return reply(Boom.badRequest('Your card was declined. Please provide a valid card.'));

                }
                return reply(Boom.badRequest('Unexpected error. Please contact us for support.'));
            }
            reply('Billing has been updated.');

        });

    }
};

exports.postPlan = {
    // validate: {
    //     payload: {
    //         plan: Joi.string().required(),
    //         stripeToken: Joi.string().allow('')
    //     }
    // },
    pre: [
        preware.userByID
    ],
    handler: function(request, reply){
        var user = request.user;
        var plan = request.payload.plan;
        var stripeToken = null;

        if(plan){
            plan = plan.toLowerCase();
        }

        if(request.user.stripe.plan == plan){
            reply('No change to plan');
        }

        if(request.payload.stripeToken){
            stripeToken = request.payload.stripeToken;
        }

        if(!request.user.stripe.last4 && !request.payload.stripeToken){
            return reply(Boom.badRequest('Please add a card to your account before choosing a plan.'));

        }


        user.setPlan(plan, stripeToken, function (err) {
            var msg;

            if (err) {
                if(err.code && err.code == 'card_declined'){
                    msg = 'Your card was declined. Please provide a valid card.';
                } else if(err && err.message) {
                    msg = err.message;
                } else {
                    msg = 'An unexpected error occurred.';
                }

                return reply(Boom.badRequest(msg));

            }

            createSendToken(user, reply);
        });

    }
};
