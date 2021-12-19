const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { isEmptyArray } = require("../helper");
const middlewareUsers = require("../users/middleware");
const modelUsers = require("../users/model");
const {SECRET} = require("../../env");

async function authenticateUsernamePassword ( req, res, next){
    try{
        const {username, password} = req.body;
        const existingUser = await modelUsers.getBy({username});
        if (isEmptyArray(existingUser) || bcrypt.compareSync(password, existingUser[0].password) === false){
            res.status(400).json({message: "invalid username or password"});
        }else{
            req.body.authenticatedUser = existingUser[0];
            next();
        }
    }catch(err){
        next(err);
    }
}

async function buildToken(req, res, next) {
    req.body.authenticatedUser.token = jwt.sign(
        {
            id: req.body.authenticatedUser.id,
            username: req.body.authenticatedUser.username,
        },
        process.env.SECRET || SECRET,
        {
            expiresIn: "1d",
        }
    );
    next();
}

function verifyToken(req) {
    try {
        const { authorization } = req.headers;
        const decodedToken = jwt.verify(authorization, process.env.SECRET || SECRET);
        req.decodedToken = decodedToken;
        return true;
    } catch (err) {
        return false;
    }
}

function authorizedOnly(req, res, next) {
    if (typeof req.headers.authorization === 'undefined') {
      res.status(400).json({ message: 'token required' });
    } else if (!verifyToken(req)) {
      res.status(400).json({ message: 'token invalid' });
    } else {
      next();
    }
  };

module.exports ={authenticateUsernamePassword, buildToken, verifyToken, authorizedOnly};