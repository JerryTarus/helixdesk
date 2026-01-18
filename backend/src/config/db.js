// backend/src/config/db.js
const { Pool } = require('pg');
require('dotenv').config();

// Here we create a connection pool using the connection string from your .env
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Test the connection here
pool.connect((err, client, release) => {
  if (err) {
    return console.error('Error acquiring client', err.stack);
  }
  client.query('SELECT NOW()', (err, result) => {
    release();
    if (err) {
      return console.error('Error executing query', err.stack);
    }
    console.log('Connected to Postgres Database: helixdesk_db');
  });
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};