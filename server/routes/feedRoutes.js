const express = require('express');
const feedController = require('../controllers/feedController');
const authenticateToken = require('../middleware/authenticateToken'); //protects routes
const router = express.Router();

router.post('/api/feed', authenticateToken, feedController);

module.exports = router;