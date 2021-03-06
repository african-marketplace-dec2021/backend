require("dotenv").config();
const express = require("express");
const router =  express();
const model = require("./model");
const {verifyExistingId, verifyModifiedObject, verifyNewObject, verifyUniqueUsername} = require("./middleware");
const bcrypt = require("bcrypt");
const { BCRYPT_ROUND } = require("../../env");

router.get("/", async (req, res, next) => {
    try{
        const array = await model.getAll();
        res.status(200).json(array);
    }catch(err){
        next(err);
    }
    
})

router.get("/:id", verifyExistingId, async (req, res, next) => {
    try{
        const array = await model.getById(req.params.id);
        res.status(200).json(array);
    }catch(err){
        next(err);
    }
})

router.post("/", verifyNewObject, verifyUniqueUsername, async (req, res, next) => {
    try{
        const {username, password, role} = req.body;
        const result = await model.add({
            username, 
            password:bcrypt.hashSync(password, Number(process.env.BCRYPT_ROUND)),
            role
        });
        res.status(201).json(result);
    }catch(err){
        res.status(500).json(err);
    }
    
})

router.put("/:id", verifyExistingId, verifyModifiedObject, verifyUniqueUsername, async (req, res, next)=>{
    try{
        const result = await model.modify(req.params.id, {...req.body.modifiedObject});
        res.status(201).json({result});
    }catch(err){
        res.status(500).json(err);
    }
})

router.delete("/:id", verifyExistingId, async (req, res, next) =>{
    try{
        const result = await model.remove(req.params.id);
        res.status(201).json({result});
    }catch(err){
        res.status(500).json(err);
    }
})

module.exports = router;