import Router from 'express-promise-router';
import db from '../db/database';
import { decrypt } from '../api/encrypt';
import helper from './helper';
const router = new Router();


// Check if user is on blacklist
router.get('/:email', async (req, res) => {
  const { email } = req.params;
  try {
    const blacklistCheck = await db.query(`SELECT on_blacklist FROM users WHERE email = '${email}'`);
    if (blacklistCheck.rows[0] && blacklistCheck.rows[0].on_blacklist) {
      res.status(200).send(true);
      return;
    }
    res.status(200).send(false);
  } catch (e) {
    helper.handleError(e, res);
  }
});

// Get user and price alert info
router.get('/manage/:alert_id/:email', async (req, res) => {
  const alert_id = parseInt(decrypt(req.params.alert_id));
  const email = decrypt(req.params.email);
  const queryText = (
    `SELECT *
      FROM users u
      LEFT JOIN price_alerts a
        ON u.email = a.email AND a.alert_id = '${alert_id}'
      WHERE u.email = '${email}'`
  );
  try {
    const request = await db.query(queryText);
    if (request.rowCount > 0) {
      const data = request.rows[0];
      data.email = email;
      res.status(200).send(data);
    }
  } catch (e) {
    helper.handleError(e, res);
  }
});

// Update user info to be on_blacklist, which automatically deletes all price alerts
router.put('/', async (req, res) => {
  const { email } = req.body;
  try {
    const blacklistUser = await db.query(`UPDATE users SET on_blacklist = 'true' WHERE email = '${email}'`);
    if (blacklistUser.rowCount === 0) {
      res.status(404).send(`Unable to find '${email}' in users, so no action was taken.`);
      return;
    }
    const deletePriceAlerts = await db.query(`DELETE FROM price_alerts WHERE email = '${email}'`);
    res.status(200).send(blacklistUser.rowCount > 0);
  } catch (e) {
    helper.handleError(e, res);
  }
});

// Delete user
router.delete('/:email', async (req, res) => {
  const { email } = req.params;
  try {
    const request = await db.query(`DELETE FROM users WHERE email = '${email}'`);
    res.status(200).send(request.rowCount === 1);
  } catch (e) {
    helper.handleError(e, res);
  }

});


module.exports = router;
