const express = require("express");
const router =  express();
const model = require("./model");
const {verifyExistingId, verifyNewObject: verifyNewTransaction, verifyModifiedObject, verifyProductId, verifyOrderId, verifyPositiveQuantity} = require("./middleware");

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

router.post("/", verifyNewTransaction, verifyProductId, verifyOrderId, async (req, res, next) => {
    try{
        const {product_id, order_id, quantity} = req.body;
        const array = await model.add({product_id, order_id, quantity});
        res.status(201).json(array);
    }catch(err){
        next(err);
    }
    
})

router.put("/:id", verifyExistingId, verifyModifiedObject, verifyProductId, verifyOrderId, verifyPositiveQuantity, async (req, res, next)=>{
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