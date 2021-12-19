const model = require("./model");
const {isEmptyArray, isUndefined, isNumber} = require("../helper");

async function verifyExistingId (req, res, next){
    try{
        const {id} = req.params;
        if (isUndefined(id) || isNumber(id) === false){
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
        //implement verify new object
        next();
    }catch(err){
        next(err);
    }
}

module.exports = {verifyExistingId, verifyNewObject};