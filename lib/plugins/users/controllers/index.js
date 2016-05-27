// This file users massive.js

// async function find(request, reply) {
//   const db = request.server.app.db;
//   require('instapromise');
//   const users = await db.users.find.promise();
//   reply(users);
// }
//
// async function findOne(request, reply) {
//
//   const db = request.server.app.db;
//   const find = promisify(db.users.find)
//   const profile = request.payload;
//   console.log(find);
//   const user = await find({ user_id: profile.user_id });
//   if (user) {
//     reply(user);
//   } else {
//     reply('No user found');
//   }
// }

async function create(request, reply) {
  const db = request.server.app.db;
  const profile = request.payload.profile;
  const user = await new Promise((resolve, reject) => {
    db.users.find({ user_id: profile.user_id }, (err, data) => {
      if (err) return reject(err);
      resolve(data);
    });
  });
  if (user.length <= 0) {
    const obj = {
      user_id: profile.user_id,
      email: profile.email

    };

    console.log(`Profile is ${profile.user_id}`);
    try {
      const user = await new Promise((resolve, reject) => {
        db.users.save(obj, (err, data) => {
          if (err) return reject(err);
          resolve(data);
        });

        request.server.log('info', `created user with Auth0 id ${user.user_id}`);
        reply(user);
      });
    } catch (err) {
      console.log(err);
      reply(err);
    }
  }

}
//
// async function update(request, reply) {
//   const db = request.server.app.db;
//   // Send update to auth0.
//   // request.server.events.emit('update-auth0-user', request.payload);
//   reply();
// }
//
// async function destroy(request, reply) {
//   reply('Hello');
// }

export default {
  create
};
