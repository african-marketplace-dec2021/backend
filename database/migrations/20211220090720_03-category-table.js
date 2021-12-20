exports.up = function(knex, Promise) {
    return knex.schema
        .createTable("categories", table=>{
            table.increments("id").primary();
            table.string("name").notNull();
            table.string("description").notNull();
        })
};

exports.down = function(knex) { 
    return knex.schema
        .dropTableIfExists("categories");
};
