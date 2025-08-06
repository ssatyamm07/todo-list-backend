import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
const JWT_SECRET = process.env.JWT_SECRET ;

export const authMiddleware = (req, res, next) => {
  const token = req.cookies.token; 
  //console.log('Received token:', req.cookies?.token);

  if (!token) return res.status(401).json({ error: 'No token provided' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid token' });
    req.user = user; 
    next();
  });
};
