const ObjectID = require('mongodb').ObjectID;
const bodyParser = require('body-parser');
const email = require('./email');
const encryption = require('./encrypt');


module.exports = function (app, db) {
    app.use(bodyParser.json());

    // Create or add to price alert, if user is not on email blacklist
    app.post('/games', (req, res) => {
        const gameInfo = req.body;
        const userInfo = req.body.alerts[0];
        checkIfUserIsOnBlacklist(db, userInfo.userEmail).then(result => {
            if (result.onBlacklist) {
                res.send({ "priceAlertSubmitted": false });
            } else {
                db.collection('games').update(
                    {
                        game: gameInfo.game,
                        gameUrl: gameInfo.gameUrl,
                        gameImage: gameInfo.gameImage
                    },
                    { $addToSet: { alerts: userInfo } },
                    { upsert: true }
                    , (err, doc) => {
                        if (err) {
                            console.error(err);
                        }
                        res.send({ "priceAlertSubmitted": doc !== null });
                        email.sendConfirmationEmail(req.body, req.get('host'));
                    });
            }
        });
    });

    // checkPriceAlertStatus
    app.post('/games/user/status', (req, res) => {
        var userEmail = encryption.decrypt(req.body.userEmail);
        // check for active price alerts... see all price alerts for this email
        searchByUserEmailForActivePriceAlerts(db, userEmail).then(result => res.send(result));
    });

    // addUserToBlacklist() from Client.js
    app.put('/blacklist/:id', (req, res) => {
        const id = '5941b16c734d1d72c8381d22';
        const details = { '_id': new ObjectID(id) };
        const userEmail = encryption.decrypt(req.body.userEmail);
        db.collection('blacklist').findOne(details, (err, blacklist) => {
            if (err) {
                return console.error(err);
            }
            var updatedBlacklist = { "users": blacklist.users.concat(userEmail) };
            db.collection('blacklist').update(details, updatedBlacklist, (err, result) => {
                if (err) {
                    return console.error(err);
                }
                res.send({ "userOnBlacklist": true });
            });
        });
    });

    // db.collection.findOneAndUpdate() could be useful
    // deletePriceAlert() from Client.js
    app.delete('/games/user/delete', (req, res) => {
        const userEmail = encryption.decrypt(req.body.userEmail);
        const game = req.body.game;
        const dateAdded = req.body.dateAdded;
        var details = {
            game: game,
            alerts: { $elemMatch: { userEmail: userEmail, dateAdded: dateAdded } }
        };
        db.collection('games').findOne(details, (err, doc) => {
            if (err) {
                return console.error(err);
            }
            if (!doc) {
                return res.send({ "priceAlertRemoved": false });
            }
            db.collection('games').update(
                { _id: doc._id },
                { $pull: { alerts: { userEmail: userEmail } } }
            );
            res.send({ "priceAlertRemoved": true });
        });
    });
};


function checkIfUserIsOnBlacklist(db, userEmail) {
    return new Promise((resolve, reject) => {
        db.collection('blacklist').findOne({ users: userEmail }, (err, blacklist) => {
            if (err) {
                console.error(err);
                reject(err);
            }
            resolve({ "onBlacklist": blacklist !== null });
        });
    });
}

function searchByUserEmailForActivePriceAlerts(db, userEmail) {
    return new Promise((resolve, reject) => {
        var details = { alerts: { $elemMatch: { userEmail: userEmail } } };
        db.collection('games').find(details).toArray((err, docs) => {
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
