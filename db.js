const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || process.env.POSTGRES_URL,
  ssl: {
    require: true,             // <-- Ini yang diminta oleh Neon
    rejectUnauthorized: false  // <-- Mencegah error sertifikat SSL di Vercel
  }
});

module.exports = pool;