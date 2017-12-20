const { findAllGames, findOneGame, createOrUpdateGame } = require('./Model');


module.exports = function (app) {
    app.get('/games/find/all', (req, res) => {
        findAllGames(req.query.max)
            .then(result => res.send({ api: result }));
    });

    app.get('/games/find/one', (req, res) => {
        findOneGame(req.query.id)
            .then(result => res.send({ api: result }));
    });

    app.post('/games/add', (req, res) => {
        createOrUpdateGame(req.body)
            .then(result => res.send({ api: result }));
    });
};