// import Stripe from 'stripe';
// import mongoose from 'mongoose';
//
// exports.register = function (server, options, next) {
//
//   const stripe = Stripe(process.env.STRIPE_API_KEY);
//
//   server.events.on('create-stripe-user', async function(user) {
//     try {
//       await stripe.customers.create({email: user.email});
//       server.log('info', 'created stripe customer');
//     } catch (err) {
//       server.log('err', err);
//     }
//   });
//
//   server.events.on('create-customer-subscription')
//
//   next();
// };
//
// exports.register.attributes = {
//   name: 'stripe-customer-events'
// };
