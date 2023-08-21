const mongoose = require("mongoose");

const houseSchema = new mongoose.Schema({
    author: {
        type: String
    },
    status: {
        type: String,
        default: "In progress"
    },
    houseType: {
        type: String,
    },
    privacyType: {
        type: String
    },
    location: {
        country: {
            type: String
        },
        addressLineOne: {
            type: String
        },
        addressLineTwo: {
            type: String
        },
        city: {
            type: String
        },
        state: {
            type: String,
        },
        postCode: {
            type: String
        }
    },
    floorPlan: {
        guests: {
            type: Number
        },
        bedrooms: {
            type: Number
        },
        beds: {
            type: Number
        },
        bathrooms: {
            type: Number
        }

    },
    amenities: {
        type: Array
    },
    photos: {
        type: Array
    }

}, { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } });

const House = mongoose.model("House", houseSchema);

module.exports = House;