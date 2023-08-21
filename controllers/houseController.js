const mongoose = require("mongoose");
const User = require("../models/user.model");
const House = require("../models/house.model");

exports.createNewHouse = async (req, res) => {
    try {
        const userId = req.user;
        const payload = req.body;
        const housetype = payload.houseType;
        console.log(userId, payload, "Line 5")
        const findCriteria = {
            _id: new mongoose.Types.ObjectId(userId)
        }
        const userDetails = await User.findById(findCriteria);
        // console.log(userDetails)
        if (userDetails.role !== "host") {
            throw Error("User is not a host")
        }

        const houseDetails = await House.findOne({ author: userId })

        if (housetype !== undefined) {

        }
        console.log(houseDetails)

    } catch (error) {
        console.log(error)
    }

}