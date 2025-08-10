import { User } from '../models/index.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
    const { username, email, password } = req.body;
  
    try {
      if (!username || !email || !password) {
        return res.status(400).json({ error: 'Username, email, and password are required.' });
      }
      const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        error: 'Password must be at least 8 characters long, contain at least one uppercase letter and one special character.',
      });
    }
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(409).json({ error: 'User with this email already exists.' });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({ username, email, password: hashedPassword });
  
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
      res.cookie('token', token,{
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        maxAge: 24 * 60 * 60 * 1000 // 1 day
      });
      res.json({message: 'Login Successful', user: { id: user.id, username: user.username, email: user.email }, });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  export const logout = (req, res)=>{
    res.clearCookie('token', {
        httpOnly: true,
        secure: true,
        sameSite: 'Strict'
    });
    res.json({ message: 'Logged out successfully' });
  }