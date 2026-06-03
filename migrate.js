const fs = require('fs');
const path = require('path');
const pool = require('./db');

async function runMigration() {
  try {
    console.log('Membaca init_db.sql...');
    const sql = fs.readFileSync(path.join(__dirname, 'init_db.sql'), 'utf8');
    
    console.log('Menjalankan query ke database...');
    await pool.query(sql);
    
    console.log('✅ Berhasil! Semua tabel sudah dibuat dan data berhasil di-insert.');
  } catch (error) {
    console.error('❌ Gagal menjalankan migrasi:', error);
  } finally {
    pool.end();
  }
}

runMigration();
