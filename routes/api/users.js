const router = require('express').Router();
const usersController = require('../../controllers/users');

router.route('/')
  .get(usersController.findAll)
  .post(usersController.create);

module.exports = router;