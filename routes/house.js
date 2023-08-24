const express = require("express");
const { saveHouseStructure, savePrivacyType } = require("../controllers/houseController");
const { verifyJwtToken } = require("../middleware/jwt");
const router = express.Router();

router.use(express.json())

router.post("/save_structure", verifyJwtToken, saveHouseStructure)
router.post("/save_privacy_type", verifyJwtToken, savePrivacyType)

module.exports = router