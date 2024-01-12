const express = require('express');
const createFeed = require('../controllers/feedController');
const authenticateToken = require('../middleware/authenticateToken'); //protects routes
const router = express.Router();

router.get('/api/feed', authenticateToken, createFeed);

module.exports = router;