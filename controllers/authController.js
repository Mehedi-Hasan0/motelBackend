const User = require("../models/user.model");

exports.createUser = async (req, res, next) => {
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

    try {
        const user = await User.create(payload);
        let response = {
            info: "User created successfully"
        };
        res.status(200).json(response);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Failed to create user" });
    }
};