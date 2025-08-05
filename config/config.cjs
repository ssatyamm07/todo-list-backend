require('dotenv').config();
module.exports = {
  development: {
    url: process.env.DATABASE_URL,
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false, // Required for NeonDB
      },
    },
    logging: false, 
    pool: {
      max: 5,
      min: 0,
      acquire: 30000, // Time Sequelize will try to get a connection before throwing error
      idle: 10000,    // Time a connection can be idle before being released
    },
  },
};
