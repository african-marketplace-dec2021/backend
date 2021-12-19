const model = require("./model");
const {isEmptyArray, isUndefined, verifyInterger} = require("../helper");

async function verifyExistingId (req, res, next){
    try{
        const {id} = req.params;
        if (isUndefined(id)){
            res.status(400).json({message:"require id"});
        }else if (verifyInterger(Number(id)) === false){
            res.status(400).json({message:`invalid id ${id}`});
        }else {
            const array = await model.getById(id);
            if(isEmptyArray(array)){
                res.status(400).json({message:`id ${id} not found`});
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