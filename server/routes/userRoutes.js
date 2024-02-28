const express = require("express");
const router = express.Router();
const authenticateToken = require('../middleware/authenticateToken'); //protects routes
const {getUserProfile,followUser,unfollowUser, editProfile, getUserData} = require('../controllers/userController');

router.get('/user/:user_id', authenticateToken, getUserProfile)
router.post('/user/follow', authenticateToken, followUser)
router.delete('/user/unfollow/:username', authenticateToken, unfollowUser)
router.put('/user/edit', authenticateToken, editProfile)
router.get('/user/data/:user_id', authenticateToken, getUserData)

module.exports = router;