const db = require("../../database/db-config");
//change your table name here
const tableName = "";

async function getAll(){
    return await db(tableName);
}

async function getById(id){
    return await db(tableName).where("id", id);
}

async function getBy(filtered){
    return await db(tableName).where(filtered);
}

async function add(obj){
    return await db(tableName).insert({...obj}).returning("*");
}

async function remove(id){
    return await db(tableName).where("id", id).del();
}

async function modify(id, obj){
    return await db(tableName).update({...obj}).where('id', id);
}

module.exports = {getAll, add, remove, modify, getBy, getById};