const express = require("express");
const login = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel")

login.post("/login", async (req, res) => {
    try {
        const user = await userModel.findOne({email: req.body.email})
        if (!user) {
            return res.status(404).send({
                statusCode: 404,
                message: "user not found, may not exist"
            })
        }

        const isPasswordValid = await bcrypt.compare(req.body.password, user.password)
        if (!isPasswordValid) {
            return res.status(401).send({
                statusCode: 401,
                message: "email or password is not valid"
            })
        }

        const token = jwt.sign({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email
        }, process.env.SECRET_KEY, {
            expiresIn: "24h"
        })

        res.setHeader("authoriation", token)
        res.status(200).send({
            statusCode: 200,
            message: "login successful",
            token
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

module.exports = login;