// import models from './../../models';
const Boom = require('boom');
import mongoose from 'mongoose';
const User = mongoose.model('User');

async function hasActiveSubscription(request, reply) {
  reply('all good');
}

async function userById(request, reply) {
  const user = await User.findById(request.payload.id);
  request.user = user;
  reply();
}

async function isAdmin(request, reply) {
  if (!request.user || request.user.group !== 'admin') {
    reply(Boom.unauthorized(
      'You do not belong to the "admin" user group'
    ));
  } else {
    reply();
  }
}

export default {
  hasActiveSubscription,
  userById,
  isAdmin
};
