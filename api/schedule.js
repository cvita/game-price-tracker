const MongoClient = require('mongodb').MongoClient;
const databaseUrl = require('../db/database').url;
const querySony = require('./querySony');
const email = require('./email');
const { createOrUpdateGame } = require('./model');


(function () {
    const today = new Date(new Date().toDateString()).getTime();
    console.log('Running schedule.js at ' + new Date().getTime());

    MongoClient.connect(databaseUrl, (err, db) => {
        handleError(err);
        const gamesCollection = db.collection('games');
        const priceAlertsCollection = db.collection('priceAlerts');

        updateGamesInfo(gamesCollection).then(result => {
            console.log(result);
            determineSaleEvents(gamesCollection, priceAlertsCollection);
        });
        removeExpiredPriceAlerts(priceAlertsCollection);
    });

    function updateGamesInfo(gamesCollection) {
        console.log('updateGamesInfo()');
        return new Promise((resolve, reject) => {
            const details = { lastUpdated: { $lt: today } };
            gamesCollection.find(details).toArray((err, games) => {
                handleError(err);
                if (games.length === 0) {
                    resolve('case1');
                } else {
                    var counter = 0;
                    games.forEach((game, i) => {
                        querySony(game.url.slice(game.url.indexOf('cid=') + 4)).then(result => {
                            let finalResult = { game: game._id };
                            createOrUpdateGame(gamesCollection, result).then(result => {
                                finalResult.updated = result !== null;
                                counter++;
                                if (counter === games.length) {
                                    resolve('case2');
                                }
                            });
                        });
                    });
                }
            });
        });
    }

    function determineSaleEvents(gamesCollection, priceAlertsCollection) {
        console.log('determineSalesEvents');
        const alertsDetails = { expiration: { $gt: today } };
        priceAlertsCollection.find(alertsDetails).toArray((err, alerts) => {
            handleError(err);
            if (alerts.length > 0) {
                alerts.forEach(alert => {
                    const gamesDetails = [{ _id: alert.game_id }, { price: 1, url: 1 }];
                    gamesCollection.findOne(...gamesDetails, (err, game) => {
                        handleError(err);
                        if (game.price < alert.price) {
                            alert.url = game.url;
                            email.sendSalePrice(alert);
                        }
                        console.log('All done with schedule.js at ' + new Date().getTime());
                    });
                });
            }
        });
    }

    function removeExpiredPriceAlerts(priceAlertsCollection, gamesCollection) {
        console.log('removeExpiredPriceAlerts()');
        const details = { expiration: { $lte: today } };
        priceAlertsCollection.find(details).toArray((err, alerts) => {
            handleError(err);
            alerts.forEach(alert => {
                email.sendRemovingPriceAlert(alert);
            });
        });
    }

    function handleError(err) {
        if (err) {
            return console.error(new Error(err));
        }
    }
})();
