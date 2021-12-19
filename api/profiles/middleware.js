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

async function verifyNewObject (req, res, next){
    try{
        const {email, first_name, last_name, middle_name, user_id} = req.body;
        if(isUndefined(email) || isUndefined(first_name) || isUndefined(last_name)|| isUndefined(user_id)){
            res.status(400).json({message:"require email, first_name, last_name, e, user_id"});
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

async function verifyUserType(req, res, next){
    try{
        const{user_type} = req.body;
        if(isUndefined(user_type)){
            req.body.newProfile['user_type'] = 'user';
            next();
        }else{
            next();
        }
    }catch(err){
        next(err);
    }
}

async function verifyModifiedObject (req, res, next){
    try{
        //implement verify new object
        const keys = [
            {name:'first_name', type:'string'},
            {name:'last_name', type:'string'},
            {name:'middle_name', type:'string'},
            {name:'email', type:'string'},
            {name:'user_type', type:'string'},
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

module.exports = {verifyExistingId, verifyNewObject, verifyModifiedObject, isInTable, isIdInTable, verifyUserId, verifyUserType};