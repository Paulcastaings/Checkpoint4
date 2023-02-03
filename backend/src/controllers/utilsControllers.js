/* eslint-disable no-unused-vars */
const utilsModel = require("../models/utilsModel");

const utilsControllers = {
  getAllCountries: (req, res, next) => {
    utilsModel
      .getAllCountries()
      .then((country) => res.send(country))
      .catch((err) => next(err));
  },
};
module.exports = utilsControllers;
