const model = require("./model");
const {isEmptyArray, isUndefined, verifyInterger, processBodyToObject, verifyStringAndLength} = require("../helper");

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

async function verifyNewObject (req, res, next){
    try{
        const {name, price, description} = req.body
        if(isUndefined(name) || isUndefined(price) || isUndefined(description)){
            res.status(400).json({message:"require name and price"});
        }else if(verifyStringAndLength(name, 3, 30) === false){
            res.status(400).json({message:"name must be string, between 3 to 30 characters long"});
        }else if(verifyStringAndLength(description, 3, 1000) === false){
            res.status(400).json({message:"description must be string beteen3 and 1000 characters long"});
        }else if(verifyInterger(price) === false){
            res.status(400).json({message:"price must be a number"});
        }else{
            req.body.newProduct = {name, price, description};
            next();
        }
    }catch(err){
        next(err);
    }
}

async function verifyModifiedObject (req, res, next){
    try{
        const keys = [
            {name:'name', type:'string'},
            {name:'price', type:'number'}
        ];
        req.body.modifiedObject = processBodyToObject(keys, req.body);
        next();
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

module.exports = {verifyExistingId, verifyNewObject, verifyModifiedObject, isInTable, isIdInTable};