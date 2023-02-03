const database = require("../../configDB");

const createUser = (payload) => {
  return database
    .query("INSERT INTO user set ?", [payload])
    .then(([res]) => res);
};

const findByEmail = (email) => {
  return database
    .query("SELECT * FROM user WHERE email = ?", [email])
    .then(([res]) => res);
};

const getAllUser = () => {
  return database.query("SELECT * FROM user").then(([res]) => res);
};
const getOne = (id) => {
  return database
    .query("SELECT firstname, lastname, email FROM user WHERE id = ?", [id])
    .then((res) => res);
};

const deleteUser = (id) => {
  return database
    .query("DELETE FROM user WHERE id = ?", [id])
    .then(([response]) => response);
};

const updateUser = (allInfo, id) => {
  return database
    .query("UPDATE user SET ? WHERE id = ?", [allInfo, id])
    .then((res) => res);
};

module.exports = {
  createUser,
  findByEmail,
  getAllUser,
  getOne,
  deleteUser,
  updateUser,
};
