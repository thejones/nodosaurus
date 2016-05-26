// Hapi.js in Action file. Buy the book!!!

const EventEmitter = require('events').EventEmitter;

exports.register = function (server, options, next) {

  const emitter = new EventEmitter();
  server.decorate('server', 'events', emitter);
  next();
};

exports.register.attributes = {
  name: 'event-emitter'
};
