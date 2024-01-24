const express = require("express");
const router = express.Router();
const authenticateToken = require('../middleware/authenticateToken'); //protects routes
const {getUserProfile,followUser} = require('../controllers/userController');


router.get('/user/:user_id', authenticateToken, getUserProfile)
router.post('/user/follow', authenticateToken, followUser)

module.exports = router;