exports.up = function(knex, Promise) {
    return knex.schema
        .createTable("products", table=>{
            table.increments("id").primary();
            table.string("name").notNull();
            table.string("description").notNull();
            table.decimal("price").notNull();
            table.integer("category_id").notNull();
            
            table.foreign("category_id").references("id").inTable("categories");
        })
};

exports.down = function(knex) { 
    return knex.schema
        .dropTableIfExists("products");
};
