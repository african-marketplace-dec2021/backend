const db = require("../../database/db-config");

async function getAll(){
    return await db('users');
}

async function add(obj){
    return await db('users').insert({...obj}).returning("*");
}

async function remove(id){
    return await db('users').where("id", id).del();
}

async function modify(id, obj){
    return await db('users').update(obj).where('id', id);
}

module.exports = {getAll, add, remove, modify};