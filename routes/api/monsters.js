const router = require('express').Router();
const monstersController = require('../../controllers/monsters');

router.route('/')
  .post(monstersController.findAll);

module.exports = router; 