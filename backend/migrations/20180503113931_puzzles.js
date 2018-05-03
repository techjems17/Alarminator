exports.up = function (knex, Promise) {
    return knex.schema.createTable('puzzles', table => {
        table.increments();
        table.string('puzzle');
        table.string('answer');
    })
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists('puzzles')
};
