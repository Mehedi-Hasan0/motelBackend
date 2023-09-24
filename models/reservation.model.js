const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema({

}, { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } })

const reservationDB = mongoose.model("reservationDB", reservationSchema);

module.exports = reservationDB