exports.seed = function(knex) {
  return knex('categories')
    // .truncate()
    .then(function () {
      return knex('categories').insert([
        {id: 1, name:"category 1", description:"category 1 description"},
        {id: 2, name:"category 2", description:"category 2 description"},
        {id: 3, name:"category 3", description:"category 3 description"},
        {id: 4, name:"category 4", description:"category 4 description"},
        {id: 5, name:"category 5", description:"category 5 description"},
      ]);
    });
};
