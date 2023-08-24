const express = require("express");
const { saveHouseStructure } = require("../controllers/houseController");
const { verifyJwtToken } = require("../middleware/jwt");
const router = express.Router();

router.use(express.json())

router.post("/save_structure", verifyJwtToken, saveHouseStructure)

module.exports = router