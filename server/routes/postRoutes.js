const express = require('express');
const createPost = require('../controllers/postController');
const authenticateToken = require('../middleware/authenticateToken'); //protects routes
const router = express.Router();

router.post('/api/posts', authenticateToken, createPost);

module.exports = router;