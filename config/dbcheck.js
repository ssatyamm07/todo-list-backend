import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const checkDbConnection = async () => {
  try {
    const sequelize = new Sequelize(process.env.DATABASE_URL, {
      dialect: 'postgres',
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      },
    });
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
    await sequelize.close();
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

export default checkDbConnection;