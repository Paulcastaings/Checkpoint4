/* eslint-disable consistent-return */
/* eslint-disable no-shadow */
const jwt = require("jsonwebtoken");
const argon = require("argon2");
const user = require("../models/userModel");
const passwordHash = require("../auth/hashPassword");
const { jwtSign, jwtVerify } = require("../auth/jwt");
const { sendEmailResetPassword } = require("../auth/resetPasswordTemplate");

const userController = {
  login: (req, res) => {
    const { email, password } = req.body;
    user
      .findByEmail(email)
      .then(async ([user]) => {
        if (!user) {
          res.status(401).send("Email doesn't exist !");
        } else {
          const {
            email: userEmail,
            password: hashedPassword,
            id,
            firstname,
            lastname,
          } = user;
          if (await argon.verify(hashedPassword, password)) {
            const token = jwt.sign(
              {
                id,
                userEmail,
                firstname,
                lastname,
              },
              process.env.JWT_AUTH_SECRET,
              { expiresIn: "1h" }
            );
            res
              .cookie("userToken", token, {
                httpOnly: true,
                secure: false,
              })
              .status(200)
              .send({
                id,
                firstname,
                lastname,
                email,
                message: `Welcome back ${firstname}`,
              });
          } else {
            res.status(404).send("Wrong password");
          }
        }
      })
      .catch((err) => console.warn(err));
  },
  logOut: (req, res) => {
    return res.clearCookie("userToken").status(200).send("Goodbye");
  },
  postUser: async (req, res, next) => {
    const { firstname, lastname, password, email } = req.body;
    try {
      const hashedPassword = await passwordHash(password);

      user
        .createUser({
          firstname,
          lastname,
          password: hashedPassword,
          email,
        })
        .then((result) => {
          return res.status(201).send({
            id: result.insertId,
            firstname,
            lastname,
            email,
            message: "User created",
          });
          // return next();
        })
        .catch((err) => next(err));
    } catch (err) {
      next(err);
    }
  },

  getAll: (req, res, next) => {
    user
      .getAllUser()
      .then((result) => {
        res.send(result).end();
      })
      .catch((err) => next(err));
  },

  getOne: (req, res, next) => {
    const { id } = req.params;
    user
      .getOne(id)
      .then((result) => {
        if (result[0].length === 0) {
          res.status(404).send("User Not Found").end();
        } else {
          res.send(result[0]).end(); // .end() ?;
        }
      })
      .catch((err) => next(err));
  },
  deleteOne: (req, res, next) => {
    const { id } = req.params;
    user
      .deleteUser(id)
      .then((response) => {
        if (response.affectedRows !== 1) {
          return res.status(404).send(`user ${id} not found`);
        }
        return res.status(200).send(`user ${id} deleted`);
      })
      .catch((err) => next(err));
  },

  updateOne: (req, res) => {
    const { id } = req.params;
    const payload = req.body;
    const allInfo = { ...payload };

    user
      .updateUser(allInfo, id)
      .then((response) => {
        if (response) {
          return res.send("user updated"); // user.getOne(id).then(([result]) => {
          //   res.send({
          //     id: result[0].id,
          //   });
          // });
        }
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  },

  verifyTemporaryToken: (req, res) => {
    const { token } = req.params;

    if (!token) {
      return res.sendStatus(401).send("couldn't find temporary token");
    }

    const data = jwtVerify(token);

    if (!data) {
      return res
        .sendStatus(401)
        .send("token expired or invalid please try again");
    }

    return res.status(200).send({ id: data.id, email: data.email });
  },
  changePassword: async (req, res, next) => {
    const { id } = req.params;
    const { password } = req.body;
    if (password.length === 0) {
      return res.status(400).send("Wrong parameter");
    }

    try {
      const hashedPassword = await passwordHash(password);

      const newData = {
        password: hashedPassword,
        reset_token: null,
      };

      user
        .updateUser(newData, id)
        .then((result) => {
          if (result.affectedRows === 0) {
            return res.status(404).send("user does not exist");
          }
          console.warn("password updated");
          return res.status(200).send("password changed successfully");
        })
        .catch((err) => next(err));
    } catch (err) {
      return next(err);
    }
  },

  resetPassword: (req, res, next) => {
    const { email } = req.body;
    try {
      user.findByEmail(email).then((returnedUser) => {
        if (!returnedUser) {
          return res.status(401).send("Email doesn't exist !");
        }
        console.warn(returnedUser);

        const token = jwtSign(
          {
            id: returnedUser[0].id,
            email,
          },
          { expiresIn: "5m" }
        );

        const updatedUser = {
          ...returnedUser[0],
          reset_token: token,
        };

        console.warn("Credentials obtained, sending message...");
        user.updateUser(updatedUser, returnedUser[0].id).then((result) => {
          if (result.affectedRows === 0) {
            return res.status(404).send("user does not exist");
          }
          sendEmailResetPassword(email, token, returnedUser[0].id);
          return res
            .status(200)
            .send("email sent successfully please follow instructions");
        });
      });
    } catch (err) {
      console.warn(err, "TRY CATCH ERROR");
      return next(err);
    }
  },
};
module.exports = userController;
