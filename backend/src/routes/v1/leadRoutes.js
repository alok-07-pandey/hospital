const express = require("express");
const { createLead, getLeads } = require("../../controller/leadController");
const router = express.Router();

// Create a new lead (POST)
router.post("/create", createLead);

// Fetch leads sorted by score (GET)
router.get("/", getLeads);

module.exports = router;
