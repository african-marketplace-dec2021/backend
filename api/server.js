const express = require('express');
const server = express();
const routerUsers = require("./users/router");

server.use(express.json());

server.get("/", (req, res)=>{
    res.status(200).json({message:"hello world from African Marketplace Dec 2021"});
})
server.use("/api/users", routerUsers);

server.use((req, res)=>{
    res.status(404).json({message:`invalid path ${req.path}`});
})

module.exports = server;