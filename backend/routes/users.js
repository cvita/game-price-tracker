import Router from 'express-promise-router';
import db from '../db/database';
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
    res.status(500).send(e.message);
  }
});


module.exports = router;
