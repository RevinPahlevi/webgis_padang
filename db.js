const { Pool } = require('pg'); // Pastikan library 'pg' di-import di paling atas

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || process.env.POSTGRES_URL,
  ssl: {
    rejectUnauthorized: false // Wajib diaktifkan agar bisa konek ke cloud Neon
  }
});

module.exports = pool; // Export pool agar bisa dipakai di server.js