const jwt = require("jsonwebtoken");

const authorization = (req, res, next) => {
  const token = req.cookies.userToken;

  if (!token) {
    return res
      .status(401)
      .send({ message: "You need to log in or sign in to access this page" });
  }
  try {
    const data = jwt.verify(token, process.env.JWT_AUTH_SECRET);
    req.userId = data.id;
    req.userEmail = data.email;
    req.userFirstName = data.firstname;
    req.userLastName = data.lastname;
    return next();
  } catch (err) {
    return res
      .status(401)
      .send({ message: "Something went wrong with token in auth.js ?" });
  }
};

module.exports = { authorization };
