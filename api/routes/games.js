const querySony = require('../querySony');
const email = require('../email');
const { findAllGames, findOneGame, createOrUpdateGame } = require('../model');


module.exports = function (app, games) {
    app.get('/games/find/all', (req, res) => {
        findAllGames(games).then(result => res.send({ api: result }));
    });

    app.get('/games/find/one', (req, res) => {
        findOneGame(games, req.query.url).then(result => {
            res.send({ api: result });
        });
    });

    app.post('/games/add', (req, res) => {
        createOrUpdateGame(games, req.body).then(result => {
            res.send({ api: result });
        });
    });
};
