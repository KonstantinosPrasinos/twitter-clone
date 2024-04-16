const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const searchController = require('../controllers/searchController');

const authenticateToken = require('../middleware/authenticateToken'); //protects routes

router.get('/search', authenticateToken,(req,res) => searchController(prisma,req,res));
module.exports = router;