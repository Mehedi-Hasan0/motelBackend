const express = require("express");
const { verifyJwtToken } = require("../middleware/jwt");
const router = express.Router();

router.use(express.json())

router.post("/booking", verifyJwtToken)

module.exports = router;