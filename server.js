const express = require('express');
const MongoDB = require('mongodb');
const BodyParser = require('body-parser');
const database = require('./db/database');
const crudApi = require('./api/routes-db');
const app = express();
const MongoClient = MongoDB.MongoClient;

const schedule = require('./api/schedule');
const scrapeSony = require('./api/scrape');

app.set('port', (process.env.PORT || 3001));

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
}

app.use(BodyParser.json());
// Arrow functions caused Promise to reject when deployed to Heroku using Node 7.9.0
// (Doesn't seem to be an issue in other places.)
app.post('/scrape', function (req, res) {
    console.log('POST request to scrape Sony PS store received...');
    scrapeSony(req.body.gameUrl).then(function (result) {
        res.send(result);
    }).catch(function () {
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