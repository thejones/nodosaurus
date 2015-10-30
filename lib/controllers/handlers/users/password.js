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
    _ = require('lodash'),
    transporter = require('./../../../helpers/transport');

exports.forgot = {
    auth: false,
    validate: {
        payload: {
            email: Joi.string().email().required()
        }
    },
    handler: function(request, reply){
        async.waterfall([
            // Generate random token
            function(done) {
                crypto.randomBytes(20, function(err, buffer) {
                    var token = buffer.toString('hex');
                    done(err, token);
                });
            },
            // Lookup user by username
            function(token, done) {
                if (request.payload.email) {
                    User.findOne({
                        email: request.payload.email
                    }, '-salt -password', function(err, user) {
                        if (!user) {
                            reply(Boom.badRequest("No account with that email can be found"));
                        } else if (user.provider !== 'local') {
                            reply(Boom.badRequest('It seems like you signed up using your ' + user.provider + ' account'));
                        } else {
                            user.resetPasswordToken = token;
                            user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

                            user.save(function(err) {
                                done(err, token, user);
                            });
                        }
                    });
                } else {
                    reply(Boom.badRequest("Please verify email address was supplied"));
                }
            },
            function(token, user, done) {
                var mailOptions = {
                    to: user.email,
                    from: 'Nodosaurus@example.com',
                    subject: 'Reset your password on Established',
                    text: 'You are receiving this email because you (or someone else) have requested the reset of the password for your account.\n\n' +
                    'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
                    'https://' + request.headers.host + '/reset/' + token + '\n\n' +
                    'If you did not request this, please ignore this email and your password will remain unchanged.\n'
                };
                transporter.sendMail(mailOptions, function(err) {
                    reply('An e-mail has been sent to ' + user.email + ' with further instructions.   ' + token)
                    done(err, 'done');
                });
            }
        ], function(err) {
            if (err) {
                return (err);
            }
        });
    }

};

/**
* Reset password GET from email token
*/
exports.validateResetToken = {
    auth: false,
    handler: function (request, reply){

        User.findOne({
            resetPasswordToken: request.params.token,
            resetPasswordExpires: {
                $gt: Date.now()
            }
        }, function (err, user){

            if (!user) {
                return reply.redirect('http://localhost:9000/#/signup');
            }

            reply.redirect('http://localhost:9000/#/reset/' + request.params.token);
        });
    }
};

/**
* Reset password POST from email token
*/
exports.reset = {
    auth: false,
    handler: function (request, reply){
        // Init Variables
        var passwordDetails = request.payload;

        async.waterfall([

            function (done){

                User.findOne({
                    resetPasswordToken: request.params.token,
                    resetPasswordExpires: {
                        $gt: Date.now()
                    }
                }, function (err, user){

                    if (!err && user) {
                        if (passwordDetails.newPassword === passwordDetails.verifyPassword) {
                            user.password = passwordDetails.newPassword;
                            user.resetPasswordToken = undefined;
                            user.resetPasswordExpires = undefined;

                            user.save(function (err){

                                if (err) {
                                    reply(Boom.badRequest(err));
                                } else {
                                    //createSendToken(user, reply);
                                    done(err, user);
                                }
                            });
                        } else {
                            reply(Boom.badRequest('Passwords do not match'));
                        }
                    } else {
                        reply(Boom.badRequest("Token invalid"));
                    }
                });
            },
            // If valid email, send reset email using service
            function(user, done) {
                var mailOptions = {
                    to: user.email,
                    from: 'Nodosaurus@example.com',
                    subject: 'Password has been reset on Nodosaurus',
                    text: 'You are receiving this email because you (or someone else) has reset the password for your account.\n\n' +
                    'If you did not request this, please contact us.\n'
                };
                transporter.sendMail(mailOptions, function(err) {
                    //reply('An e-mail has been sent to ' + user.email)
                    createSendToken(user, reply);
                    done(err, 'done');
                });
            }
        ], function(err) {
            if (err) {
                return (err);
            }
        });
    }

};

/**
* Change Password
*/
exports.changePassword = {
    handler: function(request, reply) {
        // Init Variables
        var passwordDetails = request.payload;

        if (request.userId) {
            if (passwordDetails.newPassword) {
                User.findById(request.userId, function(err, user) {
                    if (!err && user) {
                        if (user.authenticate(passwordDetails.currentPassword)) {
                            if (passwordDetails.newPassword === passwordDetails.verifyPassword) {
                                user.password = passwordDetails.newPassword;

                                user.save(function(err) {
                                    if (err) {
                                        reply(Boom.badRequest(err));
                                    } else {
                                        createSendToken(user, reply);
                                    }
                                });
                            } else {
                                reply(Boom.badRequest("Passwords do not match"));
                            }
                        } else {
                            reply(Boom.badRequest("Current password incorrect"));
                        }
                    } else {
                        reply(Boom.badRequest("Cannot find user"));
                    }
                });
            } else {
                reply(Boom.badRequest("Please provide a new password"));
            }
        } else {
            reply(Boom.forbidden());
        }
    }

};

/**
* Pre
*/
exports.preware = {};
exports.preware.userByID = function(request, reply) {
    var Id = request.params.id
    User.findById(Id).exec(function(err, user) {
        if (err) {
            return reply(Boom.badRequest(err));
        }
        if (!user) {
            return reply(Boom.badRequest('Failed to load User ' + Id));
        }
        request.user = user;
        reply();
    });
};

/**
* Pre
*/
exports.preware.hasRole = function(role) {
    var self = this;

    return {
        assign: 'hasRole',
        method: function(request, reply) {
            if(_.indexOf(request.user, self.role)){
                reply();
            }else{
                reply(Boom.forbidden())
            }
        }
    };
};
