const model = require("./model");
const {isEmptyArray, isUndefined, verifyInterger, processBodyToObject} = require("../helper");
const middlewareProfile = require("../profiles/middleware");

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
        const {buyer_profile_id, seller_profile_id} = req.body;
        if (isUndefined(buyer_profile_id) || isUndefined(seller_profile_id)){
            res.status(400).json({message:"require buyer_profile_id and seller_profile_id"});
        }else if(verifyInterger(buyer_profile_id) === false){
            res.status(400).json({message:"invalid buyer_profile_id"});
        }else if (verifyInterger(seller_profile_id) === false){
            res.status(400).json({message:"invalid seller_profile_id"});
        }else if (seller_profile_id === buyer_profile_id){
            res.status(400).json({message:"seller_profile_id cannot equal to buyer_profile_id"});
        }else{
            next();
        }
    }catch(err){
        next(err);
    }
}

async function verifyBuyerProfileId(req, res, next){
    const {buyer_profile_id} = req.body;
    if ( isUndefined(buyer_profile_id)){
        next();
    }else{
        const boolean = await middlewareProfile.isIdInTable(buyer_profile_id);
        if ( boolean === false){
            res.status(404).json({message:`buyer_profile_id ${buyer_profile_id} not found`})
        }else{
            next();
        }
    }
}

async function verifySellerProfileId(req, res, next){
    const {seller_profile_id} = req.body;
    if ( isUndefined(seller_profile_id)){
        next();
    }else{
        const boolean = await middlewareProfile.isIdInTable(seller_profile_id);
        if ( boolean === false){
            res.status(404).json({message:`seller_profile_id ${seller_profile_id} not found`})
        }else{
            next();
        }
    }
}

async function verifyModifiedObject (req, res, next){
    try{
        const keys = [
            {name:'buyer_profile_id', type:'number'},
            {name:'seller_profile_id', type:'number'}
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

module.exports = {verifyExistingId, verifyNewObject, verifyModifiedObject, isInTable, isIdInTable, verifyBuyerProfileId, verifySellerProfileId};