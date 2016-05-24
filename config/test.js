module.exports = {
  db: {
    uri: 'mongodb://localhost/nodosaurus-test'
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
