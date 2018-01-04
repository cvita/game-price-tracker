import Router from 'express-promise-router';
import db from '../db/database';
import nodemail from '../api/email';
const router = new Router();


// Middleware - Check on_blacklist status of email.
// If user attempts to bypass front end, will be caught here.
router.post('/', async (req, res, next) => {
  const { email } = req.body;
  try {
    const blacklistCheck = await db.query(`SELECT on_blacklist FROM users WHERE email = '${email}'`);
    if (blacklistCheck.rows[0] && blacklistCheck.rows[0].on_blacklist) {
      res.status(403).send('User is on blacklist. Unable to create new price alert.');
      return;
    }
    next();
  } catch (e) {
    res.status(500).send(e.message);
  }
});


// Add/update price alert. Creates user if it doesn't already exist
router.post('/', async (req, res) => {
  const { gameId, email, price } = req.body;
  const createPriceAlertQueryText = (
    `INSERT INTO price_alerts (game_id, email, price, created)
      VALUES('${gameId}', '${email}', '${price}', now())
      ON CONFLICT (game_id, email)
      DO UPDATE SET
        price = ${price},
        created = now()
      RETURNING alert_id, expires`
  );
  const createUserQueryText = (
    `INSERT INTO users
      VALUES('${email}', 'false')
      ON CONFLICT
      DO NOTHING`
  );
  try {
    const createPriceAlert = promiseWrapper(db.query(createPriceAlertQueryText));
    const createUser = promiseWrapper(db.query(createUserQueryText));
    const results = await Promise.all([createPriceAlert, createUser]);
    const priceAlertSaved = results[0].rowCount === 1;
    res.status(200).send(priceAlertSaved);
    if (priceAlertSaved) {
      nodemail.sendConfirmation(Object.assign(results[0].rows[0], req.body));
    }
  } catch (e) {
    console.error(e);
    res.status(500).send(e.message);
  }
});

// Delete price alert
router.delete('/:game_id/:email', async (req, res) => {
  const { game_id, email } = req.params;
  const queryText = `DELETE FROM price_alerts WHERE email = '${email}' AND game_id = '${game_id}'`;
  try {
    const result = await db.query(queryText);
    const priceAlertDeleted = result.rowCount === 1;
    res.status(200).send(priceAlertDeleted);
  } catch (e) {
    console.error(e);
    res.status(500).send(e.message);
  }
});

// Helper functions.
const promiseWrapper = myFunc => (
  new Promise((resolve, reject) => myFunc
    .then(res => resolve(res)))
    .catch(e => reject(e))
);


module.exports = router;
