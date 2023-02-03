const express = require("express");
// const checkEmail = require("../middleware/checkEmail");

const utilsRouter = express.Router();
const utilsControllers = require("../controllers/utilsControllers");

utilsRouter.get("/allcountries", utilsControllers.getAllCountries);

module.exports = utilsRouter;
