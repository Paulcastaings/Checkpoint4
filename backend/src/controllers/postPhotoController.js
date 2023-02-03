/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
const postPhotoModel = require("../models/postPhotoModel");

const postPhotoController = {
  getAllPost: (req, res, next) => {
    if (req.query.country !== "all") {
      return res.send("wrong parameter");
    }
    postPhotoModel
      .findAll()
      .then((result) => {
        res.send(result);
      })
      .catch((err) => next(err));
  },
  getAllUserPost: (req, res, next) => {
    const { id } = req.params;
    postPhotoModel
      .findAllUserPost(id)
      .then((result) => res.send(result))
      .catch((err) => next(err));
  },
  getOnePost: (req, res, next) => {
    const { id } = req.params;
    postPhotoModel
      .findOne(id)
      .then((post) => {
        if (post[0].length === 0) {
          res.status(404).send("this post do not exists anymore");
        } else {
          res.send(post[0]);
        }
      })
      .catch((err) => next(err));
  },
  createPost: (req, res, next) => {
    const { user_id, title, description, country_id } = req.body;
    const photo = req?.file?.filename;

    postPhotoModel
      .createOne(user_id, title, description, country_id, photo)
      .then((result) => res.status(201).send(`${result.insertId}`))
      .catch((err) => next(err));
  },

  deletePost: (req, res, next) => {
    const { id } = req.params;
    postPhotoModel
      .deleteOne(id)
      .then((response) => {
        if (response.affectedRows !== 1) {
          return res.status(404).send(`post ${id} not found`);
        }
        return res.status(200).send(`post ${id} deleted`);
      })
      .catch((err) => next(err));
  },
  updatePost: (req, res) => {
    const { id } = req.params;
    const payload = req.body;
    postPhotoModel
      .updateOne(payload, id)
      .then((result) => res.status(200).send(`post ${id} updated`))
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  },
};

module.exports = postPhotoController;
