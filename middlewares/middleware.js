// middleware.js
const jwt = require('jsonwebtoken');

// Middleware function to check for a valid token
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization'].split(' ')[1];
  console.log(token);

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  jwt.verify(token, 'secret-key', (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    // Attach the decoded user ID to the request object
    req.userId = decoded.userId;

    const role = decoded.role;
    if (role !== 'provider') {
      return res.status(403).json({ error: 'Access forbidden' });
    }
    next();
  });
};

module.exports = { authenticateToken };