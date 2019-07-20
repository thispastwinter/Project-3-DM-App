const router = require('express').Router();
const authRoutes = require('./auth');
const usersRoutes = require('./users');
const gamesRoutes = require('./games');
const charactersRoutes = require('./characters');
const hueLights = require('./hue_lights');

router.use('/auth', authRoutes);
router.use('/users', usersRoutes);
router.use('/games', gamesRoutes);
router.use('/characters', charactersRoutes);
router.use('/huelights', hueLights);

module.exports = router;
