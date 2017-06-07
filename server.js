const express = require('express');
const MongoDB = require('mongodb');
const BodyParser = require('body-parser');
const database = require('./db/database');
const crudApi = require('./api/routes');
const app = express();
const MongoClient = MongoDB.MongoClient;

const testSchedule = require('./api/schedule');

const scrapeSony = require('./api/scrape');

const localPort = 3001
app.set('port', (process.env.PORT || localPort));


if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
}

app.use(BodyParser.json());

app.post('/scrape', (req, res) => {
    scrapeSony(req.body.gameUrl).then(result => {
        res.send(result);
    }).catch(() => {
        console.log('Unable to obtain results from Sony');
        res.send(result);
    });
});


app.use(BodyParser.urlencoded({ extended: true }));

MongoClient.connect(database.url, (err, db) => {
    if (err) {
        return console.error(err);
    }
    crudApi(app, db);
    console.log('Ready... ' + new Date().getMinutes());
});

app.listen(app.get('port'), () => {
    console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});
