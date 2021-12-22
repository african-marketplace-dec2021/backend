const { del } = require("express/lib/application");

exports.seed = function(knex) {
  return knex('users')
    // .truncate()
    // .del()
    .then(function () {
      return knex('users').insert([
        {username:"admin", password:"admin", role:"admin"},
        {username:"buyer", password:"buyer", role:"buyer"},
        {username:"seller", password:"seller", role:"seller"},
        {username:"tomtom", password:"$2b$10$13/VWNhhwFQrYXhUvH4A7OKPnYwPBHPF77H2yCrhCjE0kQ910PFF2", role:"admin"},
      ]);
    });
};
