const express = require('express');
const bodyParser = require('body-parser');
const {
  registerUser,
  loginUser,
  getAllUsers,
  updateUser,
  deleteUser
} = require('./controllers/user.controller');

const app = express();
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('✅ User Validation API is running.');
});

app.post('/register', registerUser);
app.post('/login', loginUser);
app.get('/users', getAllUsers);
app.put('/update', updateUser);
app.delete('/delete', deleteUser);

const PORT = 3000;
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
