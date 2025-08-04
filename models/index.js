import fs from 'fs';
import path from 'path';
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import { fileURLToPath, pathToFileURL } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = {};
const basename = path.basename(__filename);

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // For NeonDB
    },
  },
  logging: false, // Optional: turn off SQL logging
});

// Load all model files except index.js and test files
const files = fs.readdirSync(__dirname).filter(file =>
  file.indexOf('.') !== 0 &&
  file !== basename &&
  file.endsWith('.js') &&
  !file.endsWith('.test.js')
);

// Dynamically import and register models
for (const file of files) {
  try {
    console.log('Loading model file:', file);
    const fullPath = path.join(__dirname, file);
    const moduleURL = pathToFileURL(fullPath).href;
    const { default: modelDefiner } = await import(moduleURL);
    const model = modelDefiner(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  } catch (err) {
    console.error(`❌ Error loading model file ${file}:`, err);
  }
}

// Handle associations if defined
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// Attach sequelize instance and models to db object
db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Named exports for direct use
export const Task = db.Task;
export const User = db.User;

export default db;
