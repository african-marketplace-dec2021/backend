exports.seed = function(knex) {
  return knex('users')
    // .truncate()
    .then(function () {
      return knex('users').insert([
        // {id: 1, username:"admin", password:"admin", role:"admin"},
        // {id: 2, username:"buyer", password:"buyer", role:"buyer"},
        // {id: 3, username:"seller", password:"seller", role:"seller"},
        // {id: 4, username:"tomtom", password:"$2b$10$13/VWNhhwFQrYXhUvH4A7OKPnYwPBHPF77H2yCrhCjE0kQ910PFF2", role:"admin"},
        {username:"admin", password:"admin", role:"admin"},
        {username:"buyer", password:"buyer", role:"buyer"},
        {username:"seller", password:"seller", role:"seller"},
        {username:"tomtom", password:"$2b$10$13/VWNhhwFQrYXhUvH4A7OKPnYwPBHPF77H2yCrhCjE0kQ910PFF2", role:"admin"},
      ]);
    });
};
