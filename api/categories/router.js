const express = require("express");
const router =  express();
const model = require("./model");
const {verifyExistingId, verifyNewObject, verifyModifiedObject} = require("./middleware");

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

router.post("/", verifyNewObject, async (req, res, next) => {
    try{
        const {name, description} = req.body;
        const result = await model.add({name, description});
        res.status(201).json(result);
    }catch(err){
        next(err);
    }
    
})

router.put("/:id", verifyExistingId, verifyModifiedObject, async (req, res, next)=>{
    try{
        const result = await model.modify(req.params.id, {...req.body.modifiedObject})
        res.status(201).json({result});
    }catch(err){
        next(err);
    }
})

router.delete("/:id", verifyExistingId, async (req, res, next) =>{
    try{
        const result = await model.remove(req.params.id);
        res.status(201).json({result});
    }catch(err){
        next(err);
    }
})

module.exports = router;