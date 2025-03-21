const Hospital = require("../models/hospital");

// ✅ Create a new hospital
exports.createHospital = async (req, res) => {
  try {
    const newHospital = new Hospital(req.body);
    await newHospital.save();
    res.status(201).json(newHospital);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Get hospitals by city (or all hospitals if no city is provided)
exports.getHospitalsByCity = async (req, res) => {
  try {
    const { city } = req.query;
    const query = city ? { city: { $regex: new RegExp(city, "i") } } : {};
    const hospitals = await Hospital.find(query);

    if (!hospitals.length) {
      return res.status(404).json({ error: "No hospitals found in this city." });
    }

    res.status(200).json(hospitals);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Update hospital details
exports.updateHospital = async (req, res) => {
  try {
    const { id } = req.params; 
    const updatedHospital = await Hospital.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedHospital) {
      return res.status(404).json({ error: "Hospital not found." });
    }

    res.status(200).json(updatedHospital);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Delete a hospital
exports.deleteHospital = async (req, res) => {
  try {
    const { id } = req.params; // FIXED: Changed from req.query.id to req.params.id
    const hospital = await Hospital.findByIdAndDelete(id);

    if (!hospital) {
      return res.status(404).json({ error: "Hospital not found." });
    }

    res.status(200).json({ message: "Hospital deleted successfully." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.addHospitalDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedHospital = await Hospital.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedHospital) {
      return res.status(404).json({ error: "Hospital not found." });
    }

    res.status(200).json(updatedHospital);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// ✅ Get hospital by ID
exports.getHospitalById = async (req, res) => {
  try {
    const { id } = req.params;
    const hospital = await Hospital.findById(id);

    if (!hospital) {
      return res.status(404).json({ error: "Hospital not found." });
    }

    res.status(200).json(hospital);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

