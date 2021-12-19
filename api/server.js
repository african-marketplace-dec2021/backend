const express = require('express');
const server = express();
const helmet = require("helmet");
const cors = require("cors");
const routerUsers = require("./users/router");
const routerProfiles = require("./profiles/router");
const routerProducts = require("./products/router");
const routerAuth = require("./auth/router");
const {errorHandler} = require("./errorHandler");
const {authorizedOnly} = require("./auth/middleware");

server.use(express.json());
server.use(helmet());
server.use(cors());

server.get("/", (req, res)=>{
    res.status(200).json({message:"hello world from African Marketplace Dec 2021"});
})
server.use("/api/users", authorizedOnly, routerUsers);
server.use("/api/profiles", authorizedOnly, routerProfiles);
server.use("/api/products", routerProducts);
server.use("/api/auth", routerAuth);

server.use('*', (req, res)=>{
    res.status(404).json({message:`invalid path ${req.path}`});
})

server.use(errorHandler);

module.exports = server;