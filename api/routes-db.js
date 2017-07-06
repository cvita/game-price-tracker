const bodyParser = require('body-parser');
const encryption = require('./encrypt');
const scrapeSony = require('./scrape');
const email = require('./email');


module.exports = function (app, db) {
    app.use(bodyParser.json());

    app.post('/games/find', function (req, res) {
        findGameInDb(db, req.body.gameUrl).then(result => {
            if (result && result.lastUpdated === new Date().toDateString()) {
                res.send(result);
            } else {
                scrapeSony(req.body.gameUrl).then(result => {
                    createOrUpdateGame(db, result);
                    res.send(result);
                });
            }
        });
    });

    app.post('/price-alerts/create', (req, res) => {
        const priceAlertInfo = req.body;
        checkIfUserIsOnBlacklist(db, priceAlertInfo.userEmail).then(result => {
            if (!result) {
                res.send({ "priceAlertCreated": false });
            } else {
                createOrUpdatePriceAlert(db, priceAlertInfo).then(result => {
                    res.send({ "priceAlertCreated": result });
                    email.sendConfirmationEmail(priceAlertInfo, req.get('host'));
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

    //  See all games in DB
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
        db.collection('blacklist').insertOne(
            { _id: userEmail, dateAdded: new Date().toDateString() },
            (err, doc) => {
                if (err) {
                    console.error(err);
                }
                res.send({ "userOnBlacklist": doc !== null });
            });
    });
};

// These methods could be model.js
function findGameInDb(db, gameUrl) {
    return new Promise((resolve, reject) => {
        db.collection('games').findOne({ url: gameUrl }, (err, doc) => {
            if (err) {
                console.error(err);
                reject(err);
            }
            resolve(doc);
        })
    });
}

function createOrUpdateGame(db, gameInfo) {
    return new Promise((resolve, reject) => {
        console.log(gameInfo);
        db.collection('games').update(
            { _id: gameInfo._id },
            gameInfo,
            { upsert: true },
            (err, doc) => {
                if (err) {
                    console.error(err);
                    reject(err);
                }
                resolve(doc !== null);
            });
    });
}

function checkIfUserIsOnBlacklist(db, userEmail) {
    return new Promise((resolve, reject) => {
        console.log('CHECKING BLACKLIST FOR:', userEmail);
        db.collection('blacklist').findOne(
            { _id: userEmail },
            (err, doc) => {
                if (err) {
                    console.error(err);
                    reject(err);
                }
                resolve(doc !== null);
            });
    });
}


function createOrUpdatePriceAlert(db, priceAlertInfo) {
    return new Promise((resolve, reject) => {
        db.collection('priceAlerts').update(
            { game_id: priceAlertInfo.game_id, userEmail: priceAlertInfo.userEmail },
            priceAlertInfo,
            { upsert: true }, (err, doc) => {
                if (err) {
                    console.error(err);
                    reject(err);
                }
                resolve(doc !== null);
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
