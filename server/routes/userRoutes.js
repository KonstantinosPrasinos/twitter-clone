const express = require("express");
const router = express.Router();
const authenticateToken = require('../middleware/authenticateToken'); //protects routes
const {getUserProfile,followUser,unfollowUser, editProfil} = require('../controllers/userController');

router.get('/user/:user_id', authenticateToken, getUserProfile)
router.post('/user/follow', authenticateToken, followUser)
router.delete('/user/unfollow/:username', authenticateToken, unfollowUser)
router.post('/user/edit', authenticateToken, editProfil)

module.exports = router;