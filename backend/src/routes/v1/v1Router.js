const express = require("express");
const hospitalRoutes = require("./hospitalRoutes");


const v1Router = express.Router();

v1Router.use("/hospitals", hospitalRoutes);

module.exports = v1Router;
