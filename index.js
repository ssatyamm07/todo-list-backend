import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import db from './models/index.js';
import authRoutes from './routes/auth.routes.js'; // ✅ Added

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes); // ✅ Added

db.sequelize.sync()
  .then(() => console.log('✅ Database synced successfully'))
  .catch(err => console.error('❌ Sequelize sync error:', err));

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
