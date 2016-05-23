module.exports = {
  db: {
    uri: process.env.MONGO_URI
  },
  stripeOptions: {
    apiKey: process.env.STRIPE_API_KEY,
    stripePubKey: process.env.STRIPE_PUBLIC_KEY,
    defaultPlan: 'free',
    plans: ['free', 'pro'],
    planData: {
      'free': {
        name: 'Free',
        price: 0
      },
      'pro': {
        name: 'Pro',
        price: 9.99
      }
    }
  }
};
