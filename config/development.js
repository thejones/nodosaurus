module.exports = {
  db: {
    uri: 'mongodb://localhost/nodosaurus_dev'
  },
  stripeOptions: {
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
