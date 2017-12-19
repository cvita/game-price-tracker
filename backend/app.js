import express from 'express';
import bodyParser from 'body-parser';
import db from './db/database';
import games from './routes/games';
import sony from './routes/sony';


const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/games', games);
app.use('/sony', sony);


module.exports = app;
