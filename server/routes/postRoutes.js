const express = require('express');
const postController = require('../controllers/postController');
const authenticateToken = require('../middleware/authenticateToken'); //protects routes
const router = express.Router();

router.post('/api/posts', authenticateToken, postController.createPost);
router.post('/api/post/like', authenticateToken, postController.likePost);
router.post('/api/post/unlike', authenticateToken, postController.unlikePost);
router.post('/api/post/repost', authenticateToken, postController.repostPost);
router.post('/api/post/unrepost', authenticateToken, postController.unrepostPost);
router.post('/api/post/reply', authenticateToken, postController.replyPost);
router.delete('/api/post/:postId', authenticateToken, postController.deletePost);

module.exports = router;