import { UsersController } from '../controllers';

exports.register = function (plugin, options, next) {
  plugin.route([
    {
      path: '/auth/me',
      method: 'GET',
      config: {
        auth: false,
        validate: {
          // params: {
          //     name: Joi.string().min(3).max(10)
          // }
        }
      },
      handler: UsersController.getMe
    }
    // {
    //     path: '/auth/me/delete',
    //     method: 'DELETE',
    //     config: Controllers.handlers.users.profile.delete
    // },
    // //STRIPE
    // {
    //     path: '/users/billing',
    //     method: 'POST',
    //     config: Controllers.handlers.users.stripe.postBilling
    // },
    // {
    //     path: '/users/plan',
    //     method: 'POST',
    //     config: Controllers.handlers.users.stripe.postPlan
    // },
    // //STRIPE WEBHOOKS
    // {
    //     path: '/stripe/webhooks',
    //     method: 'POST',
    //     config: Controllers.handlers.users.stripe.webhooks
    // },

  ]);

  next();
};

exports.register.attributes = {
  name: 'user-api-routes'
};
