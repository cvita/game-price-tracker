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
                sendConfirmationEmail(infoSaved);
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


function sendConfirmationEmail(mongoDoc) {
    var message = (
        'Game price tracker is now tracking the price of ' + mongoDoc.game + '. ' +
        'If it drops below ' + mongoDoc.price + ' before ' + mongoDoc.expiration + ', ' +
        'you will be messaged at this email address.'
    );
    sendEmail(
        mongoDoc.userEmail,
        mongoDoc.game + ' is now being tracked',
        message
    );
}