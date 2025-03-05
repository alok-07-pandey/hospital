const express = require("express");
const {
  createHospital,
  getHospitalsByCity,
  updateHospital,
  deleteHospital,
  addHospitalDetails,
  getHospitalById, 
} = require("../../controller/hostpitalController");

const router = express.Router();

router.post("/create", createHospital);
router.get("/", getHospitalsByCity);
router.put("/update/:id", updateHospital);
router.delete("/delete/:id", deleteHospital);
router.put("/details/:id", addHospitalDetails);
router.get("/:id", getHospitalById); 

module.exports = router;
