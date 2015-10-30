'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    models = require('./../../../models'),
	Article = mongoose.model('Article'),
    Boom = require('boom'),
	_ = require('lodash'),
    ArticlePreware = require('./preware'),
    UserPreware = require('../users/preware');


/**
 * Create a article
 */
exports.create = {
    handler: function(request, reply) {
    	var article = new Article(request.payload);
    	article.user = request.userId;

    	article.save(function(err) {
    		if (err) {
    			reply(Boom.badRequest(err));
    		} else {
    			reply(article);
    		}
    	});
    }
};

/**
 * Show the current article
 */
exports.read = {
    pre: [
        ArticlePreware.articleByID
    ],
    handler: function(request, reply) {
        reply(request.article);
    }
};

/**
 * Update a article
 */
exports.update = {
    pre: [
        ArticlePreware.articleByID,
        ArticlePreware.ownResource,
        UserPreware.hasActiveSubscription
    ],
    handler: function(request, reply) {
    	var article = request.article;

    	article = _.extend(article, request.payload);

    	article.save(function(err) {
    		if (err) {
              reply(Boom.badRequest(err));
    		} else {
    		  reply(article);
    		}
    	});
    }
};

/**
 * Delete an article
 */
exports.delete = {
    pre: [
        ArticlePreware.articleByID,
        ArticlePreware.ownResource
    ],
    handler: function(request, reply) {
    	var article = request.article;

    	article.remove(function(err) {
    		if (err) {
          		reply(Boom.badRequest(err));
    		} else {
    			reply(article);
    		}
    	});
    }
};

/**
 * List of Articles
 */
exports.list = {
    auth: false,
    handler: function(request, reply) {
    	Article.find().sort('-created').populate('user', 'username').exec(function(err, articles) {
    		if (err) {
    			reply(Boom.badRequest('Could not find articles'));
    		} else {
    			reply(articles);
    		}
    	});
    }
};
