const router = require('express').Router();
const authRoutes = require('./auth');
const usersRoutes = require('./users');
const hueLights = require ('./hue_lights');

router.use('/auth', authRoutes);
router.use('/users', usersRoutes);
router.use('/huelights', hueLights);

module.exports = router;
