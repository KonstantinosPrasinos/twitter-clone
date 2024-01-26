const express = require('express');
const createFeed = require('../controllers/feedController');
const authenticateToken = require('../middleware/authenticateToken'); //protects routes
const router = express.Router();

router.get('/api/feed/:user_id', authenticateToken, (req, res) => {
    const authenticatedUserId = req.user.userId;
    const requestedUserId = parseInt(req.params.user_id, 10);
    console.log(authenticatedUserId)
    console.log(parseInt(req.params.user_id, 10))
    if (authenticatedUserId !== requestedUserId) {
      return res.status(403).json({ message: 'Forbidden: Access denied. Invalid user ID.' });
    }
    createFeed(req, res);
  });

module.exports = router;