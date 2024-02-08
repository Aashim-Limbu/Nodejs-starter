require('dotenv').config('../config.env');
const nodemailer = require('nodemailer');

exports.sendEmail = async (options) => {
  console.log(options);

  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  await transporter.sendMail({
    from: '"Aashim Limbu" <aashimchongbang706@gmail.com>',
    to: options.email,
    subject: options.subject,
    text: options.message,
    html: options.html,
  });
};
