const router = require('express').Router();
const gamesController = require('../../controllers/games');

router.route('/')
  .get(gamesController.findAll)
  .post(gamesController.create);

module.exports = router;