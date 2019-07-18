const router = require('express').Router();
const usersController = require('../../controllers/users');

// http://localhost:3001/api/v1/users/
router.route('/')
  .get(usersController.findAll)
  .post(usersController.create);

module.exports = router;