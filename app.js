import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import taskRoutes from './routes/task.routes.js';
import userRoutes from './routes/user.routes.js';
import errorHandler from './middleware/error.handler.js';
import db from './models/index.js';

dotenv.config();
const app = express();
app.use(cors({
  origin: ['http://localhost:3000', ''],
  credentials: true
}));

app.use(cookieParser()); 
const PORT = process.env.PORT;


const startServer = async () => {
  try {
    await db.sequelize.authenticate();  
    console.log('✅ Database connected');

app.use(errorHandler); 
app.use(express.json());
app.use('/api/tasks', taskRoutes);
app.use('/api/auth', userRoutes);

  } catch (error) {
    console.error('❌ Unable to connect to the database:', error);
    process.exit(1); 
  }
};

startServer();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
