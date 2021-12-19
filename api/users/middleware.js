const model = require("./model");
const {isEmptyArray, isUndefined, verifyInterger, processBodyToObject, isEmptyString} = require("../helper");
const { user } = require("pg/lib/defaults");

async function verifyExistingId (req, res, next){
    try{
        const {id} = req.params;
        if (isUndefined(id)){
            res.status(400).json({message:"require id"});
        }else if (verifyInterger(Number(id)) === false){
            res.status(400).json({message:`invalid id ${id}`});
        }else{
            const boolean = await isIdInTable(id);
            if (boolean === false){
                res.status(400).json({message:`id ${id} not found`});
            }else{
                next();
            }
        }
    }catch(err){
        next(err);
    }
}

async function isIdInTable(id){
    const array = await model.getById(id);
    if(isEmptyArray(array)){
        return false;
    }else{
        return true;
    }
}

async function isInTable(filtered){
    const array = await model.getBy(filtered);
    if(isEmptyArray(array)){
        return false;
    }else{
        return true;
    }
}

async function verifyUniqueUsername(req, res, next){
    try{
        const boolean = await isInTable({'username':req.body.username});
        if(boolean){
            res.status(400).json({message:`username ${req.body.username} is not available`});
        }else{
            next();
        }
    }catch(err){
        next(err);
    }
}

async function verifyNewObject (req, res, next){
    try{
        const {username, password} = req.body;
        if (isUndefined(username)  || isUndefined(password)){
            res.status(400).json({message:"require username and password"})
        }else if (isEmptyString(username) ||  isEmptyString(password) || username.length < 5 || password.length < 5 || username.length > 20 || password.length > 20){
            res.status(400).json({message:"username and password msut be between 5 and 20 characters"});
        }else{
            next();
        }
    }catch(err){
        next(err);
    }
}

async function verifyModifiedObject (req, res, next){
    try{
        const keys = [
            {name:'username', type:'string'},
            {name:'password', type:'string'},
        ];
        req.body.modifiedObject = processBodyToObject(keys, req.body);
        next();
    }catch(err){
        next(err);
    }
}

module.exports = {verifyExistingId, verifyNewObject, verifyModifiedObject, verifyUniqueUsername, isInTable, isIdInTable};