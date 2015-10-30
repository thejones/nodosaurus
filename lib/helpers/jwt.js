var Jwt = require('jsonwebtoken');
var Moment = require('moment');
var Config = require('config');

module.exports = function (user, reply) {

    var payload = {
        sub: user.id,
        exp: Moment().add(1, 'day').unix()
    };

    var token = Jwt.sign(payload, Config.TOKEN_SECRET);

    reply({
        user: user.toJSON(),
        token: token
    });
};
