require("dotenv").config();
const express = require("express");
const bcrypt = require("bcrypt");
const router =  express();
const modelUsers = require("../users/model");
const {verifyUsernamePassword, verifyUniqueUsername,verifyNewObject:verifyNewUser} = require("../users/middleware");
const {authenticateUsernamePassword, buildToken} = require("./middleware");
const {BCRYPT_ROUND} = require("../../env");

router.post("/register", verifyNewUser, verifyUniqueUsername, async (req, res, next) => {
    try{
        const {username, password, role} = req.body;
        // ???????????? why process.env.BCRYPT_ROUND not working on heroku ???????????????????????????
        // const hashsedPassword = bcrypt.hashSync(password, process.env.BCRYPT_ROUND || BCRYPT_ROUND);
        // ???????????? why process.env.BCRYPT_ROUND not working on heroku ???????????????????????????
        const hashsedPassword = bcrypt.hashSync(password, BCRYPT_ROUND);
        const result = await modelUsers.add({username, password: hashsedPassword, role});
        res.status(201).json(result);
    }catch(err){
        next(err);
    }
})

router.post("/login", verifyUsernamePassword, authenticateUsernamePassword, buildToken, async (req, res, next) => {
    try{
        const {username, token, id, role} = req.body.authenticatedUser;
        res.status(200).json({message:`welcome ${username}`, user_id:id, role,token});
    }catch(err){
        next(err);
    }
})

module.exports = router;