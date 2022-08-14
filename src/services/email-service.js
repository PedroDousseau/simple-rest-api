// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
import sgMail from '@sendgrid/mail';
import config from '../config';

sgMail.setApiKey(config.sendgridKey);

export default class EmailService {
  static send = async (to, subject, body) => {
    sgMail.send({
      to,
      from: 'hello@dousseau.com',
      subject,
      // text: text,
      html: body,
    });
  };
}
