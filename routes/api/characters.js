const router = require('express').Router();
const characterController = require('../../controllers/characters');

// http://localhost:3001/api/v1/characters
router.route('/')
  .post(characterController.create)
  .put(characterController.updateTurnOrder);

// router.route('/monsters/:name')
  // .get(characterController.findMonster);

router.route('/:id')
  .get(characterController.findAll)
  .post(characterController.updateChar)
  .delete(characterController.destroy);


module.exports = router;
