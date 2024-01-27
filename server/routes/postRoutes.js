const express = require('express');
const {createPost,likePost,unlikePost,repostPost,unrepostPost,replyPost,commentPost} = require('../controllers/postController');
const authenticateToken = require('../middleware/authenticateToken'); //protects routes
const router = express.Router();

router.post('/api/posts', authenticateToken, createPost);
router.post('/api/post/like', authenticateToken, likePost);
router.post('/api/post/unlike', authenticateToken, unlikePost);
router.post('/api/post/repost', authenticateToken, repostPost);
router.post('/api/post/unrepost', authenticateToken, unrepostPost);
router.post('/api/post/reply', authenticateToken, replyPost);
router.post('/api/post/:post_id/replies', authenticateToken, commentPost);


module.exports = router;