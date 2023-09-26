const express = require("express");
const { verifyJwtToken } = require("../middleware/jwt");
const { getStripePublishableKey, createPaymentIntent } = require("../controllers/reservationController");
const router = express.Router();

router.use(express.json())

router.get("/config", getStripePublishableKey)

router.post("/create_payment_intent", createPaymentIntent)
router.post("/booking", verifyJwtToken)



module.exports = router;