const express = require("express");
const router = express.Router();
const authenticateToken = require('../middleware/authenticateToken'); //protects routes
const {getUserProfile,followUser,unfollowUser,checkFollowRelationship} = require('../controllers/userController');

router.get('/user/:user_id', authenticateToken, getUserProfile)
router.get('/user/checkFollowRelationship/:user_id', authenticateToken, checkFollowRelationship)
router.post('/user/follow', authenticateToken, followUser)
router.delete('/user/unfollow/:username', authenticateToken, unfollowUser)

module.exports = router;