const express = require("express");
const multer = require("multer");

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "../frontend/public/uploads");
  },
  filename: (req, file, callBack) => {
    const ext = file.mimetype.split("/")[1];
    const fileName = file.originalname.substring(
      0,
      file.originalname.lastIndexOf(".")
    );
    callBack(null, `${fileName}-${Date.now()}.${ext}`);
  },
});

const upload = multer({ storage });

const postPhotoRouter = express.Router();
const postPhotoController = require("../controllers/postPhotoController");

postPhotoRouter.post(
  "/",
  upload.single("photo"),
  postPhotoController.createPost
);
postPhotoRouter.get("/allPost", postPhotoController.getAllPost);
postPhotoRouter.get("/allUserPost/:id", postPhotoController.getAllUserPost);
postPhotoRouter.delete("/:id", postPhotoController.deletePost);
postPhotoRouter.put("/:id", postPhotoController.updatePost);

module.exports = postPhotoRouter;
