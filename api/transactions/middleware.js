const model = require("./model");
const {isEmptyArray, isUndefined, verifyInterger, processBodyToObject} = require("../helper");
const middlewareProducts = require("../products/middleware");
const middlewareOrders = require("../orders/middleware");

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
        const {product_id, order_id, quantity} = req.body;
        if (isUndefined(product_id) || isUndefined(order_id) || isUndefined(quantity)){
            res.status(400).json({message:"require fields : product_id, order_id and quantity"})
        }else if (verifyInterger(product_id) === false){
            res.status(400).json({message:`invalid product_id ${product_id}, product_id must be non negative integer`})
        }else if (verifyInterger(order_id) === false){
            res.status(400).json({message:`invalid order_id ${order_id}, order_id must be non negative integer`})
        }else if (verifyInterger(quantity) === false){
            res.status(400).json({message:`invalid quantity ${quantity}, quantity must be non negative integer`})
        }else{
            next();
        }
    }catch(err){
        next(err);
    }
}

async function verifyProductId(req, res, next){
    const {product_id} = req.body;
    if ( isUndefined(product_id)){
        next();
    }else if (verifyInterger(product_id) === false){
        res.status(400).json({message:`invalid product_id ${product_id}, must be non negative integer`})
    }else{
        const boolean = await middlewareProducts.isIdInTable(product_id);
        if ( boolean === false){
            res.status(404).json({message:`product_id ${product_id} not found`})
        }else{
            next();
        }
    }
}

async function verifyOrderId(req, res, next){
    const {order_id} = req.body;
    if ( isUndefined(order_id)){
        next();
    }else if (verifyInterger(order_id) === false){
        res.status(400).json({message:`invalid order_id ${order_id}, must be non negative integer`})
    }else{
        const boolean = await middlewareOrders.isIdInTable(order_id);
        if ( boolean === false){
            res.status(404).json({message:`order_id ${order_id} not found`})
        }else{
            next();
        }
    }
}

async function verifyPositiveQuantity(req, res, next){
    const {quantity} = req.body;
    if (verifyInterger(quantity) === false){
        res.status(400).json({message:`invalid quantity ${quantity}, must be non negative integer`})
    }else{
        next();
    }
}

async function verifyModifiedObject (req, res, next){
    try{
        const keys = [
            {name:'order_id', type:'number'},
            {name:'product_id', type:'number'},
            {name:'quantity', type:'number'}
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

async function isInTable(filtered){
    const array = await model.getBy(filtered);
    if(isEmptyArray(array)){
        return false;
    }else{
        return true;
    }
}

module.exports = {verifyExistingId, verifyNewObject, verifyModifiedObject, isInTable, isIdInTable, verifyProductId, verifyOrderId, verifyPositiveQuantity};