exports.up = function(knex, Promise) {
    return knex.schema
        .createTable("transactions", table=>{
            table.increments("id").primary();
            table.integer("quantity").notNull();
            table.integer("product_id").notNull();
            table.integer("order_id").notNull();
            table.string("status"); //pending
            

            table.foreign("product_id").references("id").inTable("products");
            table.foreign("order_id").references("id").inTable("orders");
        })
};

exports.down = function(knex) { 
    return knex.schema
        .dropTableIfExists("transactions");
};
