exports.seed = function (knex, Promise) {
  return knex.raw('TRUNCATE TABLE puzzles RESTART IDENTITY CASCADE')
    .then(function () {
      return knex('puzzles').insert([{
        puzzle: "2 + 2",
        answer: '4'
      }
      ]);
    });
};
