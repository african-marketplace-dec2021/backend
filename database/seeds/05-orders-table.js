
exports.seed = function(knex) {
  return knex('orders')
    // .truncate()
    .then(function () {
      return knex('orders').insert([
        {id: 1, buyer_user_id:2, seller_user_id:3,},
      ]);
    });
};
