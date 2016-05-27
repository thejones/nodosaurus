import Stripe from 'stripe';

const stripe = Stripe(process.env.STRIPE_API_KEY);

async function create(request, reply) {
  const customer = await stripe.customers.create({
    source: request.payload.stripeToken,
    plan: "pro",
    email: request.user.email
  });
}

export default {
  create
};
