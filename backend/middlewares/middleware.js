// middleware.js
const jwt = require('jsonwebtoken');

// Middleware function to check for a valid token
const authenticateToken = (...userRole) => (req, res, next) => {
  // Check if the 'Authorization' header exists in the request
  const authorizationHeader = req.headers['authorization'];
  if (!authorizationHeader) {
    return res.status(401).json({ error: 'User not logged in' });
  }

  // Split the token from the 'Authorization' header
  const token = authorizationHeader.split(' ')[1];
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
    const requiredRole = userRole.includes(role)
    if (!requiredRole) {
      return res.status(403).json({ error: 'Access forbidden' });
    }
    next();
  });
};

module.exports = { authenticateToken };