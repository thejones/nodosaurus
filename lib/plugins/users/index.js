import * as UsersController from './controllers';

exports.register = function (server, options, next) {
  server.events.on('user-validated', (data) => {
    server.log('info', `Auth0 user validated. Checking for local user. ${JSON.stringify(data)}`);
    const options = {
      method: 'PUT',
      url: 'api/v1/auth/users/{id}',
      payload: data
    };
    // This just calls our existing route to update/create
    server.inject(options, function (res) {
      server.log('info', 'user is in our system');
    });
  });

  server.route([
    {
      path: '/auth/users',
      method: 'GET',
      config: {
        validate: {
          // params: {
          //     name: Joi.string().min(3).max(10)
          // }
        }
      },
      handler: UsersController.find
    },
    {
      path: '/auth/users/{id}',
      method: 'GET',
      config: {
        auth: false,
        validate: {
          // params: {
          //     name: Joi.string().min(3).max(10)
          // }
        }
      },
      handler: UsersController.findOne
    },
    {
      path: '/auth/users/{id}',
      method: 'PUT',
      config: {
        validate: {
          // params: {
          //     name: Joi.string().min(3).max(10)
          // }
        }
      },
      handler: UsersController.update
    },
    {
      path: '/auth/users',
      method: 'POST',
      config: {
        auth: false,
        validate: {
          // params: {
          //     name: Joi.string().min(3).max(10)
          // }
        }
      },
      handler: UsersController.create
    },
    {
      path: '/auth/users',
      method: 'DELETE',
      config: {
        validate: {
          // params: {
          //     name: Joi.string().min(3).max(10)
          // }
        }
      },
      handler: UsersController.destroy
    }

  ]);

  next();
};

exports.register.attributes = {
  name: 'user-api-routes'
};
