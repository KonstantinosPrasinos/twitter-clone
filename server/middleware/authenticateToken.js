const jwt = require('jsonwebtoken');
const {appConfig} = require('../config/app-config');

function authenticateToken(req, res, next) {
  const token = req.cookies.jwt; 

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  jwt.verify(token, appConfig.secretKey, (err, decoded) => {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        return res.status(403).json({ message: 'Forbidden: Token has expired' });
      }
      console.error('JWT verification error:', err);
      return res.status(403).json({ message: 'Forbidden: Invalid token' });
    }

    req.user = decoded; 
    next();
  });
}

module.exports = authenticateToken;