exports.seed = function(knex) {
  return knex('categories')
    // .truncate()
    // .del()
    .then(function () {
      return knex('categories').insert([
        {name:"category 1", description:"category 1 description"},
        {name:"category 2", description:"category 2 description"},
        {name:"category 3", description:"category 3 description"},
        {name:"category 4", description:"category 4 description"},
        {name:"category 5", description:"category 5 description"},
      ]);
    });
};
