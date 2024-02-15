const express = require('express');
const postController = require('../controllers/postController');
const authenticateToken = require('../middleware/authenticateToken'); //protects routes
const router = express.Router();

router.post('/api/posts', authenticateToken, postController.createPost);
router.post('/api/post/like', authenticateToken, postController.likePost);
router.delete('/api/post/unlike/:post_id', authenticateToken, postController.unlikePost);
router.post('/api/post/repost', authenticateToken, postController.repostPost);
router.post('/api/post/unrepost', authenticateToken, postController.unrepostPost);
router.post('/api/post/reply', authenticateToken, postController.replyPost);
router.delete('/api/post/:postId', authenticateToken, postController.deletePost);
router.delete('/api/post/unreply/:reply_id', authenticateToken, postController.unreplyPost);

module.exports = router;