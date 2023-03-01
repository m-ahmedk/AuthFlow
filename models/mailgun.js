require('dotenv').config()
const formData = require('form-data');
const Mailgun = require('mailgun.js');
const { InternalServerError } = require('../errors/index');
const mailgun = new Mailgun(formData);
const mg = mailgun.client({username: 'api', key: process.env.MAILGUN_API_KEY});
const domain = process.env.MAILGUN_DOMAIN_NAME;
const fromEmail = process.env.MAILGUN_MAIL_FROM;

const sendEmail = async (to, subject, body) => {
  try { 
     const response = await mg.messages.create(domain, {
        from: fromEmail,
        to: [to],
        subject: subject,
        html: body
      })

      return response
    }
    catch(error) {
      throw new InternalServerError(`Error occurred when sending an email via mailgun api: ${error}`)
    }
}

module.exports = sendEmail