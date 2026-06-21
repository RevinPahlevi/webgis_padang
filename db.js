const { Pool } = require('pg');

// Ambil URL dari Environment Variable Vercel
let dbUrl = process.env.DATABASE_URL || process.env.POSTGRES_URL;

// Jurus Pamungkas: Paksa tambahkan parameter sslmode=require ke dalam URL jika belum ada
if (dbUrl && !dbUrl.includes('sslmode=require')) {
  // Jika URL sudah punya tanda tanya (?), tambahkan pakai '&', kalau belum pakai '?'
  dbUrl += (dbUrl.includes('?') ? '&' : '?') + 'sslmode=require';
}

const pool = new Pool({
  connectionString: dbUrl,
  ssl: {
    rejectUnauthorized: false // Tetap biarkan ini untuk melewati validasi sertifikat lokal
  }
});

module.exports = pool;