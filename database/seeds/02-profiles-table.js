exports.seed = function(knex) {
  return knex('profiles')
    // .truncate()
    .then(function () {
      return knex('profiles').insert([
        {first_name:"admin", last_name:"admin", middle_name:"", email:"admin@mail.com", user_id:1},
        {first_name:"buyer", last_name:"buyer", middle_name:"", email:"buyer@mail.com", user_id:2},
        {first_name:"seller", last_name:"seller", middle_name:"", email:"seller@mail.com", user_id:3},
        {first_name:"tomtom", last_name:"tomtom", middle_name:"", email:"tomtom@mail.com", user_id:4},
      ]);
    });
};
