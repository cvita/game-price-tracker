const bodyParser = require('body-parser');
const encryption = require('./encrypt');
const scrapeSony = require('./scrape');
const email = require('./email');
const ObjectID = require('mongodb').ObjectID;


module.exports = function (app, db) {
    app.use(bodyParser.json());
    const games = db.collection('games');
    const priceAlerts = db.collection('priceAlerts');
    const blacklist = db.collection('blacklist');


    // games routes
    app.get('/games/find/all', (req, res) => {
        findAllGames(games).then(result => res.send({ allGames: result }));
    });

    app.get('/games/find/one', (req, res) => {
        const url = req.query.url;
        const today = new Date(new Date().toDateString()).getTime();
        findOneGame(games, url).then(result => {
            if (result && result.lastUpdated === today) {
                res.send(result);
            } else {
                scrapeSony(url).then(result => {
                    createOrUpdateGame(games, result);
                    res.send(result);
                });
            }
        });
    });


    // priceAlerts routes
    app.post('/priceAlerts/add', (req, res) => {
        checkIfUserIsOnBlacklist(blacklist, req.body.userEmail).then(result => {
            if (result) {
                res.send({ priceAlertCreated: false });
            } else {
                createOrUpdatePriceAlert(priceAlerts, req.body).then(result => {
                    res.send({ priceAlertCreated: result });
                    // email.sendConfirmationEmail(priceAlertInfo, req.get('host'));
                });
            }
        });
    });

    app.post('/priceAlerts/find/all', (req, res) => {
        const userEmail = encryption.decrypt(req.body.userEmail);
        validatePriceAlertById(priceAlerts, req.body.id).then(result => {
            if (result) {
                findAllPriceAlertsForUser(priceAlerts, userEmail).then(result => {
                    console.log(result);
                    res.send({ activePriceAlerts: result });
                });
            }
        });
    });

    app.get('/priceAlerts/find/all', (req, res) => {
        const userEmail = req.query.userEmail;
        console.log(userEmail);
        findAllPriceAlertsForUser(priceAlerts, userEmail).then(results => {
            if (results.length > 0) { // avoids spamming
                email.sendManagePriceAlertLink(results, userEmail, req.get('host'));
            }
            res.send(results);
        });
    });

    app.delete('/priceAlerts/delete', (req, res) => {
        const userEmail = encryption.decrypt(req.body.userEmail);
        const details = [
            { game: req.body.game, alerts: { $elemMatch: { userEmail: userEmail, dateAdded: req.body.dateAdded } } },
            { $pull: { alerts: { userEmail: userEmail } } },
            { returnNewDocument: true }
        ];
        games.findOneAndUpdate(...details, (err, doc) => {
            if (err) {
                console.error(err);
            }
            res.send({ priceAlertRemoved: doc !== null });
        });
    });


    // blacklist routes
    app.post('/blacklist/find', (req, res) => {
        const userEmail = encryption.decrypt(req.body.userEmail);
        checkIfUserIsOnBlacklist(blacklist, userEmail).then(result => {
            res.send({ userOnBlacklist: result.userOnBlacklist });
        });
    });

    app.put('/blacklist/add', (req, res) => {
        const userEmail = encryption.decrypt(req.body.userEmail);
        deleteAllPriceAlertsForUserEmail(priceAlerts, userEmail);
        const details = { _id: userEmail, dateAdded: new Date().toDateString() };
        blacklist.insertOne(details, (err, doc) => {
            if (err) {
                console.error(err);
            }
            res.send({ userOnBlacklist: doc !== null });
        });
    });
};

// These methods could be model.js
function findAllGames(collection) {
    return new Promise((resolve, reject) => {
        collection.find().toArray((err, docs) => {
            handleError(err, reject);
            resolve(docs);
        });
    });
}

function findOneGame(collection, url) {
    return new Promise((resolve, reject) => {
        const details = { url: url };
        collection.findOne(details, (err, doc) => {
            handleError(err, reject);
            resolve(doc);
        })
    });
}

function createOrUpdateGame(collection, gameInfo) {
    return new Promise((resolve, reject) => {
        console.log(gameInfo);
        const details = [
            { _id: gameInfo._id },
            gameInfo,
            { upsert: true },
        ];
        collection.update(...details, (err, doc) => {
            handleError(err, reject);
            resolve(doc !== null);
        });
    });
}

function checkIfUserIsOnBlacklist(collection, userEmail) {
    return new Promise((resolve, reject) => {
        const details = { _id: userEmail };
        collection.findOne(details, (err, doc) => {
            handleError(err, reject);
            resolve(doc !== null);
        });
    });
}


function createOrUpdatePriceAlert(collection, priceAlertInfo) {
    return new Promise((resolve, reject) => {
        const details = [
            { game_id: priceAlertInfo.game_id, userEmail: priceAlertInfo.userEmail },
            priceAlertInfo,
            { upsert: true }
        ];
        collection.update(...details, (err, doc) => {
            handleError(err, reject);
            resolve(doc !== null);
        });
    });
}

function deleteAllPriceAlertsForUserEmail(collection, userEmail) {
    return new Promise((resolve, reject) => {
        const details = [
            { alerts: { $elemMatch: { userEmail: userEmail } } },
            { $pull: { alerts: { userEmail: userEmail } } },
            { returnNewDocument: true }
        ];
        collection.findOneAndUpdate(...details, (err, doc) => {
            handleError(err, reject);
            resolve({ "allPriceAlertsRemoved": doc !== null });
        });
    });
}

function findAllPriceAlertsForUser(collection, userEmail) {
    return new Promise((resolve, reject) => {
        const details = { userEmail: userEmail };
        collection.find(details).toArray((err, docs) => {
            handleError(err, reject);
            resolve(docs);
        });
    });
}

function validatePriceAlertById(collection, id) {
    return new Promise((resolve, reject) => {
        const details = { _id: ObjectID(id) };
        collection.findOne(details, (err, doc) => {
            handleError(err, reject);
            resolve(doc);
        });
    });
}

function handleError(err, reject) {
    if (err) {
        console.error(err);
        reject(err);
    }
}
