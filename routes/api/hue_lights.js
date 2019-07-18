const router = require('express').Router();
const hueLightsController = require('../../controllers/huelights');

router.route('/detect')
  .post(hueLightsController.detect);
router.route('/connect')
  .post(hueLightsController.connect);
router.route('/alllights')
  .post(hueLightsController.allLights);
router.route('/controllights')
  .post(hueLightsController.controlLights);

module.exports = router;