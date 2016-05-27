
import mongoose from 'mongoose';
import models from './../../../models';
const User = mongoose.model('User');

const authToken = process.env.AUTH0_USER_SCOPE;

async function find(request, reply) {
  const users = await User.find({});
  reply(users);
}

async function findOne(request, reply) {
  const profile = request.payload;
  const user = await User.findOne({ user_id: profile.user_id });
  if (user) {
    reply(user);
  } else {
    reply('No user found');
  }
}

async function create(request, reply) {
  const profile = request.payload.profile;
  const user = await User.findOne({ user_id: profile.user_id });
  if (!user) {
    const obj = {
      user_id: profile.user_id
    };
    const user = await User.create(obj);
    request.server.log('info', `created user with Auth0 id ${user.user_id}`);
    reply(user);
  }
}
//
async function update(request, reply) {
  // Send update to auth0.
  // request.server.events.emit('update-auth0-user', request.payload);
  reply();
}

async function destroy(request, reply) {
  reply('Hello');
}

export default {
  find,
  findOne,
  create,
  update,
  destroy
};
