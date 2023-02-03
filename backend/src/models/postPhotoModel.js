/* eslint-disable camelcase */
const database = require("../../configDB");

const createOne = (user_id, title, description, country_id, photo) => {
  return database
    .query(
      `INSERT INTO post (
        user_id, title, description, country_id, photo) VALUES (?,?,?,?,?)`,
      [user_id, title, description, country_id, photo]
    )
    .then(([res]) => res);
};

const findAll = () => {
  return database.query("SELECT * FROM post").then(([res]) => {
    return res;
  });
};
const findAllUserPost = (id) => {
  return database
    .query("SELECT * FROM post WHERE user_id = ?", [id])
    .then(([res]) => res);
};

const findOne = (id) => {
  return database
    .query("SELECT * FROM post WHERE id = ?", [id])
    .then((res) => res);
};

const deleteOne = (id) => {
  return database
    .query("DELETE FROM post WHERE id = ?", [id])
    .then(([res]) => res);
};

const updateOne = (payload, id) => {
  return database
    .query("UPDATE post SET ? WHERE id = ?", [payload, id])
    .then((res) => res);
};

module.exports = {
  createOne,
  findAll,
  findAllUserPost,
  findOne,
  deleteOne,
  updateOne,
};
