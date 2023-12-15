const db = require('../database/dbconnect');

const signupController = async (req, res) => {
    const { username, email, password, repeatPassword } = req.body;

    // Validate if passwords match
    if (password !== repeatPassword) {
        return res.status(400).json({ success: false, message: 'Passwords do not match' });
    }

    try {
      const { user, error } = await db.auth.signUp(
        {
            username,
            email,
            password
        }
      );
      
      console.log(`Username: ${username}, Email: ${email}, Password: ${password}`);

      if (error) {
        return res.status(500).json({ success: false, message: 'Failed to sign up', error });
      } 
      else {
        return res.json({ success: true, message: 'Sign up successful', user });
      }

    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  };

  module.exports = signupController;