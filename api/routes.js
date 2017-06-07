const ObjectID = require('mongodb').ObjectID;
const bodyParser = require('body-parser');

module.exports = function (app, db) {
    app.use(bodyParser.json());

    // Create
    app.post('/games', (req, res) => {
        console.log('POST request being sent to DB');
        db.collection('games').insert(req.body, (err, result) => {
            if (err) {
                res.send({ 'error': 'An error has occurred' });
            } else {
                res.send(result.ops[0]);
            }
        });
    });

    // Read
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

    // Update
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

    // Delete
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