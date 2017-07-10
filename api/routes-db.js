const bodyParser = require('body-parser');
const encryption = require('./encrypt'); // may not need
const scrapeSony = require('./scrape');
const email = require('./email');
const ObjectID = require('mongodb').ObjectID;


module.exports = function (app, db) {
    const games = db.collection('games');
    const priceAlerts = db.collection('priceAlerts');
    const blacklist = db.collection('blacklist');
    app.use(bodyParser.json());

    // games routes
    app.get('/games/find/all', (req, res) => {
        findAllGames(games).then(result => res.send({ api: result }));
    });

    app.get('/games/find/one', (req, res) => {
        const url = req.query.url;
        const today = new Date(new Date().toDateString()).getTime();
        findOneGame(games, url).then(result => {
            if (result && result.lastUpdated === today) {
                res.send({ api: result });
            } else {
                scrapeSony(url).then(result => {
                    createOrUpdateGame(games, result);
                    res.send({ api: result });
                });
            }
        });
    });

    app.post('/priceAlerts/find/one', (req, res) => {
        var userEmail = req.body.id;
        if (userEmail.indexOf('@') === -1) {
            const manageId = encryption.decrypt(userEmail);
            const priceAlertId = manageId.slice(3, (manageId.indexOf('user:')));
            userEmail = manageId.slice(manageId.indexOf('user:') + 5);

            findOnePriceAlert(priceAlerts, priceAlertId).then(result => {
                if (!result) {
                    res.send({ api: { userInfo: {}, activeGame: null } });
                } else {
                    // query for game info and grab links
                    games.findOne({ _id: result.game_id }, (err, doc) => {
                        res.send({ api: { userInfo: result, activeGame: doc } });
                    });
                }
            });
        }
    });


    // priceAlerts routes
    app.post('/priceAlerts/add', (req, res) => {
        const priceAlertInfo = req.body;
        if (!priceAlertInfo.onBlacklist) {
            createOrUpdatePriceAlert(priceAlerts, priceAlertInfo).then(result => {
                priceAlertInfo._id = result.value ?
                    result.value._id :
                    result.lastErrorObject.upserted;
               // result.value.dateAdded = priceAlertInfo.dateAdded; // Mongo not returning the new/updated doc
               // result.value.expiration = priceAlertInfo.expiration;
                res.send({ api: result });
                email.sendConfirmation(priceAlertInfo, req.get('host'));
            });
        }
    });

    app.delete('/priceAlerts/delete', (req, res) => {
        deletePriceAlert(priceAlerts, req.body).then(result => {
            res.send({ api: result.deletedCount === 1 });
        });
    });


    // blacklist routes
    app.post('/blacklist/find/one', (req, res) => {
        var userEmail = req.body.userEmail;
        if (userEmail.indexOf('@') === -1) {
            const manageId = encryption.decrypt(userEmail);
            const priceAlertId = manageId.slice(0, manageId.indexOf('user:'));
            userEmail = manageId.slice(manageId.indexOf('user:') + 5);
        }
        checkIfUserIsOnBlacklist(blacklist, userEmail).then(result => {
            res.send({ api: { onBlacklist: result, userEmail: userEmail } });
        });
    });


    app.put('/blacklist/add', (req, res) => {
        var userEmail = req.body.userEmail;
        if (userEmail.indexOf('@') === -1) {
            const manageId = encryption.decrypt(userEmail);
            const priceAlertId = manageId.slice(0, manageId.indexOf('user:'));
            userEmail = manageId.slice(manageId.indexOf('user:') + 5);
        }
        addToBlacklist(blacklist, userEmail).then(result => {
            res.send({ api: { onBlacklist: result, userEmail: userEmail } });
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

function findOnePriceAlert(collection, _id) {
    return new Promise((resolve, reject) => {
        const details = { _id: ObjectID(_id) };
        collection.findOne(details, (err, doc) => {
            handleError(err, reject);
            resolve(doc);
        })
    });
}

function createOrUpdateGame(collection, gameInfo) {
    return new Promise((resolve, reject) => {
        const details = [
            { _id: gameInfo._id },
            gameInfo,
            { upsert: true },
        ];
        collection.update(...details, (err, doc) => {
            handleError(err, reject);
            resolve(doc);
        });
    });
}

function createOrUpdatePriceAlert(collection, priceAlertInfo) {
    return new Promise((resolve, reject) => {
        const details = [
            { game_id: priceAlertInfo.game_id, userEmail: priceAlertInfo.userEmail },
            priceAlertInfo,
            {
                upsert: true,
                returnNewDocument: true
            }
        ];
        collection.findOneAndUpdate(...details, (err, response) => {
            handleError(err, reject)
            resolve(response);
        });
    });
}

function deletePriceAlert(collection, userInfo) {
    return new Promise((resolve, reject) => {
        const details = { userEmail: userInfo.userEmail, game_id: userInfo.game_id };
        collection.deleteOne(details, (err, doc) => {
            handleError(err, reject);
            resolve(doc);
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

function addToBlacklist(collection, userEmail) {
    return new Promise((resolve, reject) => {
        const details = {
            _id: userEmail,
            dateAdded: new Date().getTime()
        };
        collection.insertOne(details, (err, doc) => {
            handleError(err, reject);
            resolve(doc !== null);
        });
    });
}


function handleError(err, reject) {
    if (err) {
        console.error(new Error(err));
        reject(err);
    }
}

