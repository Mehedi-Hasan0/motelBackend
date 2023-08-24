const mongoose = require("mongoose");
const User = require("../models/user.model");
const House = require("../models/house.model");

exports.saveHouseStructure = async (req, res) => {
    try {
        const userId = req.user;
        const payload = req.body;
        const houseId = payload.houseId;
        const housetype = payload.houseType;
        console.log(payload, "Line 5")
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