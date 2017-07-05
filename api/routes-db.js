const bodyParser = require('body-parser');
const encryption = require('./encrypt');
const email = require('./email');
const scrapeSony = require('./scrape');


module.exports = function (app, db) {
    app.use(bodyParser.json());

    app.post('/games/find', function (req, res) {
        findInGamePriceTrackerDb(db, req.body.gameUrl).then(result => {
            if (result !== null) {
                console.log(result);
                res.send(result);
            } else {
                scrapeSony(req.body.gameUrl).then(result => {
                    result = Object.assign(result, req.body, {});
                    res.send(result);
                });
            }
        });
    });

    // If user is not on email blacklist, create/add to price alert
    app.post('/games/create', (req, res) => {
        const gameInfo = req.body;
        const userInfo = req.body.alerts[0];
        checkIfUserIsOnBlacklist(db, userInfo.userEmail).then(result => {
            if (result.userOnBlacklist) {
                res.send({ "priceAlertSubmitted": false });
            } else {
                createOrAppendToExistingPriceAlert(db, gameInfo, userInfo).then(result => {
                    res.send({ "priceAlertSubmitted": result.priceAlertSubmitted });
                    email.sendConfirmationEmail(gameInfo, req.get('host'));
                });
            }
        });
    });

    // Check for all price alerts for userEmail
    app.post('/games/check', (req, res) => {
        const userEmail = encryption.decrypt(req.body.userEmail);
        searchByUserEmailForActivePriceAlerts(db, userEmail).then(result => {
            res.send({ "activePriceAlerts": result.activePriceAlerts });
        });
    });

    // See all games in DB
    app.post('/games/check/all', (req, res) => {
        fetchAllGamesInDb(db).then(result => {
            res.send({ "gamesInDb": result });
        });
    });

    // Delete price alert
    app.delete('/games/delete', (req, res) => {
        const userEmail = encryption.decrypt(req.body.userEmail);
        db.collection('games').findOneAndUpdate(
            { game: req.body.game, alerts: { $elemMatch: { userEmail: userEmail, dateAdded: req.body.dateAdded } } },
            { $pull: { alerts: { userEmail: userEmail } } },
            { returnNewDocument: true }, (err, doc) => {
                if (err) {
                    console.error(err);
                }
                res.send({ "priceAlertRemoved": doc !== null });
            });
    });

    app.post('/blacklist/check', (req, res) => {
        const userEmail = encryption.decrypt(req.body.userEmail);
        checkIfUserIsOnBlacklist(db, userEmail).then(result => {
            res.send({ "userOnBlacklist": result.userOnBlacklist });
        });
    });

    // Add user to blacklist
    app.put('/blacklist/add', (req, res) => {
        const userEmail = encryption.decrypt(req.body.userEmail);
        deleteAllPriceAlertsForUserEmail(db, userEmail);
        db.collection('blacklist').update(
            { _id: "5941b16c734d1d72c8381d22" },
            { $addToSet: { users: userEmail } },
            { upsert: true }, (err, doc) => {
                if (err) {
                    console.error(err);
                }
                res.send({ "userOnBlacklist": doc !== null });
            });
    });
};

// These methods could be model.js
function checkIfUserIsOnBlacklist(db, userEmail) {
    return new Promise((resolve, reject) => {
        db.collection('blacklist').findOne({ users: userEmail }, (err, doc) => {
            if (err) {
                console.error(err);
                reject(err);
            }
            resolve({ "userOnBlacklist": doc !== null });
        });
    });
}

function createOrAppendToExistingPriceAlert(db, gameInfo, userInfo) {
    return new Promise((resolve, reject) => {
        db.collection('games').update(
            {
                game: gameInfo.game,
                gameUrl: gameInfo.gameUrl,
                gameImage: gameInfo.gameImage,
                price: gameInfo.price,
                priceInt: gameInfo.priceInt,
                strikePrice: gameInfo.strikePrice,
                onSale: gameInfo.onSale,
                lastUpdated: gameInfo.lastUpdated
            },
            { $addToSet: { alerts: userInfo } },
            { upsert: true }, (err, doc) => {
                if (err) {
                    console.error(err);
                    reject(err);
                }
                resolve({ "priceAlertSubmitted": doc !== null });
            });
    });
}


function searchByUserEmailForActivePriceAlerts(db, userEmail) {
    return new Promise((resolve, reject) => {
        const dbFilter = { alerts: { $elemMatch: { userEmail: userEmail } } };
        db.collection('games').find(dbFilter).toArray((err, docs) => {
            if (err) {
                console.error(err);
                reject(err);
            }
            var activePriceAlertsForUser = [];
            docs.forEach((doc, docIndex) => {
                activePriceAlertsForUser.push({
                    [doc.game]: {
                        gameImage: doc.gameImage,
                        alerts: []
                    }
                });
                doc.alerts.forEach(priceAlert => {
                    if (priceAlert.userEmail === userEmail) {
                        activePriceAlertsForUser[docIndex][doc.game].alerts.push(priceAlert);
                    }
                });
            });
            resolve({ "activePriceAlerts": activePriceAlertsForUser });
        });
    });
}

function fetchAllGamesInDb(db) {
    return new Promise((resolve, reject) => {
        db.collection('games').find().toArray((err, gamesInDb) => {
            if (err) {
                console.error(err);
                reject(err);
            }
            console.log(gamesInDb);
            resolve(gamesInDb);
        });
    });
}



function deleteAllPriceAlertsForUserEmail(db, userEmail) {
    return new Promise((resolve, reject) => {
        db.collection('games').findOneAndUpdate(
            { alerts: { $elemMatch: { userEmail: userEmail } } },
            { $pull: { alerts: { userEmail: userEmail } } },
            { returnNewDocument: true }, (err, doc) => {
                if (err) {
                    console.error(err);
                    reject(err);
                }
                resolve({ "allPriceAlertsRemoved": doc !== null })
            });
    });
}

function findInGamePriceTrackerDb(db, gameUrl) {
    return new Promise((resolve, reject) => {
        db.collection('games').findOne({ gameUrl: gameUrl }, (err, doc) => {
            if (err) {
                console.error(err);
                reject(err);
            }
            var gameInfo = null;
            if (doc !== null) {
                gameInfo = {
                    priceInt: doc.gamePriceToday,
                    price: '$' + (doc.gamePriceToday - 0.01),
                    title: doc.game,
                    image: doc.gameImage,
                    onSale: { status: doc.onSale },
                    gameUrl: doc.gameUrl
                };
            }
            resolve(gameInfo);
        })
    });
}
