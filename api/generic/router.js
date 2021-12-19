const express = require("express");
const router =  express();
const model = require("./model");
const {verifyExistingId, verifyNewObject} = require("./middleware");

router.get("/", async (req, res, next) => {
    try{
        res.status(503).json({message:`path ${req.path}, GET not ready`});
    }catch(err){
        next(err);
    }
})

router.get("/:id", verifyExistingId, async (req, res, next) => {
    try{
        res.status(503).json({message:`path ${req.path}, GET not ready`});
    }catch(err){
        next(err);
    }
})

router.post("/", verifyNewObject, async (req, res, next) => {
    try{
        //implement your code here
        res.status(503).json({message:`path ${req.path}, POST not ready`});
    }catch(err){
        next(err);
    }
    
})

router.put("/:id", verifyExistingId, verifyNewObject, async (req, res, next)=>{
    try{
        //implement your code here
        res.status(503).json({message:`path ${req.path}, PUT not ready`});
    }catch(err){
        next(err);
    }
})

router.delete("/:id", verifyExistingId, async (req, res, next) =>{
    try{
        //implement your code here
        res.status(503).json({message:`path ${req.path}, DELETE not ready`});
    }catch(err){
        next(err);
    }
})

module.exports = router;