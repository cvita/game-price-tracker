import express from 'express';
import MongoDB from 'mongodb';
import BodyParser from 'body-parser';
import database from './db/database';
import crudApi from './api/routes';
const app = express();
const MongoClient = MongoDB.MongoClient;

import testSchedule from './api/schedule';

import scrapeSony from './api/scrape';

const localPort = 3001
app.set('port', (process.env.PORT || localPort));
app.listen(localPort);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
}

app.use(BodyParser.json());

app.post('/scrape', (req, res) => {
    scrapeSony(req.body.gameUrl).then(result => {
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
