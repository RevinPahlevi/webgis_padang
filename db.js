// db.js — Koneksi Pool ke PostgreSQL menggunakan pg + dotenv
require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  user:     process.env.DB_USER,
  host:     process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port:     parseInt(process.env.DB_PORT) || 5432,
});

// Test koneksi saat startup
pool.connect((err, client, release) => {
  if (err) {
    console.error('❌ Gagal konek ke PostgreSQL:', err.message);
  } else {
    console.log('✅ Terhubung ke PostgreSQL database:', process.env.DB_NAME);
    release();
  }
});

module.exports = pool;
