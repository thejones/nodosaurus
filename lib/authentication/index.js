var config = require('config');

exports.register = function (plugin, options, next) {

    plugin.auth.strategy('github', 'bell', {
        provider: 'github',
        password: 'password',
        isSecure: false,
        clientId: config.github.clientId,
        clientSecret: config.github.clientSecret
    });

    plugin.auth.strategy('jwt', 'jwt', 'required',  {
        key: config.TOKEN_SECRET,
        validateFunc: function (decoded, request, callback) {
            var payload = decoded;

        	if (!payload.sub) {
        		callback("Error with Token");
        	};

        	request.userId = payload.sub;
        	return callback(null, true);
        }
    });



    next();
};

exports.register.attributes = {
    name: 'authentication',
    version: require('../../package.json').version
};
