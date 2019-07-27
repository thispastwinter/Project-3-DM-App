const router = require('express').Router();
const monstersController = require('../../controllers/monsters');


router.route('/list')
  .get(monstersController.list);

router.route('/:name')
  .get(monstersController.findAllWhere);

router.route('/')
  .get(monstersController.findAll);

module.exports = router;
