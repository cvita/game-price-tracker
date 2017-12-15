import Router from 'express-promise-router';
import db from '../db/database';


const router = new Router();

// Get all games
router.get('/', async (req, res) => {
  const games = await db.query('select * from games');
  res.status(200).send(games.rows);
});


module.exports = router;