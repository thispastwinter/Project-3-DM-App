const router = require('express').Router();
const hueLightsController = require('../../controllers/huelights');

router.route('/connect')
  .post(hueLightsController.connect)

module.exports = router;