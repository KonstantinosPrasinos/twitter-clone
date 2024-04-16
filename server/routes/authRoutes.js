const express = require('express');
const router = express.Router();
const signupController = require('../controllers/signupController');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const authenticateToken = require('../middleware/authenticateToken'); //protects routes
const {login_post,logoutController}  = require('../controllers/authController');

router.post('/signup', (req,res) => signupController(prisma,req,res));
router.post('/api/login',(req,res) => login_post(prisma,req,res));
router.get('/logout', authenticateToken,logoutController);
module.exports = router;
