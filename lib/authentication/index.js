var config = require('config');

exports.register = function (plugin, options, next) {
    plugin.auth.strategy('token', 'jwt', {
        key: new Buffer(process.env.AUTH0_CLIENT_SECRET, 'base64'),
        verifyOptions: {
          algorithms: [ 'HS256' ],
          audience: process.env.AUTH0_CLIENT_ID
        },
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
