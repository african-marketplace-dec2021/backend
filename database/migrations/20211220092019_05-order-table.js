exports.up = function(knex, Promise) {
    return knex.schema
        .createTable("orders", table=>{
            table.increments("id").primary();
            table.integer("seller_profile_id").notNull();
            table.integer("buyer_profile_id").notNull();

            // table.foreign("seller_profile_id").references("id").inTable("profiles");
            // table.foreign("buyer_profile_id").references("id").inTable("profiles");
        })
};

exports.down = function(knex) { 
    return knex.schema
        .dropTableIfExists("orders");
};
