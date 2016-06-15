export default class Users {
  constructor(options = {}) {
    console.log('users constructor called');
  }

  async find(request, reply) {
    const db = request.server.app.db;
    const users = await new Promise((resolve, reject) => {
      db.users.find({}, (err, data) => {
        if (err) reject(err);
        resolve(data);
      });
    });
    reply(users);
  }

  async findOne(request, reply) {
    const db = request.server.app.db;
    const user = await new Promise((resolve, reject) => {
      db.users.findOne({id: request.params.id}, (err, data) => {
        if (err) reject(err);
        resolve(data);
      });
    });
    if (user) {
      reply(user);
    } else {
      reply('No user found');
    }
  }

  async create(request, reply) {
    const db = request.server.app.db;
    const profile = request.payload.profile;
    const user = await new Promise((resolve, reject) => {
      db.users.find({ user_id: profile.user_id }, (err, data) => {
        if (err) return reject(err);
        resolve(data);
      });
    });
    if (!user.length) {
      const obj = {
        user_id: profile.user_id,
        email: profile.email
      };
      try {
        const user = await new Promise((resolve, reject) => {
          db.users.insert(obj, (err, data) => {
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
  // async update(request, reply) {
  //   const db = request.server.app.db;
  //   // Send update to auth0.
  //   // request.server.events.emit('update-auth0-user', request.payload);
  //   reply();
  // }
  //
  // async destroy(request, reply) {
  //   reply('Hello');
  // }
}
