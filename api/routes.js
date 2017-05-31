const ObjectID = require('mongodb').ObjectID;
const scrapeSony = require('./scrape');

module.exports = function (app, db) {
    // Create
    app.post('/games', (req, res) => {
        scrapeSony(req.body.gameUrl).then(result => {
            const note = {
                gameUrl: req.body.gameUrl,
                userEmail: req.body.userEmail,
                gameTitle: result.title,
                originalPrice: result.price,
                dateAdded: result.ut
            };

            db.collection('games').insert(note, (err, result) => {
                if (err) {
                    res.send({ 'error': 'An error has occurred' });
                } else {
                    res.send(result.ops[0]);
                }
            });
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
        const note = {
            gameTitle: req.body.gameTitle,
            gameUrl: req.body.gameUrl,
            originalPrice: req.body.originalPrice,
            userEmail: req.body.userEmail
        };
        db.collection('games').update(details, note, (err, result) => {
            if (err) {
                res.send({ 'error': 'An error has occured' });
            } else {
                res.send(note);
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