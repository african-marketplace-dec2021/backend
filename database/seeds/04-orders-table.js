exports.seed = function(knex) {
  return knex('orders')
    .truncate()
    .then(function () {
      return knex('orders').insert([
        {id: 1, order_number:1, product_id:1, quantity:5, status:"pending",user_id:1},
        {id: 2, order_number:1, product_id:2, quantity:5, status:"pending",user_id:2},
        {id: 3, order_number:2, product_id:3, quantity:5, status:"pending",user_id:3},
        {id: 4, order_number:2, product_id:4, quantity:5, status:"pending",user_id:4},
        {id: 5, order_number:3, product_id:5, quantity:5, status:"pending",user_id:5},
      ]);
    });
};
