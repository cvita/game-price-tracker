const ObjectID = require('mongodb').ObjectID;
const bodyParser = require('body-parser');
const email = require('./email');
const encryption = require('./encrypt');


module.exports = function (app, db) {
    app.use(bodyParser.json());

    // createPriceAlert() from Client.js
    app.post('/games', (req, res) => {
        checkBlacklist(db, req.body.userEmail).then(result => {
            if (result.onBlacklist) {
                return res.send({ "priceAlertSubmitted": false });
            }
            db.collection('games').insert(req.body, (err, priceAlert) => {
                if (err) {
                    return console.error(err);
                }
                email.sendConfirmationEmail(priceAlert.ops[0], req.get('host'));
                res.send({ "priceAlertSubmitted": priceAlert.ops[0] !== null });
            });
        });
    });

    // checkIfPriceAlertExists() from Client.js
    app.get('/games/:id', (req, res) => {
        const id = req.query.q;
        const details = { '_id': new ObjectID(id) };
        db.collection('games').findOne(details, (err, priceAlert) => {
            if (err) {
                return console.error(err);
            }
            res.send({ "priceAlertRemoved": priceAlert === null });
        });
    });

    // deletePriceAlert() from Client.js
    app.delete('/games/:id', (req, res) => {
        const id = req.body.id;
        const details = { '_id': new ObjectID(id) };
        db.collection('games').remove(details, (err, priceAlert) => {
            if (err) {
                return console.error(err);
            }
            res.send({ "priceAlertRemoved": true });
        });
    });

    // checkIfUserIsOnBlacklist() from Client.js
    app.get('/blacklist/:id', (req, res) => {
        const userEmail = encryption.decrypt(req.query.q);
        checkBlacklist(db, userEmail).then(result => {
            res.send({ "userOnBlacklist": result.onBlacklist });
        });
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
};


function checkBlacklist(db, userEmail) {
    return new Promise((resolve, reject) => {
        db.collection('blacklist').find().toArray((err, docs) => {
            if (err) {
                console.error(err);
                reject(err);
            }
            resolve({
                'onBlacklist': docs[0].users.indexOf(userEmail) !== -1
            });
        });
    });
}
