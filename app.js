import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import taskRoutes from './routes/task.routes.js';
import userRoutes from './routes/user.routes.js';
import errorHandler from './middleware/error.handler.js';
import checkDbConnection  from './config/dbcheck.js';


dotenv.config();
const app = express();
app.use(cors());
const PORT = process.env.PORT;

checkDbConnection();
app.use(errorHandler); 
app.use(express.json());
app.use('/api/tasks', taskRoutes);
app.use('/api/auth', userRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
