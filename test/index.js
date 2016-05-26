require('babel-core/register');
require('babel-polyfill');
require('dotenv').config();

const Glue = require('glue');
const Path = require('path');
const Lab = require('lab');
const Code = require('code');
const manifest = require('./../lib/manifest');

const internals = {
  manifest: manifest
};

// Test shortcuts
const lab = exports.lab = Lab.script();
// const describe = lab.experiment;
const expect = Code.expect;
// const it = lab.test;

lab.experiment('Server Tests', function () {
  lab.test('starts a server correctly', function (done) {

    Glue.compose(internals.manifest, { relativeTo: Path.resolve(__dirname, '../lib')
        },  (err, server) => {
          expect(err).to.not.exist();
          server.stop(done);
        });
  });

});
