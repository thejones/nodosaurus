module.exports = exports = function stripeCustomer(schema, options) {
  schema.add({
    stripe: {
      customerId: String,
      status: String,
      subscriptionId: String,
      last4: String,
      plan: {
        type: String,
        enum: [ 'free', 'pro' ],
        default: 'free'
      }
    }
  });
};
