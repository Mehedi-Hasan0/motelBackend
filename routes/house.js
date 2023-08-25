const express = require("express");
const { saveHouseStructure, savePrivacyType, saveLocation, saveFloorPlan, saveAmenities, savePhotos } = require("../controllers/houseController");
const { verifyJwtToken } = require("../middleware/jwt");
const router = express.Router();

router.use(express.json())

router.post("/save_structure", verifyJwtToken, saveHouseStructure)
router.post("/save_privacy_type", verifyJwtToken, savePrivacyType)
router.post("/save_house_location", verifyJwtToken, saveLocation)
router.post("/save_floor_plan", verifyJwtToken, saveFloorPlan)
router.post("/save_amenities", verifyJwtToken, saveAmenities)
router.post("/save_photos", verifyJwtToken, savePhotos)

module.exports = router