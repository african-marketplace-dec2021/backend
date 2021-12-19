const express = require("express");
const router =  express();
const model = require("./model");
const {verifyExistingId} = require("./middleware");

router.get("/", async (req, res, next) => {
    const array = await model.getAll();
    res.status(200).json(array);
})

router.get("/:id", verifyExistingId, async (req, res, next) => {
    const array = await model.getById(req.params.id);
    res.status(200).json(array);
})

router.post("/", async (req, res, next) => {
    try{
        const {username, password} = req.body;
        const result = await model.add({username, password});
        res.status(201).json(result);
    }catch(err){
        res.status(500).json(err);
    }
    
})

router.put("/:id", async (req, res, next)=>{
    try{
        const {id} = req.params;
        const {username, password} = req.body;
        const result = await model.modify(id, {username, password});
        res.status(201).json(result);
    }catch(err){
        res.status(500).json(err);
    }
})

router.delete("/:id", async (req, res, next) =>{
    try{
        const result = await model.remove(req.params.id);
        res.status(201).json(result);
    }catch(err){
        res.status(500).json(err);
    }
})

module.exports = router;