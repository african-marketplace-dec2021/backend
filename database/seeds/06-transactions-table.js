
exports.seed = function(knex) {
  return knex('transactions')
    // .truncate()
    .then(function () {
      return knex('transactions').insert([
        {id: 1, quantity:1, product_id:1,category_id:1,order_id:1},
        {id: 2, quantity:2, product_id:2,category_id:2,order_id:1},
        {id: 3, quantity:3, product_id:3,category_id:3,order_id:1},
        {id: 4, quantity:4, product_id:4,category_id:4,order_id:1},
        {id: 5, quantity:5, product_id:5,category_id:5,order_id:1},
      ]);
    });
};
