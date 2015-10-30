'use strict';
var Fs = require('fs');

module.exports = {
    db: {
        uri: 'mongodb://localhost/nodosaurus_dev'
	},
	github: {
		clientId: process.env.GITHUB_ID || 'APP_ID',
		clientSecret: process.env.GITHUB_SECRET || 'APP_SECRET'
	},
	sendgrid: {
        user: process.env.SENDGRID_USER || '',
        password: process.env.SENDGRID_PASSWORD || ''
    },
    tls: {
        key: Fs.readFileSync('./lib/certs/key.key'),
        cert: Fs.readFileSync('./lib/certs/cert.crt'),

        // Only necessary if using the client certificate authentication.
        requestCert: true,

        // Only necessary only if client is using the self-signed certificate.
        ca: []
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
