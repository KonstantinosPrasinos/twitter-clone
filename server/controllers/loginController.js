const db = require('../database/dbconnect');
const loginController = async (req, res) => {
  const { email, password } = req.body;
  try {
    const { user, error } = await db.auth.signIn({ email, password });
    console.log(`Email: ${email}, Password: ${password}`);
    if (error) {
      res.status(401).json({ success: false, message: 'Invalid credentials' });
    } else {
      res.json({ success: true, message: 'Login successful', user });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};
module.exports = loginController;
