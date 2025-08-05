require('dotenv').config();
module.exports = {
  development: {
    url: process.env.DATABASE_URL,
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false, 
      },
    },
    logging: false, 
    pool: {
      max: 5,
      min: 0,
      acquire: 30000, 
      idle: 10000,    
    },
  },
};
