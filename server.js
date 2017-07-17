const express = require('express');
const app = express();
const bodyParserJSON = require('body-parser').json;

const MongoClient = require('mongodb').MongoClient;
const databaseUrl = require('./db/database').url;

const gamesRoutes = require('./api/routes/games');
const priceAlertsRoutes = require('./api/routes/priceAlerts');
const blacklistRoutes = require('./api/routes/blacklist');


MongoClient.connect(databaseUrl, function (err, db) {
    if (err) {
        return console.error(new Error(err));
    }
    const games = db.collection('games');
    const priceAlerts = db.collection('priceAlerts');
    const blacklist = db.collection('blacklist');
    app.use(bodyParserJSON());

    gamesRoutes(app, games);
    priceAlertsRoutes(app, priceAlerts, games);
    blacklistRoutes(app, blacklist);
});


app.set('port', (process.env.PORT || 3001));

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
}

app.listen(app.get('port'), function () {
    console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});
