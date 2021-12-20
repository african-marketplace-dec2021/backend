exports.seed = function(knex) {
  return knex('products')
    // .truncate()
    .then(function () {
      return knex('products').insert([
        {name:"color shirt",description:"a very colorful shirt", price:11.99, category_id:1},
        {name:"pencil case",description:"a very strong case", price:11.99,category_id:2},
        {name:"water bottle",description:"a long lasting bottle", price:11.99,category_id:3},
        {name:"container box",description:"a wood box", price:11.99,category_id:4},
        {name:"fish tank",description:"this tank can hold 5 fishes", price:11.99,category_id:5},
      ]);
    });
};
