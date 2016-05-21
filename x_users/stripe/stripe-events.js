'use strict';

var mongoose = require('mongoose'),
    models = require('./../../../../models'),
    User = mongoose.model('User'),
    Boom = require('boom');


var knownEvents = {
    'account.updated': function(request, reply) {
        console.log(request.payload.type + ': event processed');
        reply();
    },
    'account.application.deauthorized': function(request, reply) {
        console.log(request.payload.type + ': event processed');
        reply();
    },
    'application_fee.created': function(request, reply) {
        console.log(request.payload.type + ': event processed');
        reply();
    },
    'application_fee.refunded': function(request, reply) {
        console.log(request.payload.type + ': event processed');
        reply();
    },
    'balance.available': function(request, reply) {
        console.log(request.payload.type + ': event processed');
        reply();
    },
    'charge.succeeded': function(request, reply) {
        console.log(request.payload.type + ': event processed');
        reply();
    },
    'charge.failed': function(request, reply) {
        console.log(request.payload.type + ': event processed');
        reply();
    },
    'charge.refunded': function(request, reply) {
        console.log(request.payload.type + ': event processed');
        reply();
    },
    'charge.captured': function(request, reply) {
        console.log(request.payload.type + ': event processed');
        reply();
    },
    'charge.updated': function(request, reply) {
        console.log(request.payload.type + ': event processed');
        reply();
    },
    'charge.dispute.created': function(request, reply) {
        console.log(request.payload.type + ': event processed');
        reply();
    },
    'charge.dispute.updated': function(request, reply) {
        console.log(request.payload.type + ': event processed');
        reply();
    },
    'charge.dispute.closed': function(request, reply) {
        console.log(request.payload.type + ': event processed');
        reply();
    },
    'customer.created': function(request, reply) {
        console.log(request.payload.type + ': event processed');
        reply();
    },
    'customer.updated': function(request, reply) {
        console.log(request.payload.type + ': event processed');
        reply();
    },
    'customer.deleted': function(request, reply) {
        console.log(request.payload.type + ': event processed');

        reply();
    },
    'customer.card.created': function(request, reply) {
        console.log(request.payload.type + ': event processed');
        reply();
    },
    'customer.card.updated': function(request, reply) {
        console.log(request.payload.type + ': event processed');
        reply();
    },
    'customer.card.deleted': function(request, reply) {
        console.log(request.payload.type + ': event processed');
        reply();
    },
    'customer.subscription.created': function(request, reply) {
        console.log(request.payload.type + ': event processed');
        reply();

    },
    'customer.subscription.updated': function(request, reply) {
        console.log(request.payload.type + ': event processed');
        if (request.payload.data && request.payload.data.object && request.payload.data.object.customer) {
            // find user where stripeEvent.data.object.customer
            User.findOne({
                'stripe.customerId': request.payload.data.object.customer
            }, function(err, user) {
                if (err) {
                    return reply( Boom(err) );
                }
                if (!user) {
                    // user does not exist, no need to process
                    return reply();
                }
                else {
                    user.stripe.plan = request.payload.data.object.plan.name;
                    user.stripe.subscriptionId = request.payload.data.object.id;
                    user.stripe.status = request.payload.data.object.status;
                    user.save(function(err) {
                        if (err) {
                            return reply( Boom(err) );
                        }
                        console.log('user: ' + user.email + ' subscription was successfully updated.');
                        return reply();
                    });
                }
            });
        }
        else {
            return reply(Boom.badRequest('stripeEvent.data.object.customer is undefined'));
        }
    },
    'customer.subscription.deleted': function(request, reply) {
        console.log(request.payload.type + ': event processed');

        if (request.payload.data && request.payload.data.object && request.payload.data.object.customer) {
            // find user where stripeEvent.data.object.customer
            User.findOne({
                'stripe.customerId': request.payload.data.object.customer
            }, function(err, user) {
                if (err) {
                    return reply( Boom(err) );
                }
                if (!user) {
                    // user does not exist, no need to process
                    return reply();
                }
                else {
                    user.stripe.last4 = '';
                    user.stripe.plan = 'free';
                    user.stripe.subscriptionId = '';
                    user.stripe.status = '';
                    user.save(function(err) {
                        if (err) {
                            return reply( Boom(err) );
                        }
                        console.log('user: ' + user.email + ' subscription was successfully cancelled.');
                        return reply();
                    });
                }
            });
        }
        else {
            return reply(Boom.badRequest('stripeEvent.data.object.customer is undefined'));
        }
    },
    'customer.subscription.trial_will_end': function(request, reply) {
        console.log(request.payload.type + ': event processed');
        reply();
    },
    'customer.discount.created': function(request, reply) {
        console.log(request.payload.type + ': event processed');
        reply();
    },
    'customer.discount.updated': function(request, reply) {
        console.log(request.payload.type + ': event processed');
        reply();
    },
    'customer.discount.deleted': function(request, reply) {
        console.log(request.payload.type + ': event processed');
        reply();
    },
    'invoice.created': function(request, reply) {
        console.log(request.payload.type + ': event processed');
        reply();
    },
    'invoice.updated': function(request, reply) {
        console.log(request.payload.type + ': event processed');
        reply();
    },
    'invoice.payment_succeeded': function(request, reply) {
        console.log(request.payload.type + ': event processed');
        reply();
    },
    'invoice.payment_failed ': function(request, reply) {
        console.log(request.payload.type + ': event processed');
        if (request.payload.data && request.payload.data.object && request.payload.data.object.customer) {
            User.findOne({
                'stripe.customerId': request.payload.data.object.customer
            }, function(err, user) {
                if (err) {
                    return reply( Boom(err) );
                }
                if (!user) {
                    // user does not exist, no need to process
                    return reply();
                }
                else {
                    user.stripe.plan = 'free';
                    user.save(function(err) {
                        if (err) return next(err);
                        console.log('user: ' + user.email + ' invoice failed. Setting user to free tier.');
                        return reply();
                    });
                }
            });
        }
        else {
            return reply(Boom.badRequest('stripeEvent.data.object.customer is undefined'));
        }

    },
    'invoiceitem.created': function(request, reply) {
        console.log(request.payload.type + ': event processed');
        reply();
    },
    'invoiceitem.updated': function(request, reply) {
        console.log(request.payload.type + ': event processed');
        reply();
    },
    'invoiceitem.deleted': function(request, reply) {
        console.log(request.payload.type + ': event processed');
        reply();
    },
    'plan.created': function(request, reply) {
        console.log(request.payload.type + ': event processed');
        reply();
    },
    'plan.updated': function(request, reply) {
        console.log(request.payload.type + ': event processed');
        reply();
    },
    'plan.deleted': function(request, reply) {
        console.log(request.payload.type + ': event processed');
        reply();
    },
    'coupon.created': function(request, reply) {
        console.log(request.payload.type + ': event processed');
        reply();
    },
    'coupon.deleted': function(request, reply) {
        console.log(request.payload.type + ': event processed');
        reply();
    },
    'recipient.created': function(request, reply) {
        console.log(request.payload.type + ': event processed');
        reply();
    },
    'recipient.updated': function(request, reply) {
        console.log(request.payload.type + ': event processed');
        reply();
    },
    'recipient.deleted': function(request, reply) {
        console.log(request.payload.type + ': event processed');
        reply();
    },
    'transfer.created': function(request, reply) {
        console.log(request.payload.type + ': event processed');
        reply();
    },
    'transfer.updated': function(request, reply) {
        console.log(request.payload.type + ': event processed');
        reply();
    },
    'transfer.paid': function(request, reply) {
        console.log(request.payload.type + ': event processed');
        reply();
    },
    'transfer.failed': function(request, reply) {
        console.log(request.payload.type + ': event processed');
        reply();
    },
    'ping': function(request, reply) {
        console.log(request.payload.type + ': event processed');
        reply();
    }
};

module.exports = function(request, reply) {
    if (request.payload.type && knownEvents[request.payload.type]) {
        knownEvents[request.payload.type](request, reply);
    }
    else {
        return reply(Boom.badRequest('Stripe Event not found'));
    }
};
