const express = require("express");
const { signUp, checkEmail, logIn, refreshToken, postUser } = require("../controllers/authController");
const { verifyJwtToken } = require("../middleware/jwt");
const router = express.Router();

router.use(express.json())

router.post("/sign_up", signUp)
router.post("/log_in", logIn)
router.post("/post", verifyJwtToken, postUser)
router.post("/refresh_token", refreshToken)
router.post("/check_email", checkEmail)

module.exports = router;