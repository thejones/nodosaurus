// import models from './../../models';
const Boom = require('boom');
import mongoose from 'mongoose';
const User = mongoose.model('User');

export default class GlobalPreware {
  constructor(options = {}) {
    console.log('Global preware constructor called')
  }

  static recordById(request, reply) {
    const db = request.server.app.db;
    db[this.model].findOne({id: request.params.id}, (err, data) => {
      if (err) reply(err);
      request.recordById = data;
      reply();
    });
  }
  async hasActiveSubscription(request, reply) {
    reply('all good');
  }

  async userById(request, reply) {
    const user = await User.findById(request.payload.id);
    request.user = user;
    reply();
  }

  async isAdmin(request, reply) {
    if (!request.user || request.user.group !== 'admin') {
      reply(Boom.unauthorized(
        'You do not belong to the "admin" user group'
      ));
    } else {
      reply();
    }
  }
}
