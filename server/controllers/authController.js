const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secretKey = 'your-secret-key';

const prisma = new PrismaClient();
async function findUserByCredential(credential) {
  if (credential)
  {
    try {
      const user = await prisma.users.findFirst({
        where: {
          OR: [
            {
              username: credential,
            },
            {
              email: credential,
            },
          ],
        },
      });
      return user;
    } catch (error) {
      console.error('Error finding user by username/email:', error);
      throw new Error('Could not find user with the provided username/email');
    }
  }
  else console.error("credential given is undefined");
}
const maxTokenAge = 2 * 24 * 60 * 60; //2 days
function createToken(user) {
  const payload = {
    userId: user.id,
    username: user.username,
  };
  const options = {
    expiresIn: maxTokenAge, 
  };
  return jwt.sign(payload, secretKey, options);
}

async function login_post(req, res) {
  const { username, password } = req.body;
  try {
    const user = await findUserByCredential(username);
    //await bcrypt.compare(password, user.password_hash)
    if (user && user.password_hash === password) 
    {
      const token = createToken(user);
      res.cookie('jwt', token, { httpOnly: true, maxTokenAge:  maxTokenAge* 1000 });
      res.status(200).json({ message: 'Login successful', user });
    }
    else 
      res.status(401).json({ message: 'Wrong Credentials'});
  } 
  catch (error) 
  {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  } 
  finally 
  {
    await prisma.$disconnect();
  }
}
module.exports = { login_post, findUserByCredential};
