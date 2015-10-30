var createSendToken = require('./../../../helpers/jwt'),
    Joi = require('joi'),
    config = require('config'),
    mongoose = require('mongoose'),
    models = require('./../../../models'),
    User = mongoose.model('User'),
    Boom = require('boom'),
    nodemailer = require('nodemailer'),
    async = require('async'),
    crypto = require('crypto'),
    _ = require('lodash');

exports.opts = {
    auth: false,
    handler: function(request, reply){
        var r = request;
        reply();
    }
},
exports.signup = {
    auth: false,
    validate: {
        payload: {
            displayName: Joi.string().allow(''),
            email: Joi.string().email().required(),
            password: Joi.string().required()
        }
    },
    handler: function(request, reply){

        delete request.payload.roles;

        // Init Variables
        var user = new User(request.payload);
        // Add missing user fields
        user.provider = 'local';
        // Then save the user
        user.save(function(err) {
            if (err) {
                reply(Boom.badRequest(err));
            } else {
                createSendToken(user, reply);
            }

        });
    }
};

exports.login = {
    auth: false,
    validate: {
        payload: {
            email: Joi.string().email().required(),
            password: Joi.string().required()
        }
    },
    handler: function(request, reply){

        var password = request.payload.password;
    	User.findOne({
    		email: request.payload.email
    	}, function(err, user) {

    		if (err) {
    			return reply(Boom.badRequest(err));
    		}
    		if (!user) {
    			return reply(Boom.badRequest("Wrong username/password"));
    		}
    		if (!user.authenticate(password)) {
    			return reply(Boom.badRequest("Wrong username/password"));
    		}
            if(user){
                createSendToken(user, reply);
            }else{
                reply();
            }

    	});
    }
};
