
const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');

// User Login Authorization Route
router.post('/login', loginController);

module.exports = router;

