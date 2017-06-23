const express = require('express');
const app = express();
const MongoDB = require('mongodb');
const MongoClient = MongoDB.MongoClient;
const database = require('./db/database');
const crudApi = require('./api/routes-db');

app.set('port', (process.env.PORT || 3001));

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
}

MongoClient.connect(database.url, function (err, db) {
    if (err) {
        return console.error(err);
    }
    crudApi(app, db);
});

app.listen(app.get('port'), function () {
    console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});
