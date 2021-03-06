const model = require("./model");
const {isEmptyArray, isUndefined, verifyInterger, processBodyToObject, isString, verifyStringAndLength} = require("../helper");
const middlewareUsers = require("../users/middleware");

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

async function verifyUserId(req, res, next){
    try{
        const {user_id} = req.body;
        const boolean = await middlewareUsers.isIdInTable(user_id);
        if(boolean === false){
            res.status(404).json({message:`user_id ${user_id} not found`})
        }else{
            next();
        }
    }catch(err){
        next(err);
    }

}

async function verifyNewObject (req, res, next){
    try{
        const {email, first_name, last_name, middle_name, user_id} = req.body;
        if(isUndefined(email) || isUndefined(first_name) || isUndefined(last_name)|| isUndefined(user_id)){
            res.status(400).json({message:"require fields : email, first_name, last_name, e, user_id"});
        }else if(verifyStringAndLength(email, 3, 30) === false){
            res.status(400).json({message:`email must be between 3 and 30 characters long`});
        }else if(verifyStringAndLength(first_name, 3, 30) === false){
            res.status(400).json({message:`first_name must be between 3 and 30 characters long`});            
        }else if(verifyStringAndLength(last_name, 3, 30) === false){
            res.status(400).json({message:`last_name must be between 3 and 30 characters long`});
        }else if(isUndefined(middle_name) === false && verifyStringAndLength(middle_name, 3, 30) === false){
            res.status(400).json({message:`middle_name must be between 3 and 30 characters long`});
        }else if(verifyInterger(user_id) === false){
            res.status(400).json({message:`user_id must be integer`});
        }else{
            req.body.newProfile = {email, first_name, last_name, middle_name : middle_name || "", user_id}
            next();
        }
    }catch(err){
        next(err);
    }
}


async function verifyModifiedObject (req, res, next){
    try{
        const keys = [
            {name:'first_name', type:'string'},
            {name:'last_name', type:'string'},
            {name:'middle_name', type:'string'},
            {name:'email', type:'string'},
        ];
        req.body.modifiedObject = processBodyToObject(keys, req.body);
        const {email, first_name, last_name, middle_name} = req.body;
        if(Object.keys(req.body.modifiedObject).length === 0){
            res.status(400).json({message:"no valid column name detected"});
        }else if(!isUndefined(email) && verifyStringAndLength(email, 3, 30) === false){
            res.status(400).json({message:`email must be between 3 and 30 characters long`});
        }else if(!isUndefined(first_name) && verifyStringAndLength(first_name, 3, 30) === false){
            res.status(400).json({message:`first_name must be between 3 and 30 characters long`});            
        }else if(!isUndefined(last_name) && verifyStringAndLength(last_name, 3, 30) === false){
            res.status(400).json({message:`last_name must be between 3 and 30 characters long`});
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

module.exports = {verifyExistingId, verifyNewObject, verifyModifiedObject, isInTable, isIdInTable, verifyUserId};