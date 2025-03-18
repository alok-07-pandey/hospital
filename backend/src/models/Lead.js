const mongoose = require("mongoose");

const LeadSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  message: { type: String, required: true },
  source: { type: String, enum: ["Website", "Chatbot", "API"], required: true },
  createdAt: { type: Date, default: Date.now },
  urgencyLevel: { type: String, enum: ["Low", "Medium", "High"], default: "Low" }, //  Urgency Factor
  previousInteractions: { type: Number, default: 0 }, //  Tracks engagement
  score: { type: Number, default: 0 }, //  Dynamic Lead Score
  assignedTo: { type: String, default: null } // Assigned to Sales/Doctor
});

//  Automatically calculate lead score before saving
LeadSchema.pre("save", function (next) {
  const { calculateLeadScore } = require("../utils/leadScoring");
  this.score = calculateLeadScore(this.message, this.createdAt, this.urgencyLevel, this.previousInteractions);
  next();
});

module.exports = mongoose.model("Lead", LeadSchema);
