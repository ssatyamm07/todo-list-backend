import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as User from '../models/user.model.js';

const JWT_SECRET = process.env.JWT_SECRET ;

export const register = async (req, res) => {
  const { username, email, password } = req.body;
  console.log(req.body);
  
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.createUser(username, email, hashedPassword);
    res.status(201).json({ message: 'User created', user });
  } catch (err) {
    console.log('Error creating user:', err);
    res.status(500).json({ error: err.message });
    
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findUserByEmail(email);
    if (!user) return res.status(400).json({ error: 'Invalid email' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid password' });

    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1d' });
    res.json({ message: 'Login successful', token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
