const mongoose = require("mongoose")

const TravelSchema = new mongoose.Schema({
    location: {
        type: "string",
        required: true
    },
    img: {
        type: "string",
        required: true
    },
    description: {
        type: "string",
        required: true
    },
    price: {
        type: "number",
        required: true
    }
})

module.exports = mongoose.model("travelModel", TravelSchema, "travels")