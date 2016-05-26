// import models from './../../models';
import mongoose from 'mongoose';
const User = mongoose.model('User');

async function hasActiveSubscription(request, reply) {
  reply('all good');
}

async function userById(request, reply) {
  const user = await User.findById(request.userId);
  request.user = user;
  reply();
}

async function isAdmin(request, reply) {
  const user = await User.findById(request.userId);
  if (user.group !== 'admin') {
    request.isAdmin = true;
  } else {
    request.isAdmin = false;
  }
  reply();
}

export default {
  hasActiveSubscription,
  userById,
  isAdmin
};
