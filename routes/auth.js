const express = require("express");
const { createUser } = require("../controllers/authController");
const router = express.Router();

router.use(express.json())

router.post("/createUser", createUser)

module.exports = router;