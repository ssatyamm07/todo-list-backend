import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import taskRoutes from './routes/task.routes.js';
import authRoutes from './routes/auth.routes.js'; 
import errorHandler from './middleware/error.handler.js';
import checkDbConnection from './config/dbcheck.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

checkDbConnection();
app.use(cors());
app.use(express.json());
app.use('/api/tasks', taskRoutes);
app.use('/api/auth', authRoutes); 

app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
