const db = require("../../database/db-config");

async function getAll(){
    return await db('users');
}

async function add(obj){
    const sequence = await db('users_id_seq').select("last_value");
    console.log("sequence = ", sequence);
    const last_value = parseInt(sequence[0].last_value);
    // =  [ { last_value: '5', log_cnt: '32', is_called: true } ]
    const result = await db('users').insert({...obj, id:last_value+1});
    return await db('users').where("id", last_value+1);
}

module.exports = {getAll, add};