const util = require('util');
const bcrypt = require('bcrypt');
const {appConfig} = require('../config/app-config');
const jwt = require('jsonwebtoken');
const compareAsync = util.promisify(bcrypt.compare);
async function findUserByCredential(prisma,credential) {
  if (credential)
  {
    try {
      const user = await prisma.users.findFirst({
        where: {
          OR: [
            {username: { equals: credential },},
            {email:  { equals: credential },},
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
const maxTokenAge = 8 * 60 * 60 * 1000; //8 hours

function createToken(user) {
  const payload = {
    userId: user.user_id,
    username: user.username,
  };
  const options = {
    expiresIn: maxTokenAge / 1000, 
  };
  return jwt.sign(payload, appConfig.secretKey, options);
}

const login_post = async (prisma, req, res) => {
  const { username, password } = req.body;
  try {
    const userFound = await findUserByCredential(prisma,username);
    if (userFound) 
    {
      const isMatch = await compareAsync(password, userFound.password_hash);

      if (isMatch) {
        const token = createToken(userFound);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxTokenAge, path: '/' });
        res.status(200).json({
          message: 'Login successful',
          token,
          user: {
            user_id: userFound.user_id,
            username: userFound.username,
            email: userFound.email,
            isAdmin: userFound.isadmin
          }
        });
      } else {
        res.status(401).json({ message: 'Invalid credentials' });
      }
    }
    else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
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
const logoutController = (req,res) => {
  try {
    const options = {
      expires: new Date(0),
      httpOnly: true,
    };
    // Clear the authentication cookie
    res.cookie('jwt', '', options);
    res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
    console.error('Error during logout:', error);
    res.status(500).json({ error: 'Internal server error during logout' });
  }
};
module.exports = { login_post, findUserByCredential,logoutController};
