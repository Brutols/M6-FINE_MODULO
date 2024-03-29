const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    firstName: {
        type: "string",
        required: true
    },
    lastName: {
        type: "string",
        required: true
    },
    email: {
        type: "string",
        required: true
    },
    password: {
        type: "string",
        required: true
    }
}, {timestamps: true, strict: true})

module.exports = mongoose.model("userModel", UserSchema, "users")