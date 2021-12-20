const express = require("express");
const router =  express();
const model = require("./model");
const {verifyExistingId, verifyNewObject, verifyModifiedObject} = require("./middleware");

router.get("/", async (req, res, next) => {
    try{
        res.status(503).json({message:"/api/buyer not ready yet"});
    }catch(err){
        next(err);
    }
})


module.exports = router;