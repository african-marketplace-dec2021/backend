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
        const {name, description} = req.body;
        if (isUndefined(name) || isUndefined(description)){
            res.status(400).json({message:"require fields : name and description"});
        }else if(verifyStringAndLength(name, 3, 30) === false){
            res.status(400).json({message:"name must be between 3 and 30 in length"});
        }else if(verifyStringAndLength(description, 3, 300) === false){
            res.status(400).json({message:"name must be between 3 and 300 in length"});
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
            {name:'name', type:'string'},
            {name:'description', type:'string'}
        ];
        req.body.modifiedObject = processBodyToObject(keys, req.body);
        const {name, description} = req.body;
        if(Object.keys(req.body.modifiedObject).length === 0){
            res.status(400).json({message:"no valid column name detected"});
        }else if(!isUndefined(name) && verifyStringAndLength(name, 3, 30) === false){
            res.status(400).json({message:"name must be between 3 and 30 in length"});
        }else if(!isUndefined(description) && verifyStringAndLength(description, 3, 300) === false){
            res.status(400).json({message:"description must be between 3 and 300 in length"});
        }else{
            next();
        }
    }catch(err){
        next(err);
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