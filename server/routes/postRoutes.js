const express = require('express');
const postController = require('../controllers/postController');
const authenticateToken = require('../middleware/authenticateToken'); //protects routes
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const router = express.Router();

router.post('/api/posts', authenticateToken, (req,res) => postController.createPost(prisma,req,res));
router.post('/api/post/like', authenticateToken, (req,res) => postController.likePost(prisma,req,res));
router.delete('/api/post/unlike/:post_id', authenticateToken, (req,res) => postController.unlikePost(prisma,req,res));
router.post('/api/post/repost', authenticateToken,(req,res) => postController.repostPost(prisma,req,res));
router.delete('/api/post/unrepost/:post_id', authenticateToken, (req,res) => postController.unrepostPost(prisma,req,res));
router.post('/api/post/reply', authenticateToken,(req,res) => postController.replyPost(prisma,req,res));
router.delete('/api/post/:postId', authenticateToken,(req,res) => postController.deletePost(prisma,req,res));
router.delete('/api/post/unreply/:reply_id', authenticateToken,(req,res) => postController.unreplyPost(prisma,req,res));

module.exports = router;