const express = require('express');

const server = express();
server.use(express.json());

server.get("/", (req, res)=>{
    res.status(200).json({message:"hello world from African Marketplace Dec 2021"});
})

module.exports = server;