const mongoose = require("mongoose");

const hospitalSchema = new mongoose.Schema({
  name: { type: String, required: true },
  city: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: String, required: true }
}, { timestamps: true });

const Hospital = mongoose.model("Hospital", hospitalSchema);
module.exports = Hospital;
