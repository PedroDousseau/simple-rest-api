'use strict';
// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
const config = require('../config');
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(config.sendgridKey);

exports.send = async (to, subject, body) => {
    sgMail.send({
        to: to,
        from: 'hello@dousseau.com',
        subject: subject,
        //text: text,
        html: body,
    });
};