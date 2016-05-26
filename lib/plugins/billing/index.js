import stripe from 'stripe';
import mongoose from 'mongoose';
const User = mongoose.model('User');

exports.register = function (server, options, next) {

  server.events.on('create-stripe-user', async function(data) {
    const customer = await stripe.customers.create({email: data.email});
    const user = await User.findOne({ email: data.email});
    await User.update(user.id, { $set: {user: { stripe: {customerId : customer.id}}}});

  });

  next();
};

exports.register.attributes = {
  name: 'event-emitter'
};
