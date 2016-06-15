import Stripe from 'stripe';
const stripe = Stripe(process.env.STRIPE_API_KEY);

async function create(request, reply) {
  console.log(JSON.stringify(request.payload.token));
  try {
    const customer = await stripe.customers.create(
      {
        email: request.payload.token.email,
        source: request.payload.token.id,
        description: 'Pro plan',
        plan: 'pro'
      });
    request.server.log('info', 'created stripe customer');
    reply(customer);
  } catch (err) {
    request.server.log('err', err);
    reply(err);
  }
}

export default {
  create
};
