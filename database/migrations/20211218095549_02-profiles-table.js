exports.up = function(knex, Promise) {
    return knex.schema
      .createTable("profiles", table=>{
          table.increments("id").primary();
          table.string("first_name").notNull();
          table.string("middle_name");
          table.string("last_name").notNull();
          table.string("email").notNull();
          table.string("user_type");
          table.integer("user_id").notNull();
          table.foreign("user_id").references("id").inTable("users"); //pending delete
      })
  };
  
  exports.down = function(knex) {
    return knex.schema
      .dropTableIfExists("profiles");
  };
  