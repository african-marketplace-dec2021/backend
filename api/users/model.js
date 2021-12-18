const db = require("../../database/db-config");

async function getAll(){
    return await db('users');
}

async function add(obj){
    // //nextval('serial')
    // const sequence = await db('users_id_seq');
    // const last_value = parseInt(sequence[0].last_value)+1;
    // console.log("sequence = ", sequence);
    // console.log("last_value = ", last_value);
    // // =  [ { last_value: '5', log_cnt: '32', is_called: true } ]
    // const result = await db('users').insert({...obj, id:"nextval(`users_id_seq`)"});
    const result = await db('users').insert({...obj});
    return await db('users').where("id", last_value+1);
}

module.exports = {getAll, add};