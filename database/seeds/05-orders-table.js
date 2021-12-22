
exports.seed = function(knex) {
  return knex('orders')
    .then(function () {
      return knex('orders').insert([
        {buyer_user_id:2, seller_user_id:3,},
      ]);
    });
};
