module.exports = {
  db: {
    uri: 'mongodb://localhost/nodosaurus-test',
    options: {
      user: '',
      pass: ''
    }
  },
  github: {
    clientId: process.env.GITHUB_ID || 'APP_ID',
    clientSecret: process.env.GITHUB_SECRET || 'APP_SECRET'
  },
  sendgrid: {
    user: process.env.SENDGRID_USER || '',
    password: process.env.SENDGRID_PASSWORD || ''
  },
  stripeOptions: {
    apiKey: '',
    stripePubKey: '',
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
