const mongoose = require("mongoose");

const RatingSchema = new mongoose.Schema({
    travelId: {
        type: "string",
        required: true
    },
    rate: {
        type: "number",
        required: true
    }
}, {timestamps: true, strict: true})

module.exports = mongoose.model("ratingModel", RatingSchema, "ratings")