const database = require("../../configDB");

const getAllCountries = () => {
  return database.query("SELECT * FROM country").then(([res]) => res);
};
module.exports = {
  getAllCountries,
};
