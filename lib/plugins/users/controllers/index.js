import rp from 'request-promise';
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
  const profile = request.payload;
  const user = await User.findOne({ user_id: profile.user_id });
  if (!user) {
    const obj = {
      user_id: profile.user_id,
      email: profile.email
    };
    const user = await new User(obj);
    request.server.log('info', `created user with Auth0 id ${user.user_id}`);
    request.server.events.emit('create-stripe-user', user);
    reply(user);
  }
}

async function update(request, reply) {
  // Update LOCAL user based on what Auth0 has.
  const options = {
    uri: `https://krabs.auth0.com/api/v2/users/${request.payload.id}`,
    headers: {
      'Authorization': `Bearer ${authToken}`
    },
    json: true
  };
  const auth0User = await rp(options);
  const user = await User.findOneAndUpdate(
    {
      user_id: request.payload.id
    },
    {
      user_id: auth0User.user_id
    },
    {
      upsert:true
    }
  );
  reply(user);
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
