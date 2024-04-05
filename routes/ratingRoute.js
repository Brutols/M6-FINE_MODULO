const express = require("express");
const router = express.Router();
const ratingModel = require("../models/ratingModel");

router.get("/:travelId/ratings", async (req, res) => {
    const { travelId } = req.params

    try {
        const ratings = await ratingModel.find(travelId)

        res.status(200).send({
            ratings
        })
    } catch (error) {
        res
            .status(500)
            .send({
                statusCode: 500,
                message: `Internal server error ${error}`
            })
    }
})

router.post("/ratings", async (req, res) => {
    const newRating = new ratingModel({
        travelId: req.body.travelId,
        rate: req.body.rate
    })

    try {
        const ratingToSave = await newRating.save();
        res.status(201).send({
            statusCode: 201,
            payload: ratingToSave
        })
    } catch (error) {
        res
            .status(500)
            .send({
                statusCode: 500,
                message: `Internal server error ${error}`
            })
    }
})

module.exports = router;