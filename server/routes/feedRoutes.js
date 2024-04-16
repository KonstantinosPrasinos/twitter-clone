const express = require('express');
const createFeed = require('../controllers/feedController');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const authenticateToken = require('../middleware/authenticateToken'); //protects routes
const router = express.Router();

router.get('/api/feed/:user_id', authenticateToken,(req,res) => createFeed(prisma,req,res));

module.exports = router;