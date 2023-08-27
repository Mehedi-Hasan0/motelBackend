const express = require("express");
const { saveHouseStructure, savePrivacyType, saveLocation, saveFloorPlan, saveAmenities, savePhotos, saveTitle, saveHighlight, saveDescription, saveGuestType } = require("../controllers/houseController");
const { verifyJwtToken } = require("../middleware/jwt");
const router = express.Router();

router.use(express.json())

router.post("/save_structure", verifyJwtToken, saveHouseStructure)
router.post("/save_privacy_type", verifyJwtToken, savePrivacyType)
router.post("/save_house_location", verifyJwtToken, saveLocation)
router.post("/save_floor_plan", verifyJwtToken, saveFloorPlan)
router.post("/save_amenities", verifyJwtToken, saveAmenities)
router.post("/save_photos", verifyJwtToken, savePhotos)
router.post("/save_title", verifyJwtToken, saveTitle)
router.post("/save_highlight", verifyJwtToken, saveHighlight)
router.post("/save_description", verifyJwtToken, saveDescription)
router.post("/save_guesttype", verifyJwtToken, saveGuestType)

module.exports = router