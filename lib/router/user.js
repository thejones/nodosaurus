import { UsersController } from '../controllers';


exports.register = function (plugin, options, next) {
  plugin.route([
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
        auth: false,
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
        auth: false,
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
