const Hospital = require("../models/Hospital");
const mongoose = require("mongoose");

// Create a hospital
const createHospital = async (hospitalData) => {
  return await Hospital.create(hospitalData);
};

// Get hospitals by city (handles null values)
const getHospitalsByCity = async (city) => {
  return await Hospital.find(city ? { city: city.trim() } : {}); // Trim to prevent errors
};

// Delete a hospital (with validation)
const deleteHospital = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("Invalid hospital ID format");
  }
  
  const hospital = await Hospital.findById(id);
  if (!hospital) {
    throw new Error("Hospital not found");
  }

  return await Hospital.findByIdAndDelete(id);
};

// Update a hospital (with validation)
const updateHospital = async (id, updateData) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("Invalid hospital ID format");
  }

  const hospital = await Hospital.findById(id);
  if (!hospital) {
    throw new Error("Hospital not found");
  }

  return await Hospital.findByIdAndUpdate(id, updateData, { new: true });
};

// Add hospital details (with validation)
const addHospitalDetails = async (id, details) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("Invalid hospital ID format");
  }

  const hospital = await Hospital.findById(id);
  if (!hospital) {
    throw new Error("Hospital not found");
  }

  return await Hospital.findByIdAndUpdate(id, { $set: details }, { new: true });
};

module.exports = {
  createHospital,
  getHospitalsByCity,
  deleteHospital,
  updateHospital,
  addHospitalDetails,
};
