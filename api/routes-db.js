const ObjectID = require('mongodb').ObjectID;
const bodyParser = require('body-parser');
const email = require('./email');
const encryption = require('./encrypt');


module.exports = function (app, db) {
    app.use(bodyParser.json());

    // Create Mongo document
    app.post('/games', (req, res) => {
        db.collection('blacklist').find().toArray(function (err, docs) {
            if (err) console.err(err);
            var emailBlacklist = docs[0].users;
            if (emailBlacklist.indexOf(req.body.userEmail) === -1) {
                db.collection('games').insert(req.body, (err, result) => {
                    if (err) {
                        res.send({ 'error': 'An error has occurred' });
                    } else {
                        var mongoDoc = result.ops[0];
                        email.sendConfirmationEmail(mongoDoc, req.get('host'));
                        res.send(mongoDoc);
                    }
                });
            } else {
                res.send({ 'error': 'Cannot make price alert. User is on email blacklist' });
            }
        });
    });

    // Read Mongo document
    app.get('/games/:id', (req, res) => {
        const id = req.query.q;
        const details = { '_id': new ObjectID(id) };
        db.collection('games').findOne(details, (err, item) => {
            if (err) {
                res.send({ 'error': 'An error has occurred' });
            } else {
                if (!item) {
                    res.send({ "priceAlertRemoved": true });
                }
            }
        });
    });

    // Update Mongo document
    app.put('/games/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };

        db.collection('games').update(details, req.body, (err, result) => {
            if (err) {
                res.send({ 'error': 'An error has occured' });
            } else {
                res.send(req.body);
            }
        });
    });

    // Delete Mongo document
    app.delete('/games/:id', (req, res) => {
        const id = req.body.id;
        const details = { '_id': new ObjectID(id) };
        db.collection('games').remove(details, (err, item) => {
            if (err) {
                res.send({ 'error': 'An error has occured' });
            } else {
                res.send('Note ' + id + ' deleted!');
            }
        });
    });

    // Read Mongo document
    app.get('/blacklist/:id', (req, res) => {
        const id = '5941b16c734d1d72c8381d22';
        const details = { '_id': new ObjectID(id) };
        const userEmail = encryption.decrypt(req.query.q);
        db.collection('blacklist').findOne(details, (err, item) => {
            if (err) {
                res.send({ 'error': 'An error has occurred' });
            } else {
                if (item.users.indexOf(userEmail) === -1) {
                    res.send({ "userAddedToBlacklist": false });
                } else {
                    res.send({ "userAddedToBlacklist": true });
                }
            }
        });
    });

    // Add userEmail to email blacklist
    app.put('/blacklist/:id', (req, res) => {
        const id = '5941b16c734d1d72c8381d22';
        const details = { '_id': new ObjectID(id) };
        db.collection('blacklist').findOne(details, (err, item) => {
            if (err) {
                res.send({ 'error': 'An error has occurred' });
            } else {
                var blacklist = { "users": item.users };
                var newlyBlacklistedUser = encryption.decrypt(req.body.userEmail);
                if (blacklist.users.indexOf(newlyBlacklistedUser) === -1) {
                    blacklist.users.push(newlyBlacklistedUser);
                    db.collection('blacklist').update(details, blacklist, (err, result) => {
                        if (err) {
                            res.send({ 'error': 'An error has occured' });
                        } else {
                            res.send(req.body);
                        }
                    });
                } else {
                    res.send({ 'message': newlyBlacklistedUser + ' is already on the blacklist' });
                }
            }
        });
    });
};
