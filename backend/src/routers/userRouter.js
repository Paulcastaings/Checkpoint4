const express = require("express");

const userRouter = express.Router();
const userController = require("../controllers/userController");
const emailCheck = require("../middleware/emailCheck");

userRouter.put("/update/:id", userController.updateOne);
userRouter.get("/:id", userController.getOne);
userRouter.get("/", userController.getAll);
userRouter.delete("/:id", userController.deleteOne);

userRouter.post("/", emailCheck, userController.postUser);
userRouter.post("/login", userController.login);
userRouter.post("/logOut", userController.logOut);

module.exports = userRouter;
