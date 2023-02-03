/* eslint-disable consistent-return */
/* eslint-disable no-shadow */
const user = require("../models/userModel");

const emailCheck = (req, res, next) => {
  user
    .findByEmail(req.body.email)
    .then(([user]) => {
      if (user) {
        res.status(401).send("Email already used");
      } else {
        return next();
      }
    })
    .catch((err) => {
      next(err);
    });
};
module.exports = emailCheck;
