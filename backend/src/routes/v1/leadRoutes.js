const express = require("express");
const { createLead, getLeads } = require("../../controller/leadController");
const { calculateLeadScore } = require("../../utils/leadScoring"); // ✅ Import scoring function

const router = express.Router();

// Create a new lead (POST)
router.post("/create", createLead);

// Fetch leads sorted by score (GET)
router.get("/", getLeads);

//  API to calculate lead score
router.post("/calculate-score", (req, res) => {
  try {
    const { message, createdAt, urgencyLevel, previousInteractions } = req.body;
    if (!message || !createdAt) {
      return res.status(400).json({ error: "Message and createdAt are required" });
    }
    
    const score = calculateLeadScore(message, createdAt, urgencyLevel || "low", previousInteractions || 0);
    res.json({ score });
  } catch (error) {
    console.error("Error calculating lead score:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
