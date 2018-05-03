const database = require("./database_connections");

module.exports = {
    getPuzzles() {
        return database('puzzles');
    },
    read(id) {
        return database('puzzles')
            .where('id', id)
            .first();
    },
}