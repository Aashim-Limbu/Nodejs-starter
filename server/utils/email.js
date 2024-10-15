require('dotenv').config('../config.env');
const nodemailer = require('nodemailer');
const sgTransport = require('nodemailer-sendgrid-transport');
const generateWelcomeTemplate = require('./welcome-template');

class Email {
  constructor(user, url) {
    this.user = user;
    this.to = user.email;
    this.firstName = user.name.split(' ')[0];
    this.url = url;
    this.from = process.env.EMAIL_FROM;
  }

  createTransport() {
    if (process.env.NODE_ENV === 'production') {
      const options = {
        auth: {
          api_key: process.env.SEND_GRID_PASSWORD,
        },
      };
      return nodemailer.createTransport(sgTransport(options));
    }
    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  async sendEmail(subject, message, html = '<p>Hi from Aashim </p>') {
    return await this.createTransport().sendMail({
      from: this.from,
      to: this.to,
      subject: subject,
      text: message,
      html: html,
    });
  }

  async sendWelcomeMessage() {
    return await this.sendEmail(
      'Welcome to our family',
      'Thank you for joining community',
      generateWelcomeTemplate(this.user.name),
    );
  }
}
module.exports = Email;
// exports.sendEmail = async (options) => {
//   const transporter = nodemailer.createTransport({
//     host: process.env.EMAIL_HOST,
//     port: process.env.EMAIL_PORT,
//     secure: false,
//     auth: {
//       user: process.env.EMAIL_USER,
//       pass: process.env.EMAIL_PASSWORD,
//     },
//   });

//   await transporter.sendMail({
//     from: '"Aashim Limbu" <aashimchongbang706@gmail.com>',
//     to: options.email,
//     subject: options.subject,
//     text: options.message,
//     html: options.html,
//   });
// };
