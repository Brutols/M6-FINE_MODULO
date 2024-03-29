const express = require("express");
const router = express.Router();
const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");

router.get("/users", async (req, res) => {
    try {
        const users = await userModel.find()

        res.status(200).send({
            users
        })
    } catch (error) {
        res
            .status(500)
            .send({
                statusCode: 500,
                message: `Internal server error ${error}`
            })
    }
});

router.get("/users/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const user = await userModel.findOne(id)

        if (!user) {
            return res.status(404)
                    .send({
                        statusCode: 404,
                        message: "user not found, does not exists"
                    })
        }

        res.status(200).send(user)
    } catch (error) {
        res
            .status(500)
            .send({
                statusCode: 500,
                message: `Internal server error ${error}`
            })
    }
});

router.post("/users", async (req, res) => {
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    const newUser = new userModel({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hashedPassword
    })

    try {
        const userToSave = await newUser.save();
        res.status(201).send({
            statusCode: 201,
            payload: userToSave
        })
    } catch (error) {
        res
            .status(500)
            .send({
                statusCode: 500,
                message: `Internal server error ${error}`
            })
    }
});

module.exports = router;