const mongoose = require("mongoose");

const LeadSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  message: { type: String, required: true },
  source: { type: String, enum: ["Website", "Chatbot", "API"], required: true },
  createdAt: { type: Date, default: Date.now },
  score: { type: Number, default: 0 }, // Lead Scoring Field
  assignedTo: { type: String, default: null } // Assigned to Sales/Doctor
});

module.exports = mongoose.model("Lead", LeadSchema);
