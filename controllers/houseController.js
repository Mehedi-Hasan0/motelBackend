const mongoose = require("mongoose");
const User = require("../models/user.model");
const House = require("../models/house.model");

exports.saveHouseStructure = async (req, res) => {
    try {
        const userId = req.user;
        const payload = req.body;
        const houseId = payload.houseId;
        const housetype = payload.houseType;
        // console.log(payload, "Line 5")
        const findCriteria = {
            _id: new mongoose.Types.ObjectId(userId)
        }
        const userDetails = await User.findById(findCriteria);
        // console.log(userDetails)
        if (userDetails.role !== "host") {
            throw Error("User is not a host")
        }

        let houseTypeData = {
            houseType: housetype
        }

        let findHouseCriteria = {
            _id: new mongoose.Types.ObjectId(houseId)
        }

        if (housetype !== undefined) {
            const houseDetails = await House.findOneAndUpdate(findHouseCriteria, houseTypeData, { new: true })

            let response = {
                status: 200,
                succeed: 1,
                info: "Successfully housedata updated",
                houseDetails
            }

            res.status(200).send(response)
        }

    } catch (error) {
        console.log(error)
    }

}

exports.savePrivacyType = async (req, res) => {
    try {
        const userId = req.userId;
        const payload = req.body;
        const houseId = payload.houseId;
        const privacytype = payload.privacyType;

        // console.log(payload, "line 55")

        const findHouseCriteria = {
            _id: new mongoose.Types.ObjectId(houseId)
        }

        const updateCriteria = {
            privacyType: privacytype
        }

        if (privacytype !== undefined) {
            const houseDetails = await House.findOneAndUpdate(findHouseCriteria, updateCriteria, { new: true })

            let response = {
                status: 200,
                succeed: 1,
                info: "Successfully housedata updated",
                houseDetails
            }

            res.status(200).send(response)
        }
    } catch (error) {
        console.log(error)
    }
}
exports.saveLocation = async (req, res) => {
    try {
        const payload = req.body;
        const houseId = payload.houseId;
        const locationData = payload.location;

        // console.log(payload, "location payload")

        const findHouseCriteria = {
            _id: new mongoose.Types.ObjectId(houseId)
        }

        const updateCriteria = {
            location: locationData
        }

        if (locationData !== undefined) {
            const houseDetails = await House.findOneAndUpdate(findHouseCriteria, updateCriteria, { new: true })

            let response = {
                status: 200,
                succeed: 1,
                info: "Successfully housedata updated",
                houseDetails
            }

            res.status(200).send(response)

            // console.log(houseDetails, "Line 98")
        }
    } catch (error) {
        console.log(error)
    }
}

exports.saveFloorPlan = async (req, res) => {
    try {
        const payload = req.body;
        const houseId = payload.houseId;
        const floorplanData = payload.floorPlan;

        // console.log(payload, "line 121")

        const findHouseCriteria = {
            _id: new mongoose.Types.ObjectId(houseId)
        }

        const updateCriteria = {
            floorPlan: floorplanData
        }

        if (floorplanData !== undefined) {
            const houseDetails = await House.findOneAndUpdate(findHouseCriteria, updateCriteria, { new: true })

            let response = {
                status: 200,
                succeed: 1,
                info: "Successfully housedata updated",
                houseDetails
            }

            res.status(200).send(response)

            // console.log(houseDetails, "line 134")
        }
    } catch (error) {
        console.log(error)
    }
}

exports.saveAmenities = async (req, res) => {
    try {
        const payload = req.body;
        const houseId = payload.houseId;
        const amenitiesData = payload.amenities;

        const findHouseCriteria = {
            _id: new mongoose.Types.ObjectId(houseId)
        }

        const updateCriteria = {
            amenities: amenitiesData
        }

        if (amenitiesData !== undefined) {
            const houseDetails = await House.findOneAndUpdate(findHouseCriteria, updateCriteria, { new: true })

            let response = {
                status: 200,
                succeed: 1,
                info: "Successfully housedata updated",
                houseDetails
            }

            res.status(200).send(response)

            console.log(houseDetails, "line 177")

        }

    } catch (error) {
        console.log(error)
    }
}