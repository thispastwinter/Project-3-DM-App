const router = require('express').Router();
const hueLightsController = require('../../controllers/huelights');

router.route('/url')
  .get(hueLightsController.url);
router.route('/connect')
  .post(hueLightsController.connect);
router.route('/alllights')
  .post(hueLightsController.allLights);
router.route('/controllights')
  .post(hueLightsController.controlLights);

module.exports = router;