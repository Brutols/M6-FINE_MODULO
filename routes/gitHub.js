const express = require("express");
const gitHub = express.Router();
const strategy = require("passport-github").Strategy;
const passport = require("passport");
require("dotenv").config();
const session = require("express-session");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel")
const crypto = require("crypto")

gitHub.use(
    session({
        secret: process.env.GITHUB_CLIENT_SECRET,
        resave: false,
        saveUninitialized: false
    })
)

passport.use(passport.initialize())
passport.use(passport.session())

passport.serializeUser((user, done) => {
    done(null, user)
})

passport.deserializeUser((user, done) => {
    done(null, user)
})

passport.use(
    new strategy({
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: process.env.GITHUB_CALLBACK_URL,
        proxy: true,
        scope: ["user:email"]
    }, async (accessToken, refreshToken, profile, cb) => {
        const { _json } = profile
        const name = _json.name.split(" ")
        const user = await userModel.findOne({email: _json.email})
        
        if (!user) {
            const newUser = new userModel({
                firstName: name[0],
                lastName: name[1],
                email: _json.email || `${firstName}.${lastName}@null.com`,
                password: crypto.randomBytes(10).toString("hex")
            })
            await newUser.save()
        }

        return cb(null, profile)
    })
)

gitHub.get("/auth/github", passport.authenticate("github", {scope: ["user:email"]}), (req, res) => {
    const user = req.user
    const redirectUrl = `https://incredible-crisp-7a8a2a.netlify.app/success?user=${JSON.stringify(user)}`
    res.redirect(redirectUrl)
})

gitHub.get("/auth/github/callback", passport.authenticate("github", {failureRedirect: "/home"}), (req, res) => {
    const user = req.user
    const token = jwt.sign(user, process.env.SECRET_KEY)

    const redirectUrl = `https://incredible-crisp-7a8a2a.netlify.app/success?token=${token}`
    res.redirect(redirectUrl)
})

gitHub.get("/success", (req, res) => {
    res.redirect(`https://incredible-crisp-7a8a2a.netlify.app/home`)
})

module.exports = gitHub;

