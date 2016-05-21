var mongoose = require('mongoose'),
    models = require('./../../../models'),
	Article = mongoose.model('Article'),
    Boom = require('boom');
/**
 * Article authorization middleware
 */
 exports.articleByID = function(request, reply) {
	Article.findById(request.params.articleId).populate('user').exec(function(err, article) {
		if (err) {
			reply(Boom.badRequest(err));
		}
		if (!article) {
			reply(Boom.badRequest("Unable to find that article"));
		}
		request.article = article;
        request.user = article.user;
		reply();
	});
};


exports.ownResource = function(request, reply) {
	if (request.article.user.id == request.userId) {
		reply();
	}
    else{
        reply(Boom.forbidden());
    }

};
