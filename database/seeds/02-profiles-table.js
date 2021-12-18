exports.seed = function(knex) {
  return knex('profiles')
    .truncate()
    .then(function () {
      return knex('profiles').insert([
        {id: 1, first_name:"tom", last_name:"tom", middle_name:"", email:"tomtom@mail.com", user_type:"admin",user_id:1},
        {id: 2, first_name:"hank", last_name:"jimmy", middle_name:"charlie", email:"hankjimy@mail.com", user_type:"user",user_id:2},
        {id: 3, first_name:"mason", last_name:"john", middle_name:"", email:"masonjohn@mail.com", user_type:"user",user_id:3},
        {id: 4, first_name:"noob", last_name:"player", middle_name:"", email:"noobplayer@mail.com", user_type:"user",user_id:4},
        {id: 5, first_name:"kite", last_name:"air", middle_name:"", email:"kiteair@mail.com", user_type:"user",user_id:5},
      ]);
    });
};
