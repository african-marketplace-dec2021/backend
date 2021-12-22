exports.up = function(knex, Promise) {
    return knex.schema
        .createTable("orders", table=>{
            table.increments("id").primary();
            table.integer("seller_user_id").notNull();
            table.integer("buyer_user_id").notNull();
            table.string("status"); //pending

            table.foreign("seller_user_id").references("id").inTable("users");
            table.foreign("buyer_user_id").references("id").inTable("users");
        })
};

exports.down = function(knex) { 
    return knex.schema
        .dropTableIfExists("orders");
};
