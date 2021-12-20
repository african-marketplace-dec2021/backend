
exports.seed = function(knex) {
  return knex('orders')
    // .truncate()
    .then(function () {
      return knex('orders').insert([
        {id: 1, buyer_profile_id:2, seller_profile_id:3,},
      ]);
    });
};
