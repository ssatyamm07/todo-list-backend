const { validateUsername, validatePassword } = require('../middleware/auth');

let users = []; // In-memory store

// Register
const registerUser = (req, res) => {
  const { username, password, retypePassword } = req.body;

  if (!username || !password || !retypePassword) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  if (!validateUsername(username)) {
    return res.status(400).json({ message: 'Invalid username.' });
  }

  if (!validatePassword(password)) {
    return res.status(400).json({ message: 'Invalid password.' });
  }

  if (password !== retypePassword) {
    return res.status(400).json({ message: 'Passwords does not match.' });
  }

  const exists = users.find(u => u.username.toLowerCase() === username.toLowerCase());
  if (exists) {
    return res.status(409).json({ message: 'User already exists.' });
  }

  users.push({ username, password }); // storing password in plain text for now (since no hashing)
  res.status(201).json({ message: 'User registered successfully.' });
};

// Login
const loginUser = (req, res) => {
  const { username, password } = req.body;

  const user = users.find(u => u.username.toLowerCase() === username.toLowerCase() && u.password === password);
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials.' });
  }

  res.json({ message: 'Login successful.' });
};

// Get All Users (hide password)
const getAllUsers = (req, res) => {
  const safeUsers = users.map(u => ({
    username: u.username
  }));
  res.json(safeUsers);
};

// Update user
const updateUser = (req, res) => {
  const { username, newUsername, newPassword } = req.body;

  const user = users.find(u => u.username.toLowerCase() === username.toLowerCase());
  if (!user) return res.status(404).json({ message: 'User not found.' });

  if (newUsername && !validateUsername(newUsername)) {
    return res.status(400).json({ message: 'Invalid new username.' });
  }

  if (newPassword && !validatePassword(newPassword)) {
    return res.status(400).json({ message: 'Invalid new password.' });
  }

  if (newUsername) user.username = newUsername;
  if (newPassword) user.password = newPassword;

  res.json({ message: 'User updated successfully.' });
};

// Delete user
const deleteUser = (req, res) => {
  const { username } = req.body;

  const index = users.findIndex(u => u.username.toLowerCase() === username.toLowerCase());
  if (index === -1) return res.status(404).json({ message: 'User not found.' });

  users.splice(index, 1);
  res.json({ message: 'User deleted successfully.' });
};

module.exports = {
  registerUser,
  loginUser,
  getAllUsers,
  updateUser,
  deleteUser
};
