import express from 'express';
import bodyParser from 'body-parser';
import db from './db/database';
import sony from './routes/sony';
const app = express();


// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// If present, validate game id
app.use('/*', (req, res, next) => {
  let game_id = null;
  if (req.body.game_id) {
    game_id = req.body.game_id;
  } else if (req.params.game_id) {
    game_id = req.params.game_id;
  }
  if (game_id && !/UP\d{4}-\w{9}_00-\w{16}/g.test(game_id)) {
    res.status(422).send('Invalid game id');
    return;
  }
  next();
});


// Routes
app.use('/sony', sony);


module.exports = app;
