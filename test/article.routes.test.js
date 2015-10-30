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

var user, article, credentials;

lab.experiment('Article Routes', function () {

    lab.before({ timeout: 2500 }, function (done) {
        // Bootstrap db connection
        var db = mongoose.connect(Config.db.uri, Config.db.options, function(err) {
            if (err) {
                console.error(chalk.red('Could not connect to MongoDB!'));
                console.log(chalk.red(err));
            }
        });
        mongoose.connection.on('error', function(err) {
            console.error(chalk.red('MongoDB connection error: ' + err));
            process.exit(-1);
            }
        );
        credentials = {
            email: 'test@test.com',
            password: 'password'
        };

        user = new User({
            username: 'Full Name',
            email: credentials.email,
            password: credentials.password,
            provider: 'local'
        });

        user.save(function(){
            done();
        });
    });

	lab.test("Create article as a signed in user", function(done) {
        var options = {
			method: "POST",
			url: "/auth/login",
			payload: credentials
		};

        Server.init(internals.manifest, internals.composeOptions, function (err, server) {
            server.inject(options, function(response) {
                var result = response.result;
                var articleOptions = {
                    method: 'POST',
                    url: '/api/articles',
                    headers: {
                        authorization: 'Bearer ' + result.token
                    },
                    payload: {
                        title: 'Article Title',
                        content: 'Article Content'
                    }
                };
                server.inject(articleOptions, function (response) {
                    var result = response.result;
                    Code.expect(response.statusCode).to.equal(200);
                    Code.expect(result.title).to.equal(articleOptions.payload.title);
                    Code.expect(result.content).to.equal(articleOptions.payload.content);
                    server.stop(done);
                });
            });
       });
	});


    lab.test("Create article as an anonymous user", function(done) {
		var articleOptions = {
			method: 'POST',
			url: '/api/articles',
			payload: {
				title: 'Article Title',
				content: 'Article Content'
			}
		};
        Server.init(internals.manifest, internals.composeOptions, function (err, server) {

            server.inject(articleOptions, function (response) {
    			Code.expect(response.statusCode).to.equal(401);
    			server.stop(done);
    		});
       });
   	});

	lab.after(function (done) {
		Article.remove().exec(function() {
			User.remove().exec(done);
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
