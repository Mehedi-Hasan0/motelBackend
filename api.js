require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose")

const app = express();

const port = 5000;

async function main() {
    await mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.in81gjk.mongodb.net/`)
    try {
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`)
        })
    } catch (err) {
        console.log(err)
    }
}

main();