
exports.seed = function(knex) {
  return knex('transactions')
    .then(function () {
      return knex('transactions').insert([
        {quantity:1, product_id:1, order_id:1},
        {quantity:2, product_id:2, order_id:1},
        {quantity:3, product_id:3, order_id:1},
        {quantity:4, product_id:4, order_id:1},
        {quantity:5, product_id:5, order_id:1},
      ]);
    });
};
