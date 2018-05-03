const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const queries = require('./queries');

app.use(bodyParser.json());
app.use(cors());

app.get('/puzzles', (req, res) => {
    queries.getPuzzles().then(puzzle => {
        res.json(puzzle);
    }).catch(console.error);
})

app.use((request, response) => {
    response.sendStatus(404);
});

module.exports = app;