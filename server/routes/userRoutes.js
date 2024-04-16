const express = require("express");
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const authenticateToken = require('../middleware/authenticateToken'); //protects routes
const {getUserProfile,followUser,unfollowUser,checkFollowRelationship} = require('../controllers/userController');

router.get('/user/:user_id', authenticateToken, (req,res) => getUserProfile(prisma,req,res))
router.get('/user/checkFollowRelationship/:user_id', authenticateToken,(req,res) => checkFollowRelationship(prisma,req,res))
router.post('/user/follow', authenticateToken, (req,res) => followUser(prisma,req,res))
router.delete('/user/unfollow/:username', authenticateToken,(req,res) => unfollowUser(prisma,req,res))

module.exports = router;