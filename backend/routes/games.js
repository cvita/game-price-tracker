import Router from 'express-promise-router';
import db from '../db/database';
const router = new Router();


// Get all games
router.get('/', async (req, res) => {
  try {
    const games = await db.query('SELECT * FROM games');
    res.status(200).send(games.rows);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Get game
router.get('/:id', async (req, res) => {
  const id = decodeURIComponent(req.params.id);
  try {
    const game = await db.query(`SELECT * FROM games WHERE id = '${id}'`);
    res.status(200).send(game.rows[0]);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Delete game
router.delete('/:id', async (req, res) => {
  const id = decodeURIComponent(req.params.id);
  try {
    const game = await db.query(`DELETE FROM games WHERE id = '${id}'`);
    res.status(200).send(game);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Add/update game
router.post('/', async (req, res) => {
  const { price, strike_price, on_sale, discount, ps_plus_price } = req.body;
  const keys = [];
  const values = [];
  for (const key in req.body) {
    keys.push(key);
    values.push(`'${req.body[key]}'`);
  }
  // Alternative below, but has to iterate through object twice...
  // const keys = Object.keys(req.body);
  // const test = keys.map(key => (`'${req.body[key]}'`));
  const queryText = (
    `INSERT INTO games (${keys.join(', ')})
      VALUES(${values.join(', ')})
      ON CONFLICT (id)
      DO UPDATE SET
        price = ${price},
        strike_price = ${strike_price},
        on_sale = ${on_sale},
        discount = ${discount},
        ps_plus_price = ${ps_plus_price},
        updated = now()
      RETURNING *`
  );
  try {
    const game = await db.query(queryText);
    res.status(200).send(game);
  } catch (err) {
    res.status(500).send(err);
  }
});


module.exports = router;
