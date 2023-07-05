require("dotenv").config();
const User = require("../models/user.model");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose")
const saltRounds = 10

exports.signUp = async (req, res, next) => {
    try {
        const payload = req.body;
        if (!payload.name) {
            throw new Error("Please provide user name");
        }
        if (!payload.emailId) {
            throw new Error("Please provide email id");
        }
        if (!payload.birthDate) {
            throw new Error("Please provide date of birth");
        }

        const passwordHash = await bcrypt.hash(payload.password, saltRounds)

        const userObj = {
            name: {
                firstName: payload.name.firstName,
                lastName: payload.name.lastName
            },
            emailId: payload.emailId,
            birthDate: payload.birthDate,
            password: passwordHash
        }

        const user = await User(userObj).save();
        const findCriteria = {
            emailId: payload.emailId
        }
        const userDetails = await User.find(findCriteria);

        const accessToken = jwt.sign(
            {
                _id: userDetails[0]._id,
                role: userDetails[0].role
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "30m" }
        )
        const refreshToken = jwt.sign({ _id: userDetails[0]._id, role: userDetails[0].role }, process.env.REFRESH_TOKEN_SECRET)

        const updatedUser = await User.findOneAndUpdate(findCriteria, { accessToken: accessToken, refreshToken: refreshToken }, { new: true })

        let response = {
            info: "Welcome to motel",
            success: 1,
            status: 200,
            accessToken: accessToken,
            refreshToken: refreshToken,
            user_details: updatedUser
        };
        res.status(200).json(response);
    } catch (err) {
        console.log(err);
        let response = {
            info: "Failed to create user",
            success: 0,
            status: 500
        }
        res.status(500).json({ response });
    }
};

exports.logIn = async (req, res) => {
    const payload = req.body;
    const email = payload.email;
    const password = payload.password;

    const findCriteria = {
        emailId: email
    }
    const userDetails = await User.find(findCriteria).limit(1).exec();

    try {
        let isMatched = await bcrypt.compare(password, userDetails[0].password)
        if (isMatched) {
            const accessToken = jwt.sign(
                {
                    _id: userDetails[0]._id,
                    role: userDetails[0].role
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: "30m" }
            )
            const refreshToken = jwt.sign({ _id: userDetails[0]._id, role: userDetails[0].role }, process.env.REFRESH_TOKEN_SECRET)

            const updatedUser = await User.findOneAndUpdate(findCriteria, { accessToken: accessToken, refreshToken: refreshToken }, { new: true })
            let response = {
                info: "Successfully logged in",
                success: 1,
                status: 200,
                accessToken: accessToken,
                refreshToken: refreshToken,
                user_details: updatedUser
            }
            res.send(response);
        } else if (!isMatched) {
            let response = {
                info: "Incorrect Password",
                success: 0
            }
            res.send(response)
        } else {
            res.send("Not allowed!")
        }
    } catch (error) {
        res.status(500).send()
    }
}



exports.postUser = async (req, res) => {
    res.send(req.user)
}

exports.refreshToken = async (req, res) => {
    const refreshToken = req.body.refreshToken;
    console.log(refreshToken)

    if (!refreshToken) {
        return res.sendStatus(404).send("Please Log in");
    } else {
        try {
            let decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
            const userId = decoded._id;
            const findCriteria = {
                _id: new mongoose.Types.ObjectId(userId)
            };
            const userDetails = await User.findById(findCriteria);
            console.log(userDetails.refreshToken, userDetails, "LINE 138")
            if (userDetails.refreshToken !== refreshToken) {
                return res.sendStatus(403);
            }

            jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (error, user) => {
                if (error) {
                    return res.sendStatus(401);
                }

                const accessToken = jwt.sign(
                    {
                        _id: userDetails._id,
                        role: userDetails.role
                    },
                    process.env.ACCESS_TOKEN_SECRET,
                    { expiresIn: "30m" }
                );
                console.log(accessToken, "AccessToken")

                res.json({ accessToken: accessToken });
            });
        } catch (error) {
            console.error(error);
            res.status(401).send("Invalid refresh token");
        }
    }
};

exports.logOut = async (req, res) => {
    const userId = req.user;
    try {
        const userDetails = await User.updateOne(
            { _id: userId },
            {
                $unset: {
                    accessToken: '',
                    refreshToken: '',
                }
            }
        )
        res.send("User logout")
    } catch (error) {
        console.log(error, "Logout error")
    }
}

exports.getUserDetails = async (req, res) => {
    try {
        const userId = req.user
        const findCriteria = {
            _id: new mongoose.Types.ObjectId(userId)
        }

        const userDetails = await User.findById(findCriteria);

        let response = {
            info: "user exists",
            status: 200,
            success: 1,
            user_details: userDetails
        }
        res.send(response)
    } catch (error) {
        console.log(error, "LINE 202")
    }
}

exports.checkEmail = async (req, res) => {
    try {
        const payload = req.body;
        console.log(payload)
        const findCriteria = {
            emailId: payload.email
        }
        const isEmailExist = await User.find(findCriteria);
        console.log(isEmailExist)
        let response;
        if (isEmailExist.length !== 0) {
            response = {
                info: "User email exist.",
                success: 1,
                status: 200
            }
        } else {
            response = {
                info: "User email doesn't exist.",
                success: 0,
                status: 200
            }
        }
        res.status(200).send(response)
    }
    catch (error) {
        console.log(error)
        res.status(500).send("Failed to search")
    }
}

exports.userProfileDetails = async (req, res) => {
    const userId = req.user
}