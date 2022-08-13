// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
const sgMail = require('@sendgrid/mail');
const config = require('../config');

sgMail.setApiKey(config.sendgridKey);

exports.send = async (to, subject, body) => {
  sgMail.send({
    to,
    from: 'hello@dousseau.com',
    subject,
    // text: text,
    html: body,
  });
};
