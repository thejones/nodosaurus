
exports.register = function (server, options, next) {
  server.auth.strategy('token', 'jwt', 'required',  {

    key: new Buffer(process.env.AUTH0_CLIENT_SECRET, 'base64'),
    verifyOptions: {
      algorithms: [ 'HS256' ],
      audience: process.env.AUTH0_CLIENT_ID
    },
    validateFunc: function (decoded, request, callback) {
      if (!decoded.sub) {
        callback('Error with Token');
      }
      request.userId = decoded.sub;
      server.events.emit('user-validated', decoded.sub);
      return callback(null, true);
    }
  });

  next();
};

exports.register.attributes = {
  name: 'authentication'
};
