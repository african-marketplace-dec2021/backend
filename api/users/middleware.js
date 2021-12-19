const model = require("./model");
const {isEmptyArray, isUndefined, verifyInterger, processBodyToObject} = require("../helper");

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
    console.log("array = ", array);
    console.log("isEmptyArray(array) return ", isEmptyArray(array));
    if(isEmptyArray(array)){
        return false;
    }else{
        return true;
    }
}

async function verifyNewObject (req, res, next){
    try{
        //implement verify new object
        next();
    }catch(err){
        next(err);
    }
}

async function verifyModifiedObject (req, res, next){
    try{
        //implement verify new object
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

module.exports = {verifyExistingId, verifyNewObject, verifyModifiedObject};