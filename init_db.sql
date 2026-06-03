-- ============================================================
-- WebGIS Destinasi Wisata Kota Padang
-- init_db.sql — Inisialisasi Database untuk 3 Novelty
-- ============================================================

-- Aktifkan PostGIS (untuk data spasial)
CREATE EXTENSION IF NOT EXISTS postgis;

-- ============================================================
-- NOVELTY 2 (migrasi): Tabel Destinasi Wisata
-- (Menggantikan wisata_padang.geojson yang statis)
-- ============================================================
CREATE TABLE IF NOT EXISTS wisata (
  id           SERIAL PRIMARY KEY,
  nama         VARCHAR(200) NOT NULL UNIQUE,
  jenis_wisata VARCHAR(100) NOT NULL,
  lng          DOUBLE PRECISION NOT NULL,
  lat          DOUBLE PRECISION NOT NULL,
  deskripsi    TEXT,
  updated_at   TIMESTAMP DEFAULT NOW()
);

-- Insert data dari wisata_padang.geojson
INSERT INTO wisata (nama, jenis_wisata, lng, lat) VALUES
  ('Pantai Padang (Taplau)',                          'Wisata Alam',             100.3503, -0.9380),
  ('Pantai Air Manis',                                'Wisata Alam',             100.3701, -1.0182),
  ('Batu Malin Kundang',                              'Wisata Budaya & Sejarah', 100.3725, -1.0203),
  ('Pantai Nirwana',                                  'Wisata Alam',             100.3992, -1.0451),
  ('Pantai Pasir Jambak',                             'Wisata Alam',             100.3204, -0.8405),
  ('Pantai Carolina',                                 'Wisata Alam',             100.4101, -1.0805),
  ('Pantai Sako',                                     'Wisata Alam',             100.4150, -1.0850),
  ('Pantai Carlos',                                   'Wisata Alam',             100.4120, -1.0820),
  ('Jembatan Siti Nurbaya',                           'Landmark / Buatan',       100.3615, -0.9632),
  ('Gunung Padang (Taman Siti Nurbaya)',              'Wisata Alam & Sejarah',   100.3551, -0.9680),
  ('Bukit Nobita',                                    'Wisata Alam',             100.4105, -0.9501),
  ('Bukit Gado-Gado',                                 'Wisata Alam',             100.3650, -0.9705),
  ('Bukit Lampu',                                     'Wisata Alam',             100.3955, -1.0350),
  ('Sitinjau Lauik',                                  'Wisata Alam',             100.4851, -0.9500),
  ('Kota Tua Padang',                                 'Wisata Budaya & Sejarah', 100.3602, -0.9603),
  ('Museum Adityawarman',                             'Wisata Budaya & Sejarah', 100.3600, -0.9555),
  ('Museum Rumah Kelahiran Bagindo Aziz Chan',        'Wisata Budaya & Sejarah', 100.3705, -0.9401),
  ('Gedung Balai Kota Lama Padang',                   'Wisata Budaya & Sejarah', 100.3582, -0.9570),
  ('Monumen Gempa Padang',                            'Wisata Sejarah',          100.3621, -0.9520),
  ('Monumen Merpati Perdamaian',                      'Landmark / Buatan',       100.3485, -0.9102),
  ('Masjid Raya Syekh Ahmad Khatib Al-Minangkabawi', 'Wisata Religi',           100.3630, -0.9235),
  ('Masjid Al-Hakim Padang',                          'Wisata Religi',           100.3555, -0.9482),
  ('Masjid Raya Gantiang',                            'Wisata Religi',           100.3752, -0.9501),
  ('Klenteng See Hin Kiong',                          'Wisata Religi',           100.3605, -0.9590),
  ('Pulau Pasumpahan',                                'Wisata Alam',             100.4150, -1.1205),
  ('Pulau Sikuai',                                    'Wisata Alam',             100.3551, -1.1250),
  ('Pulau Sirandah',                                  'Wisata Alam',             100.3952, -1.1601),
  ('Pulau Pagang',                                    'Wisata Alam',             100.3805, -1.1450),
  ('Pulau Pamutusan',                                 'Wisata Alam',             100.3901, -1.1352),
  ('Pulau Suwarnadwipa',                              'Wisata Alam',             100.4102, -1.1255),
  ('Pulau Toran',                                     'Wisata Alam',             100.3255, -1.0501),
  ('Pulau Pisang Gadang',                             'Wisata Alam',             100.3550, -0.9950),
  ('Lubuk Paraku',                                    'Wisata Alam',             100.4501, -0.9505),
  ('Pemandian Alam Lubuk Minturun',                   'Wisata Alam',             100.3805, -0.8401),
  ('Air Terjun Sarasah',                              'Wisata Alam',             100.4155, -0.9201),
  ('Air Terjun Lubuk Hitam',                          'Wisata Alam',             100.4350, -1.0855),
  ('Air Terjun Guo',                                  'Wisata Alam',             100.4201, -0.9405),
  ('Air Terjun Timbulun Bungus',                      'Wisata Alam',             100.4250, -1.0901),
  ('Kawasan Wisata Mandeh (Titik masuk via Bungus)',  'Wisata Alam',             100.4100, -1.2150)
ON CONFLICT (nama) DO NOTHING;

-- ============================================================
-- NOVELTY 3: Tabel Ulasan Wisatawan
-- ============================================================
CREATE TABLE IF NOT EXISTS ulasan (
  id                SERIAL PRIMARY KEY,
  wisata_nama       VARCHAR(200) NOT NULL REFERENCES wisata(nama) ON UPDATE CASCADE,
  nama_pengunjung   VARCHAR(100) NOT NULL DEFAULT 'Anonim',
  rating            SMALLINT NOT NULL CHECK (rating BETWEEN 1 AND 5),
  komentar          TEXT,
  tanggal_kunjungan DATE,
  created_at        TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_ulasan_wisata ON ulasan(wisata_nama);
CREATE INDEX IF NOT EXISTS idx_ulasan_rating ON ulasan(wisata_nama, rating);

-- ============================================================
-- NOVELTY 2 (sisa): Tabel Laporan Pengguna
-- ============================================================
CREATE TABLE IF NOT EXISTS laporan_data (
  id            SERIAL PRIMARY KEY,
  wisata_nama   VARCHAR(200) NOT NULL REFERENCES wisata(nama) ON UPDATE CASCADE,
  jenis_laporan VARCHAR(60)  NOT NULL
    CHECK (jenis_laporan IN (
      'Informasi salah',
      'Destinasi tutup/tidak tersedia',
      'Foto tidak sesuai',
      'Tambah informasi',
      'Lainnya'
    )),
  deskripsi     TEXT NOT NULL,
  pelapor_nama  VARCHAR(100) DEFAULT 'Anonim',
  status        VARCHAR(20)  NOT NULL DEFAULT 'masuk'
    CHECK (status IN ('masuk', 'diproses', 'selesai')),
  created_at    TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_laporan_wisata  ON laporan_data(wisata_nama);
CREATE INDEX IF NOT EXISTS idx_laporan_status  ON laporan_data(status);

-- ============================================================
-- NOVELTY 1: Tabel Preferensi & Interaksi Pengguna (Sesi)
-- ============================================================
CREATE TABLE IF NOT EXISTS user_preferences (
  id              SERIAL PRIMARY KEY,
  session_id      VARCHAR(100) NOT NULL UNIQUE,
  kategori_suka   TEXT[]       NOT NULL DEFAULT '{}',
  created_at      TIMESTAMP DEFAULT NOW(),
  updated_at      TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS user_interactions (
  id          SERIAL PRIMARY KEY,
  session_id  VARCHAR(100) NOT NULL,
  wisata_nama VARCHAR(200) NOT NULL REFERENCES wisata(nama) ON UPDATE CASCADE,
  tipe        VARCHAR(30)  NOT NULL
    CHECK (tipe IN ('view_detail', 'klik_rute', 'beri_ulasan')),
  created_at  TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_interaksi_session ON user_interactions(session_id);
CREATE INDEX IF NOT EXISTS idx_interaksi_wisata  ON user_interactions(wisata_nama);

-- ============================================================
-- Verifikasi hasil
-- ============================================================
SELECT
  (SELECT COUNT(*) FROM wisata)             AS total_wisata,
  (SELECT COUNT(*) FROM ulasan)             AS total_ulasan,
  (SELECT COUNT(*) FROM laporan_data)       AS total_laporan,
  (SELECT COUNT(*) FROM user_preferences)   AS total_preferences,
  (SELECT COUNT(*) FROM user_interactions)  AS total_interactions;
