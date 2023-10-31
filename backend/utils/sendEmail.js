require('dotenv').config()
const nodemailer = require('nodemailer')


const MAIL = process.env.MAIL;
const PASS = process.env.PASS;

const sendEmail = (user,body) => {

  var nodemailer = require("nodemailer");

  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: MAIL,
      pass: PASS,
    },
  });

  var mailOptions = {
    from: MAIL,
    to: user.email,
    subject: "Verification Email",
    text: body,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

module.exports = sendEmail;
