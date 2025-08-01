import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as User from '../models/user.model.js';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

// Register a new user
export const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const existingUser = await User.findUserByEmail(email);
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.createUser(username, email, hashedPassword);

    res.status(201).json({ message: 'User created successfully.', user });
  } catch (err) {
    console.error('Error creating user:', err);
    res.status(500).json({ error: err.message });
  }
};

// Login user
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

// Get all users (excluding passwords)
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.getAllUsers();
    const safeUsers = users.map(({ id, username, email }) => ({ id, username, email }));
    res.json(safeUsers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update user
export const updateUser = async (req, res) => {
  const { email, newUsername, newPassword } = req.body;

  try {
    const user = await User.findUserByEmail(email);
    if (!user) return res.status(404).json({ message: 'User not found.' });

    const updatedFields = {};

    if (newUsername) updatedFields.username = newUsername;
    if (newPassword) updatedFields.password = await bcrypt.hash(newPassword, 10);

    await User.updateUser(user.id, updatedFields);
    res.json({ message: 'User updated successfully.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete user
exp
