exports.up = function(knex, Promise) {
    return knex.schema 
      .createTable("users", table=>{
          table.increments('id').primary();
          table.string("username").notNull().unique();
          table.string("password").notNull();
          table.string("role").notNull();
      })
  };
  
exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists("users");
};
  