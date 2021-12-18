const db = require("../../database/db-config");

async function getAll(){
    return await db('users');
}

async function getById(id){
    return await db('users').where("id", id);
}

async function getBy(filtered){
    return await db('users').where(filtered);
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

module.exports = {getAll, add, remove, modify, getBy, getById};