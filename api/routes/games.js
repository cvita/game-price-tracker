const scrapeSony = require('../scrape');
const email = require('../email');
const { findAllGames, findOneGame, createOrUpdateGame } = require('../model');


module.exports = function (app, games) {
    app.get('/games/find/all', (req, res) => {
        findAllGames(games).then(result => res.send({ api: result }));
    });

    app.get('/games/find/one', (req, res) => {
        const url = req.query.url;
        const today = new Date(new Date().toDateString()).getTime();
        findOneGame(games, url).then(result => {
            if (result) {
                res.send({ api: result });
            } else {
                scrapeSony(url).then(result => {
                    createOrUpdateGame(games, result);
                    res.send({ api: result });
                });
            }
        });
    });

    app.get('/games/update', (req, res) => {
        scrapeSony(req.query.url).then(result => {
            createOrUpdateGame(games, result);
            res.send({ api: result });
        });
    });
};
