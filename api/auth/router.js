require("dotenv").config();
const express = require("express");
const bcrypt = require("bcrypt");
const router =  express();
const modelUsers = require("../users/model");
const {verifyNewObject: verifyNewUser, verifyUniqueUsername,} = require("../users/middleware");
const {authenticateUsernamePassword, buildToken} = require("./middleware");
const {BCRYPT_ROUND} = require("../../env");

router.post("/register", verifyNewUser, verifyUniqueUsername, async (req, res, next) => {
    try{
        const {username, password} = req.body;
        const hashsedPassword = bcrypt.hashSync(password, process.env.BCRYPT_ROUND || BCRYPT_ROUND);
        const result = await modelUsers.add({username, password: hashsedPassword});
        res.status(201).json(result);
    }catch(err){
        next(err);
    }
})

router.post("/login", verifyNewUser, authenticateUsernamePassword, buildToken, async (req, res, next) => {
    try{
        const {username, token} = req.body.authenticatedUser;
        res.status(200).json({message:`welcome ${username}`, token});
    }catch(err){
        next(err);
    }
})

module.exports = router;