const express = require("express");
const router =  express();
const model = require("./model");

router.get("/", async (req, res, next) => {
    const array = await model.getAll();
    res.status(200).json(array);
})

router.post("/", async (req, res, next) => {
    const {username, password} = req.body;
    const result = await model.add({username, password});
    res.status(201).json(result);
})

module.exports = router;