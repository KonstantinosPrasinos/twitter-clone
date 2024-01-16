const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const bcrypt = require('bcryptjs');

const signupController = async (req, res) => {
  const { username, email, password} = req.body;
  const saltRounds = 10;
  try{
    bcrypt.genSalt(saltRounds, (err,salt) => {
      bcrypt.hash(password, salt, async (err, hash) => {
        try {
          const user = await prisma.users.create({
            data: {
              username,
              email,
              password_hash: hash,
              isadmin: false,
              created_at: new Date()
            },
          });

          console.log(`Username: ${username}, Email: ${email}, Password: ${hash}`);
          res.json({ success: true, message: 'Sign up successful', user });

        } catch (error) {
          if (error.code === "P2002") {
            res.status(400).json({ success: false, message: 'Username or email already exists' });
          }
          else{
            console.error('Error during signup:',error);
            res.status(500).json({ success: false, message: 'Internal server error' });
          }
        }  
      });
    });
  } catch(error) {
    console.error('Error during password hashing:', error);
    res.status(400).json({ success: false, message: 'Error during password hashing' });
  } finally {
    await prisma.$disconnect();
  }
};

module.exports = signupController;