// import pg from 'pg';
// import dotenv from 'dotenv';

// dotenv.config();  // Load environment variables from .env

// const { Pool } = pg;

// // Neon PostgreSQL connection string from .env
// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL,
//   ssl: {
//     rejectUnauthorized: false, // Neon requires SSL
//   },
// });

// pool.connect()
//   .then(() => console.log('✅ Connected to PostgreSQL via Neon'))
//   .catch((err) => console.error('❌ DB connection error:', err));

// export default pool;
import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();
const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

pool.on('error', (err) => {
  console.error('❌ Unexpected error on idle client:', err);
  process.exit(-1);
});

export default pool;
