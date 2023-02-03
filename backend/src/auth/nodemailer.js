const nodemailer = require("nodemailer");

const createTransporter = (account) => {
  return nodemailer.createTransport({
    ...account.smtp,
    auth: {
      user: account.user,
      pass: account.pass,
    },
  });
};

module.exports = { createTransporter };
