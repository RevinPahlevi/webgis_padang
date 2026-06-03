const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const pool = require('./db'); // Koneksi ke database PostgreSQL

const app = express();
app.use(cors());
app.use(express.json());

// Serve static frontend files dari folder /public
app.use(express.static(path.join(__dirname, 'public')));

// ---- ENDPOINT: Data Wisata dari Database (GeoJSON Format) ----
app.get('/api/wisata', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM wisata');
    const wisataData = result.rows;

    // Format menjadi GeoJSON FeatureCollection
    const geojsonData = {
      type: 'FeatureCollection',
      features: wisataData.map(item => ({
        type: 'Feature',
        properties: {
          id: item.id,
          nama: item.nama,
          jenis_wisata: item.jenis_wisata,
          deskripsi: item.deskripsi
        },
        geometry: {
          type: 'Point',
          coordinates: [item.lng, item.lat] // GeoJSON format: [longitude, latitude]
        }
      }))
    };

    console.log(`✅ Berhasil: ${geojsonData.features.length} titik wisata dari DB dikirim.`);
    res.json(geojsonData);
  } catch (error) {
    console.error('❌ Error mengambil data wisata dari DB:', error.message);
    res.status(500).json({ error: 'Gagal mengambil data wisata dari database' });
  }
});

// ============================================================
// FASE 2: FITUR ULASAN & RATING (NOVELTY 3)
// ============================================================

// ---- ENDPOINT: Mengambil Ulasan Berdasarkan Nama Wisata ----
app.get('/api/ulasan/:wisata_nama', async (req, res) => {
  const { wisata_nama } = req.params;
  try {
    const result = await pool.query(
      'SELECT id, nama_pengunjung, rating, komentar, tanggal_kunjungan, created_at FROM ulasan WHERE wisata_nama = $1 ORDER BY created_at DESC',
      [wisata_nama]
    );
    res.json(result.rows);
  } catch (error) {
    console.error('❌ Error mengambil ulasan:', error.message);
    res.status(500).json({ error: 'Gagal mengambil data ulasan' });
  }
});

// ---- ENDPOINT: Menambah Ulasan Baru ----
app.post('/api/ulasan', async (req, res) => {
  const { wisata_nama, nama_pengunjung, rating, komentar, tanggal_kunjungan } = req.body;
  
  if (!wisata_nama || !rating) {
    return res.status(400).json({ error: 'wisata_nama dan rating (1-5) wajib diisi' });
  }

  try {
    const result = await pool.query(
      `INSERT INTO ulasan (wisata_nama, nama_pengunjung, rating, komentar, tanggal_kunjungan) 
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [wisata_nama, nama_pengunjung || 'Anonim', rating, komentar, tanggal_kunjungan]
    );
    res.status(201).json({ message: 'Ulasan berhasil ditambahkan', data: result.rows[0] });
  } catch (error) {
    console.error('❌ Error menyimpan ulasan:', error.message);
    res.status(500).json({ error: 'Gagal menyimpan ulasan. Pastikan nama wisata valid.' });
  }
});

// ============================================================
// FASE 3: FITUR CROWDSOURCING (LAPORAN PENGGUNA) (NOVELTY 2)
// ============================================================

// ---- ENDPOINT: Mengirim Laporan (Crowdsourcing) ----
app.post('/api/laporan', async (req, res) => {
  const { wisata_nama, jenis_laporan, deskripsi, pelapor_nama } = req.body;
  
  if (!wisata_nama || !jenis_laporan || !deskripsi) {
    return res.status(400).json({ error: 'wisata_nama, jenis_laporan, dan deskripsi wajib diisi' });
  }

  try {
    const result = await pool.query(
      `INSERT INTO laporan_data (wisata_nama, jenis_laporan, deskripsi, pelapor_nama, status) 
       VALUES ($1, $2, $3, $4, 'masuk') RETURNING *`,
      [wisata_nama, jenis_laporan, deskripsi, pelapor_nama || 'Anonim']
    );
    res.status(201).json({ message: 'Laporan berhasil dikirim dan akan ditinjau', data: result.rows[0] });
  } catch (error) {
    console.error('❌ Error menyimpan laporan:', error.message);
    res.status(500).json({ error: 'Gagal mengirim laporan. Pastikan data valid.' });
  }
});

// ============================================================
// FASE 4: SISTEM REKOMENDASI & PREFERENSI (NOVELTY 1)
// ============================================================

// ---- ENDPOINT: Menyimpan/Memperbarui Preferensi Pengguna ----
app.post('/api/preferences', async (req, res) => {
  const { session_id, kategori_suka } = req.body;
  
  if (!session_id || !Array.isArray(kategori_suka)) {
    return res.status(400).json({ error: 'session_id dan kategori_suka (array) wajib diisi' });
  }

  try {
    const result = await pool.query(
      `INSERT INTO user_preferences (session_id, kategori_suka) 
       VALUES ($1, $2)
       ON CONFLICT (session_id) 
       DO UPDATE SET kategori_suka = EXCLUDED.kategori_suka, updated_at = NOW()
       RETURNING *`,
      [session_id, kategori_suka]
    );
    res.status(200).json({ message: 'Preferensi disimpan', data: result.rows[0] });
  } catch (error) {
    console.error('❌ Error menyimpan preferensi:', error.message);
    res.status(500).json({ error: 'Gagal menyimpan preferensi' });
  }
});

// ---- ENDPOINT: Mencatat Interaksi Pengguna ----
app.post('/api/interactions', async (req, res) => {
  const { session_id, wisata_nama, tipe } = req.body;
  
  if (!session_id || !wisata_nama || !tipe) {
    return res.status(400).json({ error: 'session_id, wisata_nama, dan tipe interaksi wajib diisi' });
  }

  try {
    const result = await pool.query(
      `INSERT INTO user_interactions (session_id, wisata_nama, tipe) 
       VALUES ($1, $2, $3) RETURNING *`,
      [session_id, wisata_nama, tipe]
    );
    res.status(201).json({ message: 'Interaksi dicatat', data: result.rows[0] });
  } catch (error) {
    console.error('❌ Error mencatat interaksi:', error.message);
    res.status(500).json({ error: 'Gagal mencatat interaksi. Pastikan nama wisata valid.' });
  }
});

// ---- ENDPOINT: Mendapatkan Rekomendasi (Sederhana) ----
app.get('/api/recommendations/:session_id', async (req, res) => {
  const { session_id } = req.params;
  
  try {
    // 1. Ambil preferensi pengguna
    const prefResult = await pool.query('SELECT kategori_suka FROM user_preferences WHERE session_id = $1', [session_id]);
    
    let kategoriDisukai = [];
    if (prefResult.rows.length > 0) {
      kategoriDisukai = prefResult.rows[0].kategori_suka;
    }

    // 2. Query wisata yang sesuai dengan kategori atau wisata yang populer
    // (Jika belum ada preferensi, tampilkan 5 teratas secara acak atau by rating)
    let query = 'SELECT * FROM wisata';
    let params = [];

    if (kategoriDisukai.length > 0) {
      query += ' WHERE jenis_wisata = ANY($1) LIMIT 10';
      params.push(kategoriDisukai);
    } else {
      query += ' LIMIT 5'; // Fallback
    }

    const recResult = await pool.query(query, params);
    
    res.json({
      message: kategoriDisukai.length > 0 ? 'Rekomendasi berdasarkan preferensi' : 'Rekomendasi umum',
      data: recResult.rows
    });
  } catch (error) {
    console.error('❌ Error mengambil rekomendasi:', error.message);
    res.status(500).json({ error: 'Gagal mengambil rekomendasi' });
  }
});

// Fallback ke index.html untuk SPA routing
app.get('/{*splat}', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 WebGIS Padang berjalan di http://localhost:${PORT}`);
  console.log(`🗺️  Frontend: http://localhost:${PORT}`);
  console.log(`📡 API: http://localhost:${PORT}/api/wisata`);
});