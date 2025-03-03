const express = require("express");
const router = express.Router();
const hospitalController = require("../controllers/hospitalController");




// Create a new hospital
router.post("/", hospitalController.createHospital);

// Get hospitals by city
router.get("/", hospitalController.getHospitalsByCity);

// Delete hospital by ID
router.delete("/:id", hospitalController.deleteHospital);

// Update hospital by ID
router.put("/:id", hospitalController.updateHospital);

// Add hospital details by ID
router.post("/:id/details", hospitalController.addHospitalDetails);

module.exports = router;
