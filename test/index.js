require('babel-core/register');
require('babel-polyfill');

const Glue = require('glue');
const Path = require('path');
const Lab = require('lab');
const Code = require('code');
const Server = require('./../lib/server');

// I am not using the exact same manifest. You might want to.
const internals = {
  manifest: {
    connections: [
      {
        labels: ['main']
      }],
    registrations: [
      {
        plugin: './../lib/router/user',
        options: {
          select: ['main'],
          routes: {
            prefix: '/api/v1'
          }
        }
      },

    ]
  }
};

// Test shortcuts

var lab = exports.lab = Lab.script();
var describe = lab.experiment;
var expect = Code.expect;
var it = lab.test;

lab.experiment('Server Tests', function () {
	lab.test("starts a server correctly.", function(done) {

        Glue.compose(internals.manifest, { relativeTo: Path.resolve(__dirname, '../lib') },  (err, server) => {
            expect(err).to.not.exist();
            server.stop(done);
        });
	});

});
