const transporter = require("../services/mailer");

const sendEmailResetPassword = (email, token, id) => {
  const mailOptions = {
    from: "<paul-castaings@wilder.school>",
    to: email,
    subject: "Reset your password",
    html: `
      <h3>Please click the link below to reset your password</h3>
      <a href="${process.env.FRONTEND_URL}/forgotPassword/${token}/${email}/${id}">reset password</a>
      `,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) throw err;
    console.warn(`Email sent: ${info.response}`);
  });
};

module.exports = { sendEmailResetPassword };
