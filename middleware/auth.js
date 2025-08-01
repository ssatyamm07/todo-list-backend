import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

// Username must be at least 8 characters long, alphanumeric
export const validateUsername = (username) => {
  const usernameRegex = /^[a-zA-Z0-9]{8,}$/;
  return usernameRegex.test(username);
};

// Password must be at least 8 characters, contain 1 uppercase, 1 digit, 1 special character
export const validatePassword = (password) => {
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
  return passwordRegex.test(password);
};

// Middleware to check JWT token
export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>

  if (!token) return res.status(401).json({ error: 'No token provided' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid token' });
    req.user = user; // Attach decoded user info to request
    next();
  });
};
