import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import taskRoutes from './routes/task.routes.js';
import userRoutes from './routes/user.routes.js';

dotenv.config();
const app = express();
app.use(cors());
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use('/api/tasks', taskRoutes);
app.use('/api/auth', userRoutes);
// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Unhandled Error:', err);
    res.status(err.status || 500).json({ error: err.message });
  });

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
