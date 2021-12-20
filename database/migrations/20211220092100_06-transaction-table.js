exports.up = function(knex, Promise) {
    return knex.schema
        .createTable("transactions", table=>{
            table.increments("id").primary();
            table.integer("quantity").notNull();

            table.integer("product_id").notNull();
            table.integer("category_id").notNull();
            table.integer("order_id").notNull();

            // table.foreign("product_id").references("id").inTable("products");
            // table.foreign("category_id").references("id").inTable("categories");
            // table.foreign("order_id").references("id").inTable("orders");
        })
};

exports.down = function(knex) { 
    return knex.schema
        .dropTableIfExists("transactions");
};
