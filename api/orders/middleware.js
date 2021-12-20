const model = require("./model");
const {isEmptyArray, isUndefined, verifyInterger, processBodyToObject} = require("../helper");
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
        const {buyer_user_id, seller_user_id} = req.body;
        if (isUndefined(buyer_user_id) || isUndefined(seller_user_id)){
            res.status(400).json({message:"require buyer_user_id and seller_user_id"});
        }else if(verifyInterger(buyer_user_id) === false){
            res.status(400).json({message:"invalid buyer_user_id"});
        }else if (verifyInterger(seller_user_id) === false){
            res.status(400).json({message:"invalid seller_user_id"});
        }else if (seller_user_id === buyer_user_id){
            res.status(400).json({message:"seller_user_id cannot equal to buyer_user_id"});
        }else{
            next();
        }
    }catch(err){
        next(err);
    }
}

async function verifyNotEqualBuyerSeller (req, res, next){
    const {buyer_user_id, seller_user_id} = req.body;
    if (seller_user_id === buyer_user_id){
        res.status(400).json({message:"seller_user_id cannot equal to buyer_user_id"});
    }else{
        next();
    }
}

async function verifyBuyerUserId(req, res, next){
    const {buyer_user_id} = req.body;
    if ( isUndefined(buyer_user_id)){
        next();
    }else{
        const boolean = await middlewareUsers.isIdInTable(buyer_user_id);
        if ( boolean === false){
            res.status(404).json({message:`buyer_user_id ${buyer_user_id} not found`})
        }else{
            next();
        }
    }
}

async function verifySellerUserId(req, res, next){
    const {seller_user_id} = req.body;
    if ( isUndefined(seller_user_id)){
        next();
    }else{
        const boolean = await middlewareUsers.isIdInTable(seller_user_id);
        if ( boolean === false){
            res.status(404).json({message:`seller_user_id ${seller_user_id} not found`})
        }else{
            next();
        }
    }
}

async function verifyModifiedObject (req, res, next){
    try{
        const keys = [
            {name:'buyer_user_id', type:'number'},
            {name:'seller_user_id', type:'number'}
        ];
        req.body.modifiedObject = processBodyToObject(keys, req.body);
        if(Object.keys(req.body.modifiedObject).length === 0){
            res.status(400).json({message:"no valid column name detected"});
        }else{
            next();
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

module.exports = {verifyExistingId, verifyNewObject, verifyModifiedObject, isInTable, isIdInTable, verifyBuyerUserId, verifySellerUserId, verifyNotEqualBuyerSeller};