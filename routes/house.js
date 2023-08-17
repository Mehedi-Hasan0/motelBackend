const express = require("express");
const { createNewHouse } = require("../controllers/houseController");
const { verifyJwtToken } = require("../middleware/jwt");
const router = express.Router();

router.use(express.json())

router.post("/house_structure", verifyJwtToken, createNewHouse)