const express = require('express');
const server = express();
const helmet = require("helmet");
const cors = require("cors");
const routerUsers = require("./users/router");
const {errorHandler} = require("./errorHandler");

server.use(express.json());
server.use(helmet());
server.use(cors());

server.get("/", (req, res)=>{
    res.status(200).json({message:"hello world from African Marketplace Dec 2021"});
})
server.use("/api/users", routerUsers);

server.use('*', (req, res)=>{
    res.status(404).json({message:`invalid path ${req.path}`});
})

server.use(errorHandler);

module.exports = server;