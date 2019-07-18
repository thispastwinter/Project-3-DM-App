const router = require('express').Router();
const authRoutes = require('./auth');
const usersRoutes = require('./users');
const gamesRoutes = require('./games');
const charactersRoutes = require('./characters');

router.use('/auth', authRoutes);
router.use('/users', usersRoutes);
router.use('/games', gamesRoutes);
router.use('/characters', charactersRoutes);

module.exports = router;
