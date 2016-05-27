import * as StripeController from './controllers';


exports.register = function (server, options, next) {
  server.route([
    {
      path: '/stripe/customer/subscribe',
      method: 'POST',
      config: {
        auth: false,
        validate: {
          // params: {
          //     name: Joi.string().min(3).max(10)
          // }
        }
      },
      handler: StripeController.create
    }


  ]);

  next();
};

exports.register.attributes = {
  name: 'stripe'
};
