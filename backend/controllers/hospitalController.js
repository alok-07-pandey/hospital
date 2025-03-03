const hospitalService = require("../services/hospitalService");

// Create Hospital
const createHospital = async (req, res) => {
  try {
    const hospital = await hospitalService.createHospital(req.body);
    res.status(201).json({ message: "Hospital created successfully", hospital });
  } catch (error) {
    res.status(500).json({ message: error.message || "Error creating hospital" });
  }
};

// Get Hospitals by City
const getHospitalsByCity = async (req, res) => {
  try {
    const { city } = req.query;
    if (!city) {
      return res.status(400).json({ message: "City is required" });
    }
    console.log("i am running");
    
    const hospitals = await hospitalService.getHospitalsByCity(city);
    res.status(200).json({ hospitals });
  } catch (error) {
    res.status(500).json({ message: error.message || "Error fetching hospitals" });
  }
};

// Delete Hospital (by ID)
const deleteHospital = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Hospital ID is required" });
    }
    await hospitalService.deleteHospital(id);
    res.status(200).json({ message: "Hospital deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message || "Error deleting hospital" });
  }
};

// Update Hospital (by ID)
const updateHospital = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Hospital ID is required" });
    }
    const hospital = await hospitalService.updateHospital(id, req.body);
    res.status(200).json({ message: "Hospital updated successfully", hospital });
  } catch (error) {
    res.status(500).json({ message: error.message || "Error updating hospital" });
  }
};

// Add Hospital Details (by ID)
const addHospitalDetails = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Hospital ID is required" });
    }
    const hospital = await hospitalService.addHospitalDetails(id, req.body);
    res.status(200).json({ message: "Hospital details added successfully", hospital });
  } catch (error) {
    res.status(500).json({ message: error.message || "Error adding details" });
  }
};

module.exports = {
  createHospital,
  getHospitalsByCity,
  deleteHospital,
  updateHospital,
  addHospitalDetails,
};
