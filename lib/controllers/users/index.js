import rp from 'request-promise';
import mongoose from 'mongoose';
import models from './../../models';
const User = mongoose.model('User');

const authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJJR21FdWNnNWJ6UnN6b1NQbVhiSGFoUW5XUkViQjJCciIsInNjb3BlcyI6eyJ1c2VycyI6eyJhY3Rpb25zIjpbInJlYWQiXX19LCJpYXQiOjE0NjM2MDQ0MDgsImp0aSI6IjA0YmNiNTgxNjQzOWIzOWRmZGM4MWQyNWY1YTkyZmRiIn0.njPhdwcQgTkZ821IyJ0MpSIx_Z6z4ecKG6bIPSJ9FSw';

async function find(request, reply) {
  const options = {
    uri: 'https://krabs.auth0.com/api/v2/users',
    headers: {
      'Authorization': `Bearer ${authToken}`
    },
    json: true
  };

  const users = await rp(options);
  reply(users);
}

async function findOne(request, reply) {
  const options = {
    uri: `https://krabs.auth0.com/api/v2/users/${request.payload.id}`,
    headers: {
      'Authorization': `Bearer ${authToken}`
    },
    json: true
  };

  const users = await rp(options);
  reply(users);
}

async function create(request, reply) {
  const profile = request.payload;
  const user = await User.findOne({ user_id: profile.user_id });
  if (!user) {
    const obj = {
      user_id: profile.user_id
    };
    const user = await new User(obj);
    reply(user);
  }
}

async function update(request, reply) {
  const profile = request.payload.profile;
  const user = await User.findOne({ user_id: profile.user_id });

  if (!user) {
    reply();
  } else {
    const user = await User.findByIdAndUpdate(
      user.id,
      {$set:
        { user_id: profile.user_id }
      }).exec();
    reply(user);
  }
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
