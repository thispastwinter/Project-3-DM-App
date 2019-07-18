const router = require('express').Router();
const characterController = require('../../controllers/characters');

router.route('/')
  .get(characterController.findAll)
  .post(characterController.updateChar)
// .post(characterController.create)
// .delete(characterController.destroy);

module.exports = router;