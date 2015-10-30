// Load modules

var Glue = require('glue');
var Hapi = require('hapi');
var Config = require('config');
var chalk = require('chalk');
var mongoose = require('mongoose');

// Internals

var internals = {};


exports.init = function(manifest, composeOptions, next){
    //Glue.compose(internals.manifest, { relativeTo: __dirname }, function (err, pack) {
    Glue.compose(manifest, composeOptions, function (err, server) {
        if (err) {
            return next(err);
        }
        // TLS everything

        server.select('web').ext('onRequest', function (request, reply) {

            return reply.redirect('https://localhost:3001' + request.url.path).permanent();
        });
        server.start(function(err){
            return next(err, server);
        });
    });
};
