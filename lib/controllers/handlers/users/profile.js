var createSendToken = require('./../../../helpers/jwt'),
    config = require('config'),
    Joi = require('joi'),
    mongoose = require('mongoose'),
    models = require('./../../../models'),
    User = mongoose.model('User'),
    Boom = require('boom'),
    nodemailer = require('nodemailer'),
    async = require('async'),
    crypto = require('crypto'),
    _ = require('lodash'),
    preware = require('./preware');

exports.updateMe = {
    // validate: {
    //      payload: {
    //          email: Joi.string().email().required()
    //      }
    // },
    pre: [
        preware.userByID
    ],
    handler: function (request, reply){
        var user = request.user;
        var message = null;

        // For security measurement we remove the roles from the req.body object
        delete request.payload.roles;

        if (user) {
            // Merge existing user
            user = _.extend(user, request.payload);
            user.updated = Date.now();

            user.save(function(err) {
                if (err) {
                    reply(Boom.badRequest(err));
                } else {
                    createSendToken(user, reply);
                }
            });
        } else {
            reply(Boom.unathorized());
        }

    }
};

exports.getMe = {
    pre: [
        preware.userByID
    ],
    handler: function (request, reply){
        /* Populated in the route Pre handler. */
        reply( request.user.toJSON() );
    }
};

exports.delete = {
    pre: [
        preware.userByID
    ],
    handler: function (request, reply){
        var user = request.user;
        /* Populated in the route Pre handler. */
        user.remove(function(err) {
            if (err) {
                reply(Boom.badRequest(err));
            } else {
                reply(user);
            }
        });
    }
};
