const express = require("express");
const userRouter = require("./userRouter");
const postPhotoRouter = require("./postPhotoRouter");
const utilsRouter = require("./utilsRouter");

const router = express.Router();

router.use("/user", userRouter);
router.use("/post", postPhotoRouter);
router.use("/utils", utilsRouter);

module.exports = router;
