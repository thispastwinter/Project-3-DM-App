const router = require('express').Router();
const apiRoutes = require('./api');
const hueLights = require('./api/huelights')

// API Routes
router.use('/api/v1', apiRoutes);

module.exports = router;
