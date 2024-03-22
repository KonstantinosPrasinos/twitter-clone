const express = require('express');
const router = express.Router();
const searchController = require('../controllers/searchController');

const authenticateToken = require('../middleware/authenticateToken'); //protects routes

router.get('/search', authenticateToken,searchController);
module.exports = router;