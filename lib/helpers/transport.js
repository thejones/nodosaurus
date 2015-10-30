var nodemailer = require('nodemailer'),
    config = require('config');

module.exports = nodemailer.createTransport({
    service: 'SendGrid',
    auth: {
      user: config.sendgrid.user,
      pass: config.sendgrid.password
    }
});
