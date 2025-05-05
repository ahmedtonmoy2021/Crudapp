import jwt from 'jsonwebtoken';

export const authenticateToken = (req, res, next) => {
  // Get the Authorization header
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    // If Authorization header is missing, return 401
    return res.status(401).json({ message: 'Authorization header missing' });
  }

  // Extract the token from the header
  const token = authHeader.split(' ')[1];

  if (!token) {
    // If there's no token, return 401
    return res.status(401).json({ message: 'Token missing from Authorization header' });
  }

  // Verify the token
  jwt.verify(token, process.env.JWT_SECRET || 'yourSecretKey', (err, user) => {
    if (err) {
      // If token is invalid, return 403
      return res.status(403).json({ message: 'Invalid token' });
    }
    // Attach the user information to the request object
    req.user = user;
    next(); // Proceed to the next middleware
  });
};
