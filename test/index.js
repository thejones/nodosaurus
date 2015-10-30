var Code = require('code'),
    chalk = require('chalk')
    Path = require('path'),
    Lab = require('lab'),
	Hapi = require('hapi'),
	Server = require("../lib/server"),
	Config = require('config'),
	mongoose = require('mongoose'),
  	models = require('./../lib/models'),
	User = mongoose.model('User'),
	Article = mongoose.model('Article');


//declare internals

var internals = {};

// Test shortcuts

var lab = exports.lab = Lab.script();
var describe = lab.experiment;
var expect = Code.expect;
var it = lab.test;

lab.experiment('Server Tests', function () {


	lab.test("starts a server correctly.", function(done) {

        Server.init(internals.manifest, internals.composeOptions, function (err, server) {
            expect(err).to.not.exist();
           expect(server).to.be.instanceof(Hapi.Server);

           server.stop(done);
       });
	});


});


var internals = {
    manifest: {
        connections: [{
            labels: ['api']
        }],
        plugins: {
            bell: [{ 'select': 'api' }],
            'hapi-auth-jwt2': [{ 'select': 'api' }],
            './../lib/authentication': [{'select': 'api'}],
            './../lib/user.routes': [{ 'select': ['api']}],
            './../lib/article.routes': [{ 'select': ['api']}]

        }
    }
};

internals.composeOptions = {
    relativeTo: Path.resolve(__dirname, '../lib')
};
