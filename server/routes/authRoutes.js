const express = require('express');
const router = express.Router();
const signupController = require('../controllers/signupController');
const {login_post}  = require('../controllers/authController');

router.post('/signup', signupController);
router.post('/api/login', login_post);

module.exports = router;
