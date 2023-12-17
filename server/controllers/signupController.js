//const db = require('../database/dbconnect');
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const signupController = async (req, res) => {
    const { username, email, password, repeatPassword } = req.body;

    // Validate if passwords match
    if (password !== repeatPassword) {
        return res.status(400).json({ success: false, message: 'Passwords do not match' });
    }

    
    
    try {
      const user = await prisma.users.create({
        data: {
          username,
          email,
          password_hash: password,
          isadmin: false,
          created_at: new Date()

        },
      });
      
      console.log(`Username: ${username}, Email: ${email}, Password: ${password}`);
      return res.json({ success: true, message: 'Sign up successful', user });

    } catch (error) {
      if (error.code === "P2002") {
        res.status(400).json({ success: false, message: 'Username or email already exists' });
      }
      else{
        console.error('Error during signup:',error);
        res.status(500).json({ success: false, message: 'Internal server error' });
      }
    }
  };

  module.exports = signupController;