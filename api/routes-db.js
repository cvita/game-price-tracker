const ObjectID = require('mongodb').ObjectID;
const bodyParser = require('body-parser');
const sendEmail = require('./email');

module.exports = function (app, db) {
    app.use(bodyParser.json());

    // Create Mongo document
    app.post('/games', (req, res) => {
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
    });

    // Read Mongo document
    app.get('/games/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        db.collection('games').findOne(details, (err, item) => {
            if (err) {
                res.send({ 'error': 'An error has occurred' });
            } else {
                res.send(item);
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
        const id = req.params.id;
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