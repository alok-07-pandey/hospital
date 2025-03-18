const Lead = require("../models/Lead"); // ✅ Ensure correct filename
const { calculateLeadScore } = require("../utils/leadScoring");

//  Create a new lead with scoring
const createLead = async (req, res) => {
  try {
    const { name, email, phone, message, source } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({ success: false, message: "Name, email, and phone are required." });
    }

    const score = calculateLeadScore(message, source, new Date());
    const newLead = new Lead({ name, email, phone, message, source, score });

    await newLead.save();
    res.status(201).json(newLead); //  This ensures frontend correctly adds the new lead to state
  } catch (error) {
    console.error("❌ Error saving lead:", error);
    res.status(500).json({ success: false, message: "Error saving lead", error: error.message });
  }
};

//  Fetch all leads sorted by score (High to Low)
const getLeads = async (req, res) => {
  try {
    const leads = await Lead.find().sort({ score: -1 }); // Highest score first
    res.json({ success: true, leads });
  } catch (error) {
    console.error("❌ Error fetching leads:", error);
    res.status(500).json({ success: false, message: "Error fetching leads", error: error.message });
  }
};

module.exports = { createLead, getLeads };
