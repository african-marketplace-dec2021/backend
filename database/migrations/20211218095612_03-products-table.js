exports.up = function(knex, Promise) {
    return knex.schema
        .createTable("products", table=>{
            table.increments("id").primary();
            table.string("name").notNull();
            table.string("description").notNull();
            table.decimal("price").notNull();
        })
};

exports.down = function(knex) { 
    return knex.schema
        .dropTableIfExists("products");
};
