const express = require("express");
const router = express.Router();
const hospitalRoutes = require("./hospitalRoutes");
const leadRoutes = require("./leadRoutes");

router.use("/hospitals", hospitalRoutes);
router.use("/leads", leadRoutes);

module.exports = router; 
