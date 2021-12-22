const {clean} = require("knex-cleaner");

exports.seed = function (knex){
    return clean(knex, {
        mode: 'truncate',
        // restartIdentity: true, //tell PostgreSQL to reset the ID counter
        ignoreTables: ['knex_migrations', 'knex_migrations_lock'],
    })
}
