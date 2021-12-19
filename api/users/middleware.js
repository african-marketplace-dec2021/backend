const model = require("./model");
const {isEmptyArray, isUndefined} = require("../helper");

async function verifyExistingId (req, res, next){
    try{
        const {id} = req.params;
        if (isUndefined(id) || ){
            res.status(400).json({message:"require id"});
        }else {
            const array = await model.getById(id);
            if(isEmptyArray(array)){
                res.status(400).json({message:"require id"});
            }else{
                next();
            }
        }
    }catch(err){
        next(err);
    }
}

async function verifyNewObject (req, res, next){
    try{

    }catch(err){
        next(err);
    }
}

module.exports = {verifyExistingId, verifyNewObject};