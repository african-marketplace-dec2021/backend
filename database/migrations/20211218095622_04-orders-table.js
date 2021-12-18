exports.up = function(knex, Promise) {
    return knex.schema
        .createTable("orders", table=>{
            table.increments("id").primary();
            table.integer("order_number").notNull();
            table.integer("quantity").notNull();
            table.string("status").notNull();
            table.integer("product_id").notNull();
            table.integer("user_id").notNull();
            // table.foreign("user_id").references("id").inTable("users");
            // table.foreign("product_id").references("id").inTable("products");
        })
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists("orders");
};
