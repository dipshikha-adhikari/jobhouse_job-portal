const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL + "?sslmode=require",
  idleTimeoutMillis: 0
});

pool.connect()
  .then(() => {
    console.log('Connected to the database');
  })
  .catch((err:Error) => {
    console.error('Error connecting to the database:', err.message);
  });

module.exports = pool;
