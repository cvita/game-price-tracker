import sonyStore from '../support/querySony';
import Router from 'express-promise-router';
const router = new Router();


// Get game from Sony Store
router.get('/:id', async (req, res) => {
  const id = decodeURIComponent(req.params.id);
  try {
    const game = await sonyStore.fetchGame(id);
    res.status(200).send(game);
  } catch (err) {
    if (err.statusCode && err.message) {
      res.status(err.statusCode).send(err.message);
    } else {
      res.status(500).send(err);
    }
  }
});


module.exports = router;
