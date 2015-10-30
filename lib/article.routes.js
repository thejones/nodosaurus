var Controllers = require('./controllers');

exports.register = function (plugin, options, next) {

    plugin.route([

        /* User authentication */
        {
            path: '/api/articles',
            method: 'GET',
            config: Controllers.handlers.articles.articles.list
  	    },
        {
            path: '/api/articles',
            method: 'POST',
            config: Controllers.handlers.articles.articles.create
        },
        {
            path: '/api/articles/{articleId}',
            method: 'GET',
            config: Controllers.handlers.articles.articles.read
  	    },
        {
            path: '/api/articles/{articleId}',
            method: 'PUT',
            config: Controllers.handlers.articles.articles.update
  	    },
        {
            path: '/api/articles/{articleId}',
            method: 'DELETE',
            config: Controllers.handlers.articles.articles.delete
  	    }

    ]);

    next();
};



exports.register.attributes = {
    name: 'article-api-routes',
    version: require('../package.json').version
};
