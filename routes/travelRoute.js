const express = require("express");
const router = express.Router();
const travelModel = require("../models/travelModel");
const { cloudUpload } = require("../cloudinary/cloudinaryConfig");

router.get("/travels", async (req, res) => {
    try {
        const travels = await travelModel.find()

        res.status(200).send({
            travels
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

router.get("/travels/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const travel = await travelModel.findOne(id)

        if (!travel) {
            return res.status(404)
                .send({
                    statusCode: 404,
                    message: "travel not found, does not exists"
                })
        }

        res.status(200).send(travel)
    } catch (error) {
        res
            .status(500)
            .send({
                statusCode: 500,
                message: `Internal server error ${error}`
            })
    }
})

router.post("/travels", async (req, res) => {
    const newTravel = new travelModel({
        location: req.body.location,
        img: req.body.img,
        description: req.body.description,
        price: req.body.price
    })

    try {
        const travelToSave = await newTravel.save();
        res.status(201).send({
            statusCode: 201,
            payload: travelToSave
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

router.post("/travels/uploadImg", cloudUpload.single("uploadImg"), async (req, res) => {
    try {
        res.status(200).json({source: req.file.path})
    } catch (error) {
        console.log(e)
        res.status(500)
          .send({
              statusCode: 500,
              message: 'File Upload Error'
          })
    }
})

module.exports = router;