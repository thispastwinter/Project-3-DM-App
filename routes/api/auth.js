const router = require('express').Router();
const passport = require('../../config/passport');
const authController = require('../../controllers/auth');

router.use(passport.authenticate('local'));

// Matches with http://localhost:3001/api/v1/auth/login
// Make sure to use an email and a password for a post request.
router.route('/login')
  .post(authController.login);

module.exports = router;
