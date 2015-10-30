'use strict';

module.exports = {
    db: {
        uri: process.env.MONGO_URI,
    		options: {
    			user: process.env.MONGO_USER,
    			pass: process.env.MONGO_PASSWORD
    		}
	},
	github: {
		clientId: process.env.GITHUB_ID || 'APP_ID',
		clientSecret: process.env.GITHUB_SECRET || 'APP_SECRET'
	},
	sendgrid: {
        user: process.env.SENDGRID_USER ,
        password: process.env.SENDGRID_PASSWORD
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
