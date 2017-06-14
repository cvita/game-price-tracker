const ObjectID = require('mongodb').ObjectID;
const bodyParser = require('body-parser');
const sendEmail = require('./email');

module.exports = function (app, db) {
    app.use(bodyParser.json());

    // Create Mongo document
    // If userEmail is not on blacklist...
    app.post('/games', (req, res) => {

        var emailBlacklist;
        db.collection('blacklist').find().toArray(function (err, docs) {
            if (err) console.err(err);
            emailBlacklist = docs[0].users;
            console.log('----SEE-----');
            console.log('emailBlacklist', emailBlacklist);
            console.log('userEmail', req.body.userEmail);

            if (emailBlacklist.indexOf(req.body.userEmail) === -1) {
                console.log('POST request being sent to DB');
                db.collection('games').insert(req.body, (err, result) => {
                    if (err) {
                        res.send({ 'error': 'An error has occurred' });
                    } else {
                        var infoSaved = result.ops[0];
                        sendConfirmationEmail(infoSaved, req.get('host'));
                        res.send(infoSaved);
                    }
                });
            } else {
                // User is on blacklist. Don't add to DB.
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
                res.send(item);
            }
        });
    });

    // Append userEmail to existing email blacklist
    app.put('/blacklist/:id', (req, res) => {
        const id = '5941b16c734d1d72c8381d22';
        const details = { '_id': new ObjectID(id) };

        db.collection('blacklist').findOne(details, (err, item) => {
            if (err) {
                res.send({ 'error': 'An error has occurred' });
            } else {
                var blacklist = { "users": item.users };
                var newlyBlacklistedUser = req.body.userEmail;
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
};


function sendConfirmationEmail(mongoDoc, uri) {
    const unsubscribeUrl = 'https://' + uri + '/#/unsubscribe?id=' + mongoDoc._id;
    console.log('Unsubscribe', unsubscribeUrl);

    var subject = mongoDoc.game + ' is now being tracked';
    var message = (
        'Game Price Tracker is now tracking the price of <i>' + mongoDoc.game + '</i>. ' +
        'If it drops below ' + mongoDoc.price + ' before ' + mongoDoc.expiration + ', ' +
        'you will be messaged again at this email address.<br><br>' +
        'All done? <a href=' + unsubscribeUrl + '>Unsubscribe</a>'
    );

    sendEmail(
        mongoDoc.userEmail,
        subject,
        message
    );
}