
const express = require('express');
const router = express.Router();
const signupController = require('../controllers/signupController');

router.post('/signup', signupController);

module.exports = router;
