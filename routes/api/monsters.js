const router = require('express').Router();
const monstersController = require('../../controllers/monsters');

router.route('/')
  .get(monstersController.findAll);

module.exports = router; 