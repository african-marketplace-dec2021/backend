const express = require("express");
const router =  express();
const model = require("./model");
const {} = require("./middleware");

router.get("/", async (req, res, next) => {
    try{
        res.status(503).json({message:"/api/seller not ready yet"});
    }catch(err){
        next(err);
    }
})

module.exports = router;