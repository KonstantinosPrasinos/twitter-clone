const express = require('express');
const {createPost,likePost,unlikePost,repostPost} = require('../controllers/postController');
const authenticateToken = require('../middleware/authenticateToken'); //protects routes
const router = express.Router();

router.post('/api/posts', authenticateToken, createPost);
router.post('/api/post/like', authenticateToken, likePost);
router.post('/api/post/unlike', authenticateToken, unlikePost);
router.post('/api/post/repost', authenticateToken, repostPost);


module.exports = router;