import { User } from '../models/index.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
    const { username, email, password } = req.body;
  
    try {
      // Basic input validation
      if (!username || !email || !password) {
        return res.status(400).json({ error: 'Username, email, and password are required.' });
      }
  
      // Check if email already exists
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(409).json({ error: 'User with this email already exists.' });
      }
  
      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create new user
      const user = await User.create({ username, email, password: hashedPassword });
  
      // Optional: exclude password in response
      const userResponse = {
        id: user.id,
        username: user.username,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      };
  
      res.status(201).json({ message: 'User created successfully', user: userResponse });
  
    } catch (error) {
        console.error('Error during registration:', error);
      
        if (error.name === 'SequelizeValidationError') {
          return res.status(400).json({
            error: 'Validation error',
            details: error.errors.map(e => e.message)
          });
        }
      
        res.status(500).json({ error: 'An error occurred while creating the user', detail: error.message });
      }
  };
  
export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ where: { email } });
      if (!user) return res.status(404).json({ error: 'User not found' });
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });
  
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });
      res.json({ message: 'Login successful', token });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };