const router = require('express').Router();
const characterController = require('../../controllers/characters');

// http://localhost:3001/api/v1/characters
router.route('/')
  .get(characterController.findAll)
  .post(characterController.create)
  // .delete(characterController.destroy);
//   .post(characterController.updateChar)

module.exports = router;