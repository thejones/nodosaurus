import { BillingsController } from '../controllers';

exports.register = function (plugin, options, next) {

  plugin.route([
    {
      path: '/users/billing',
      method: 'POST',
      config: {
        auth: false,
        validate: {
          // params: {
          //     name: Joi.string().min(3).max(10)
          // }
        }
      },
      handler: BillingController.create
    }

  ]);

  next();
};

exports.register.attributes = {
  name: 'user-api-routes'
};
