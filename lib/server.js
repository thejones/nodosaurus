// Load modules

var Glue = require('glue');
var Hapi = require('hapi');
var Config = require('config');
var chalk = require('chalk');
var mongoose = require('mongoose');

// Internals

var internals = {};


exports.init = function(manifest, composeOptions, next){
    Glue.compose(manifest, composeOptions, function (err, server) {
        if (err) {
            return next(err);
        }
        server.start(function(err){
            return next(err, server);
        });
    });
};
