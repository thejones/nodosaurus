var mongoose = require('mongoose'),
    models = require('./../../../models'),
	User = mongoose.model('User'),
    Boom = require('boom');


exports.userByID = function(request, reply) {
	var Id = request.userId
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

exports.hasActiveSubscription = function(request, reply) {
    if (!request.user.stripe.plan == 'free') {
        reply();
    }else{
        return reply(Boom.unathorized("Cannot find paid subscription"));
    }

};
