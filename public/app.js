// ============================================================
// WebGIS Destinasi Wisata Kota Padang
// app.js - Location, Routing & Nearby Facilities
// ============================================================

const API_URL = 'http://localhost:3000/api/wisata';

// ---- Category Config ----
const CATEGORY_CONFIG = {
  'Wisata Alam':             { color:'#2e8b6e', icon:'🌿', bg:'rgba(46,139,110,0.12)',  border:'#2e8b6e' },
  'Wisata Budaya & Sejarah': { color:'#c07a20', icon:'🏛️', bg:'rgba(192,122,32,0.12)', border:'#c07a20' },
  'Wisata Religi':           { color:'#7c6bbf', icon:'🕌', bg:'rgba(124,107,191,0.12)',  border:'#7c6bbf' },
  'Landmark / Buatan':       { color:'#FF5722', icon:'🗽', bg:'rgba(255,87,34,0.12)',   border:'#FF5722' },
  'Wisata Sejarah':          { color:'#c0426b', icon:'📜', bg:'rgba(192,66,107,0.12)',  border:'#c0426b' },
  'Wisata Alam & Sejarah':   { color:'#1e8fa8', icon:'⛰️', bg:'rgba(30,143,168,0.12)',   border:'#1e8fa8' },
};
const DEFAULT_CAT = { color:'#76ABAE', icon:'📍', bg:'rgba(118,171,174,0.12)', border:'#76ABAE' };

// ---- Destination Photos Map ----
const DESTINATION_PHOTOS = {
  // === WISATA ALAM ===
  'Pantai Padang (Taplau)':              ['ASPAS/Wisata Alam/taplau.JPG'],
  'Pantai Air Manis':                    ['ASPAS/Wisata Alam/air manis.JPG'],
  'Pantai Nirwana':                      ['ASPAS/Wisata Alam/nirwana.JPG'],
  'Pantai Pasir Jambak':                 ['ASPAS/Wisata Alam/pasir jambak.JPG'],
  'Pantai Carolina':                     ['ASPAS/Wisata Alam/carolina.JPG'],
  'Pantai Sako':                         ['ASPAS/Wisata Alam/sako.JPG'],
  'Pantai Carlos':                       ['ASPAS/Wisata Alam/carlos.JPG'],
  'Bukit Nobita':                        ['ASPAS/Wisata Alam/nobita.JPG'],
  'Bukit Gado-Gado':                     ['ASPAS/Wisata Alam/gado.JPG'],
  'Bukit Lampu':                         ['ASPAS/Wisata Alam/lampu.WEBP'],
  'Sitinjau Lauik':                      ['ASPAS/Wisata Alam/sitinjau.JPG'],
  'Pulau Pasumpahan':                    ['ASPAS/Wisata Alam/pasumpahan.JPG'],
  'Pulau Sikuai':                        ['ASPAS/Wisata Alam/sikuai.JPG'],
  'Pulau Sirandah':                      ['ASPAS/Wisata Alam/sirandah.JPG'],
  'Pulau Pagang':                        ['ASPAS/Wisata Alam/pagang.JPG'],
  'Pulau Pamutusan':                     ['ASPAS/Wisata Alam/pamutusan.JPG'],
  'Pulau Suwarnadwipa':                  ['ASPAS/Wisata Alam/suwarnadwipa.JPG'],
  'Pulau Toran':                         ['ASPAS/Wisata Alam/toran.JPG'],
  'Pulau Pisang Gadang':                 ['ASPAS/Wisata Alam/pisang gadang.JPG'],
  'Lubuk Paraku':                        ['ASPAS/Wisata Alam/lubuk paraku.JPG'],
  'Pemandian Alam Lubuk Minturun':       ['ASPAS/Wisata Alam/pemandian lumin.JPG'],
  'Air Terjun Sarasah':                  ['ASPAS/Wisata Alam/sarasah.JPG'],
  'Air Terjun Lubuk Hitam':              ['ASPAS/Wisata Alam/lubuk hitam.JPG'],
  'Air Terjun Guo':                      ['ASPAS/Wisata Alam/guo.JPG'],
  'Air Terjun Timbulun Bungus':          ['ASPAS/Wisata Alam/timbulun bungus.JPG'],
  'Kawasan Wisata Mandeh (Titik masuk via Bungus)': ['ASPAS/Wisata Alam/mandeh.JPG'],

  // === WISATA BUDAYA & SEJARAH ===
  'Batu Malin Kundang': [
    'ASPAS/budaya dan sejarah/Malinkundang1.jpg',
    'ASPAS/budaya dan sejarah/Malinkundang2.jpg',
    'ASPAS/budaya dan sejarah/Malinkundang3.jpg',
    'ASPAS/budaya dan sejarah/Malinkundang4.jpg',
  ],
  'Kota Tua Padang': [
    'ASPAS/budaya dan sejarah/Kota_Tua_Padang_A03.jpg',
    'ASPAS/budaya dan sejarah/Kota_Tua_Padang_A13.jpg',
    'ASPAS/budaya dan sejarah/Kota_Tua_Padang_N05.jpg',
    'ASPAS/budaya dan sejarah/Kota_Tua_Padang_N11.jpg',
  ],
  'Museum Adityawarman': [
    'ASPAS/budaya dan sejarah/museum-adityawarman.jpg',
    'ASPAS/budaya dan sejarah/museum-adityawarman2.jpg',
    'ASPAS/budaya dan sejarah/museum-adityawarman3.jpg',
    'ASPAS/budaya dan sejarah/museum-adityawarman4.jpg',
  ],
  'Museum Rumah Kelahiran Bagindo Aziz Chan': [
    'ASPAS/budaya dan sejarah/Rumah_Kelahiran_Bagindo_Azizchan.jpg',
    'ASPAS/budaya dan sejarah/Rumah_Kelahiran_Bagindo_Azizchan2.png',
    'ASPAS/budaya dan sejarah/Rumah_Kelahiran_Bagindo_Azizchan3.jpg',
  ],
  'Gedung Balai Kota Lama Padang': [
    'ASPAS/budaya dan sejarah/Gedung-Balai-Kota-Lama-Kota-Padang.webp',
    'ASPAS/budaya dan sejarah/Gedung-Balai-Kota-Lama-Kota-Padang2.jpg',
    'ASPAS/budaya dan sejarah/Gedung-Balai-Kota-Lama-Kota-Padang3.jpg',
  ],

  // === WISATA RELIGI ===
  'Masjid Raya Syekh Ahmad Khatib Al-Minangkabawi': ['ASPAS/Religi/Masjid Raya Syekh Ahmad Khatib Al-Minangkabawi .JPG'],
  'Masjid Al-Hakim Padang':   ['ASPAS/Religi/Masjid Al-Hakim Padang.JPG'],
  'Masjid Raya Gantiang':     ['ASPAS/Religi/Masjid Raya Gantiang.JPG'],
  'Klenteng See Hin Kiong':   ['ASPAS/Religi/Klenteng See Hin Kiong.JPG'],

  // === LANDMARK / BUATAN ===
  'Jembatan Siti Nurbaya':    ['ASPAS/Religi/Jembatan Siti Nurbaya.JPG'],
  'Monumen Merpati Perdamaian': ['ASPAS/Religi/Monumen Merpati Perdamaian.JPG'],

  // === WISATA ALAM & SEJARAH ===
  'Gunung Padang (Taman Siti Nurbaya)': ['ASPAS/wisata alam,budaya,sejarah/gunung padang.JPG'],

  // === WISATA SEJARAH ===
  'Monumen Gempa Padang': ['ASPAS/wisata alam,budaya,sejarah/monumen gemoa.JPG'],
};

function getPhotos(nama) { return DESTINATION_PHOTOS[nama] || []; }

// ---- Lightbox State ----
let lightboxPhotos = [];
let lightboxIndex  = 0;

function openLightbox(photos, index) {
  lightboxPhotos = photos;
  lightboxIndex  = index;
  const lb = document.getElementById('photoLightbox');
  lb.classList.add('open');
  renderLightbox();
}
function closeLightbox() {
  document.getElementById('photoLightbox').classList.remove('open');
}
function lightboxNav(dir) {
  lightboxIndex = (lightboxIndex + dir + lightboxPhotos.length) % lightboxPhotos.length;
  renderLightbox();
}
function renderLightbox() {
  const img = document.getElementById('lbImg');
  const counter = document.getElementById('lbCounter');
  img.style.opacity = '0';
  setTimeout(() => {
    img.src = lightboxPhotos[lightboxIndex];
    img.style.opacity = '1';
  }, 100);
  counter.textContent = `${lightboxIndex + 1} / ${lightboxPhotos.length}`;
  document.getElementById('lbPrev').style.display = lightboxPhotos.length > 1 ? 'flex' : 'none';
  document.getElementById('lbNext').style.display = lightboxPhotos.length > 1 ? 'flex' : 'none';
}

// Expose globals for onclick
window.openLightbox = openLightbox;
window.closeLightbox = closeLightbox;
window.lightboxNav = lightboxNav;
function getCategory(name) { return CATEGORY_CONFIG[name] || DEFAULT_CAT; }

// ---- Facility Type Config ----
const FACILITY_TYPES = [
  {
    label: 'Hotel & Penginapan',
    faIcon: 'fa-hotel',
    iconBg: 'rgba(99,102,241,0.2)',
    iconColor: '#818cf8',
    emoji: '🏨',
    queries: [
      'node["tourism"="hotel"]',
      'node["tourism"="guest_house"]',
      'node["tourism"="hostel"]',
      'node["tourism"="motel"]',
    ],
  },
  {
    label: 'Masjid & Musholla',
    faIcon: 'fa-mosque',
    iconBg: 'rgba(139,92,246,0.2)',
    iconColor: '#a78bfa',
    emoji: '🕌',
    queries: [
      'node["amenity"="place_of_worship"]["religion"="muslim"]',
    ],
  },
  {
    label: 'SPBU',
    faIcon: 'fa-gas-pump',
    iconBg: 'rgba(239,68,68,0.2)',
    iconColor: '#f87171',
    emoji: '⛽',
    queries: [
      'node["amenity"="fuel"]',
    ],
  },
  {
    label: 'Rumah Sakit & Klinik',
    faIcon: 'fa-hospital',
    iconBg: 'rgba(16,185,129,0.2)',
    iconColor: '#34d399',
    emoji: '🏥',
    queries: [
      'node["amenity"="hospital"]',
      'node["amenity"="clinic"]',
      'node["amenity"="doctors"]',
    ],
  },
  {
    label: 'Restoran & Kuliner',
    faIcon: 'fa-utensils',
    iconBg: 'rgba(245,158,11,0.2)',
    iconColor: '#fbbf24',
    emoji: '🍽️',
    queries: [
      'node["amenity"="restaurant"]',
      'node["amenity"="food_court"]',
      'node["amenity"="cafe"]',
    ],
  },
  {
    label: 'ATM & Bank',
    faIcon: 'fa-credit-card',
    iconBg: 'rgba(6,182,212,0.2)',
    iconColor: '#22d3ee',
    emoji: '🏧',
    queries: [
      'node["amenity"="atm"]',
      'node["amenity"="bank"]',
    ],
  },
  {
    label: 'Minimarket & Toko',
    faIcon: 'fa-store',
    iconBg: 'rgba(236,72,153,0.2)',
    iconColor: '#f472b6',
    emoji: '🏪',
    queries: [
      'node["shop"="convenience"]',
      'node["shop"="supermarket"]',
    ],
  },
  {
    label: 'Parkir',
    faIcon: 'fa-parking',
    iconBg: 'rgba(100,116,139,0.2)',
    iconColor: '#94a3b8',
    emoji: '🅿️',
    queries: [
      'node["amenity"="parking"]',
    ],
  },
];

// ---- State ----
let allFeatures      = [];
let filteredFeatures = [];
let markers          = [];
let activeFilter     = 'all';
let map, tileLayer;
let userLatLng       = null;
let userMarker       = null;
let userCircle       = null;
let routingControl      = null;
let activeDestLat       = null;
let activeDestLng       = null;
let activeDestName      = '';
let routeActive         = false;
let facilityMarkersGroup = null; // L.LayerGroup for facility map markers

// ---- Tile Layers ----
const TILE_LAYERS = {
  street:    { url:'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',                                          attr:'©OpenStreetMap ©CartoDB' },
  satellite: { url:'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',          attr:'©Esri' },
  terrain:   { url:'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',                                                       attr:'©OpenTopoMap' },
  dark:      { url:'https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png',                                     attr:'©OpenStreetMap ©CartoDB' },
};

// ============================================================
// INIT
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  initMap();
  fetchData();
  bindUI();
  setTimeout(() => document.getElementById('splash-screen').classList.add('hidden'), 2000);
});

function initMap() {
  map = L.map('map', { center:[-0.95, 100.38], zoom:12, zoomControl:false });
  L.control.zoom({ position:'bottomright' }).addTo(map);
  tileLayer = L.tileLayer(TILE_LAYERS.street.url, { attribution:TILE_LAYERS.street.attr, maxZoom:19 }).addTo(map);
  facilityMarkersGroup = L.layerGroup().addTo(map);
  map.on('click', () => {
    closeDetailPanel();
    document.getElementById('layerSelector').classList.remove('visible');
  });
}

// ---- Custom icon for facility map markers ----
const FACILITY_SOLID_COLORS = {
  'Hotel & Penginapan':    { bg:'#76ABAE', text:'#fff' },
  'Masjid & Musholla':     { bg:'#7c6bbf', text:'#fff' },
  'SPBU':                  { bg:'#FF5722', text:'#fff' },
  'Rumah Sakit & Klinik':  { bg:'#2e8b6e', text:'#fff' },
  'Restoran & Kuliner':    { bg:'#c07a20', text:'#fff' },
  'ATM & Bank':            { bg:'#1e8fa8', text:'#fff' },
  'Minimarket & Toko':     { bg:'#c0426b', text:'#fff' },
  'Parkir':                { bg:'#303841', text:'#fff' },
};

function createFacilityMapIcon(ft) {
  const solid = FACILITY_SOLID_COLORS[ft.label] || { bg:'#6366f1', text:'#fff' };
  return L.divIcon({
    html: `<div style="
      width:36px; height:36px; border-radius:10px;
      background:${solid.bg};
      border:3px solid rgba(255,255,255,0.9);
      box-shadow:0 4px 14px rgba(0,0,0,0.55);
      display:flex; align-items:center; justify-content:center;
      font-size:18px; line-height:1;
      position:relative;
    ">${ft.emoji}<div style="
      position:absolute; bottom:-7px; left:50%; transform:translateX(-50%);
      width:0; height:0;
      border-left:6px solid transparent;
      border-right:6px solid transparent;
      border-top:7px solid ${solid.bg};
    "></div></div>`,
    className: '',
    iconSize:   [36, 43],
    iconAnchor: [18, 43],
    popupAnchor:[0, -46]
  });
}

function clearFacilityMarkers() {
  if (facilityMarkersGroup) facilityMarkersGroup.clearLayers();
}

// ============================================================
// DATA
// ============================================================
async function fetchData() {
  try {
    const res  = await fetch(API_URL);
    if (!res.ok) throw new Error('HTTP ' + res.status);
    const data = await res.json();
    allFeatures      = data.features || [];
    filteredFeatures = [...allFeatures];
    renderAll();
    updateTopbarInfo(true);
    showToast('Data berhasil dimuat: ' + allFeatures.length + ' destinasi', 'success');
  } catch (err) {
    console.error(err);
    updateTopbarInfo(false);
    showToast('Gagal memuat data. Pastikan backend berjalan di port 3000.', 'error');
  }
}

// ============================================================
// RENDER
// ============================================================
function renderAll() {
  clearMarkers();
  renderMarkers(filteredFeatures);
  renderList(filteredFeatures);
  renderCards(filteredFeatures);
  updateStats();
  updateCounter(filteredFeatures.length);
}

function clearMarkers() { markers.forEach(m => map.removeLayer(m)); markers = []; }

function createCustomIcon(cat) {
  const cfg = getCategory(cat);
  return L.divIcon({
    html:`<div style="width:34px;height:34px;border-radius:50% 50% 50% 0;transform:rotate(-45deg);background:${cfg.color};border:3px solid #fff;box-shadow:0 3px 12px rgba(0,0,0,0.4);display:flex;align-items:center;justify-content:center;"><span style="transform:rotate(45deg);font-size:14px;display:block;text-align:center;line-height:28px;">${cfg.icon}</span></div>`,
    className:'', iconSize:[34,34], iconAnchor:[17,34], popupAnchor:[0,-38]
  });
}

function renderMarkers(features) {
  features.forEach(f => {
    const [lng,lat] = f.geometry.coordinates;
    const props = f.properties;
    const cat   = props.jenis_wisata || 'Lainnya';
    const cfg   = getCategory(cat);
    const marker = L.marker([lat,lng], { icon:createCustomIcon(cat) });
    marker.bindPopup(`
      <div class="popup-content">
        <span class="popup-badge" style="background:${cfg.bg};color:${cfg.color};border:1px solid ${cfg.border};">${cfg.icon} ${cat}</span>
        <div class="popup-title">${props.nama}</div>
        <div class="popup-coords">${lat.toFixed(4)}, ${lng.toFixed(4)}</div>
        <button class="popup-btn" onclick="openDetail('${esc(props.nama)}','${esc(cat)}',${lat},${lng})">
          <i class="fas fa-info-circle"></i> Lihat Detail &amp; Rute
        </button>
      </div>`, { maxWidth:260, closeButton:false });
    marker.on('click', () => highlightListItem(props.nama));
    marker.addTo(map);
    markers.push(marker);
  });
}

function esc(s) { return (s||'').replace(/'/g,"\\'"); }

function renderList(features) {
  const el = document.getElementById('destinationList');
  document.getElementById('listCount').textContent = features.length;
  if (!features.length) { el.innerHTML = '<div class="list-loading"><i class="fas fa-search"></i> Tidak ada hasil</div>'; return; }
  el.innerHTML = features.map(f => {
    const cat = f.properties.jenis_wisata || 'Lainnya';
    const cfg = getCategory(cat);
    return `<div class="dest-item" data-name="${esc(f.properties.nama)}" onclick="flyToFeature('${esc(f.properties.nama)}')">
      <span class="dest-dot" style="background:${cfg.color}"></span>
      <div class="dest-info"><div class="dest-name">${f.properties.nama}</div><div class="dest-cat">${cat}</div></div>
    </div>`;
  }).join('');
}

function renderCards(features) {
  document.getElementById('cardGrid').innerHTML = features.map(f => {
    const cat    = f.properties.jenis_wisata || 'Lainnya';
    const cfg    = getCategory(cat);
    const [lng,lat] = f.geometry.coordinates;
    const photos = getPhotos(f.properties.nama);
    const thumb  = photos.length
      ? `<div class="card-photo-wrap"><img class="card-photo" src="${photos[0]}" alt="${f.properties.nama}" loading="lazy" onerror="this.parentElement.style.display='none'" />${photos.length > 1 ? `<span class="card-photo-count"><i class="fas fa-images"></i> ${photos.length}</span>` : ''}</div>`
      : `<div class="card-no-photo"><div class="card-icon">${cfg.icon}</div></div>`;
    return `<div class="dest-card" onclick="openDetail('${esc(f.properties.nama)}','${esc(cat)}',${lat},${lng})">
      ${thumb}
      <div class="card-body">
        <span class="card-badge" style="background:${cfg.bg};color:${cfg.color};">${cfg.icon} ${cat}</span>
        <div class="card-title">${f.properties.nama}</div>
        <div class="card-coords"><i class="fas fa-map-pin" style="color:${cfg.color}"></i> ${lat.toFixed(4)}, ${lng.toFixed(4)}</div>
      </div>
    </div>`;
  }).join('');
}

function updateStats() {
  const total  = allFeatures.length;
  const alam   = allFeatures.filter(f => (f.properties.jenis_wisata||'').includes('Alam')).length;
  const budaya = allFeatures.filter(f => (f.properties.jenis_wisata||'').includes('Budaya')).length;
  const religi = allFeatures.filter(f => (f.properties.jenis_wisata||'').includes('Religi')).length;
  animateCount('statTotal', total);
  animateCount('statAlam', alam);
  animateCount('statBudaya', budaya);
  animateCount('statReligi', religi);
  document.getElementById('aboutTotal').textContent = total;
}
function animateCount(id, target) {
  const el = document.getElementById(id); let cur = 0;
  const step = Math.ceil(target/20);
  const t = setInterval(() => { cur = Math.min(cur+step,target); el.textContent=cur; if(cur>=target) clearInterval(t); }, 40);
}
function updateCounter(n) { document.getElementById('mapCounterVal').textContent = n; }
function updateTopbarInfo(ok) {
  document.getElementById('topbarInfo').innerHTML = ok
    ? `<i class="fas fa-circle" style="color:#10b981;font-size:8px;"></i> ${allFeatures.length} destinasi termuat`
    : `<i class="fas fa-exclamation-circle" style="color:#ef4444;"></i> Gagal koneksi backend`;
}

// ============================================================
// USER LOCATION
// ============================================================
function createUserLocationIcon() {
  return L.divIcon({
    html:`<div class="user-location-pulse"><div class="user-location-ring"></div><div class="user-location-dot"></div></div>`,
    className:'', iconSize:[20,20], iconAnchor:[10,10], popupAnchor:[0,-14]
  });
}

function locateUser(callback) {
  if (!navigator.geolocation) { showToast('Geolocation tidak didukung browser ini.', 'error'); return; }
  showToast('Mendeteksi lokasi Anda...', 'info');
  navigator.geolocation.getCurrentPosition(
    (pos) => {
      const { latitude:lat, longitude:lng, accuracy:acc } = pos.coords;
      userLatLng = { lat, lng };
      if (userMarker) map.removeLayer(userMarker);
      if (userCircle) map.removeLayer(userCircle);
      userCircle = L.circle([lat,lng], { radius:acc, color:'#38bdf8', fillColor:'#38bdf8', fillOpacity:0.08, weight:1.5, dashArray:'5,5' }).addTo(map);
      userMarker = L.marker([lat,lng], { icon:createUserLocationIcon(), zIndexOffset:1000 })
        .addTo(map)
        .bindPopup(`<div class="popup-content">
          <span class="popup-badge" style="background:rgba(56,189,248,0.15);color:#38bdf8;border:1px solid #38bdf8;">📍 Lokasi Anda</span>
          <div class="popup-title">Posisi Saya Sekarang</div>
          <div class="popup-coords">${lat.toFixed(6)}, ${lng.toFixed(6)}</div>
          <div style="font-size:10px;color:#94a3b8;margin-top:4px;">Akurasi ±${Math.round(acc)} meter</div>
        </div>`, { closeButton:false });
      map.flyTo([lat,lng], 15, { duration:1.5 });
      showToast(`Lokasi ditemukan! Akurasi ±${Math.round(acc)}m`, 'success');
      if (typeof callback === 'function') callback(lat, lng);
    },
    (err) => {
      const msgs = { 1:'Izin lokasi ditolak. Aktifkan lokasi di browser.', 2:'Tidak dapat mendeteksi posisi.', 3:'Waktu habis. Coba lagi.' };
      showToast(msgs[err.code] || 'Gagal mendapatkan lokasi.', 'error');
    },
    { enableHighAccuracy:true, timeout:10000, maximumAge:30000 }
  );
}

// ============================================================
// ROUTING
// ============================================================
function buildRoute(destLat, destLng, destName) {
  if (!userLatLng) { locateUser((lat,lng) => setTimeout(() => drawRoute(lat,lng,destLat,destLng,destName), 800)); return; }
  drawRoute(userLatLng.lat, userLatLng.lng, destLat, destLng, destName);
}

function drawRoute(fromLat, fromLng, toLat, toLng, destName) {
  clearRoute();
  const routeBtn = document.getElementById('detailRouteBtn');
  const routeStatus = document.getElementById('routeStatus');
  routeBtn.classList.add('loading');
  routeStatus.textContent = '⏳ Menghitung rute...';
  routeStatus.className = 'route-status';
  try {
    routingControl = L.Routing.control({
      waypoints: [L.latLng(fromLat,fromLng), L.latLng(toLat,toLng)],
      routeWhileDragging:false, showAlternatives:false, fitSelectedRoutes:true,
      lineOptions: { styles:[{color:'#76ABAE',weight:5,opacity:0.9},{color:'#5a9094',weight:3,opacity:0.5}], extendToWaypoints:true, missingRouteTolerance:0 },
      createMarker: () => null,
      router: L.Routing.osrmv1({ serviceUrl:'https://router.project-osrm.org/route/v1', profile:'driving' })
    })
    .on('routesfound', (e) => {
      const { totalDistance, totalTime } = e.routes[0].summary;
      const distKm  = (totalDistance/1000).toFixed(1);
      const mins    = Math.ceil(totalTime/60);
      const timeStr = mins >= 60 ? `${Math.floor(mins/60)} jam ${mins%60} mnt` : `${mins} mnt`;
      document.getElementById('routeDistance').textContent = distKm + ' km';
      document.getElementById('routeTime').textContent     = timeStr;
      document.getElementById('routeDest').innerHTML       = `<i class="fas fa-map-pin"></i> Menuju: ${destName}`;
      document.getElementById('routeInfoCard').style.display = 'block';
      document.getElementById('btnClearRoute').style.display  = 'flex';
      routeBtn.classList.remove('loading'); routeBtn.classList.add('active');
      routeBtn.innerHTML = '<i class="fas fa-check-circle"></i><span>Rute Aktif — Klik untuk Hapus</span>';
      routeStatus.textContent = `✅ ${distKm} km · ${timeStr} berkendara`;
      routeStatus.className   = 'route-status success';
      routeActive = true;
    })
    .on('routingerror', () => {
      routeBtn.classList.remove('loading');
      routeStatus.textContent = '❌ Gagal menghitung rute. Coba lagi.';
      routeStatus.className   = 'route-status error';
      showToast('Gagal menghitung rute. Cek koneksi internet.', 'error');
    })
    .addTo(map);
  } catch(err) {
    routeBtn.classList.remove('loading');
    routeStatus.textContent = '❌ Error routing.';
    routeStatus.className   = 'route-status error';
  }
}

function clearRoute() {
  if (routingControl) { try { map.removeControl(routingControl); } catch(e){} routingControl = null; }
  document.getElementById('routeInfoCard').style.display = 'none';
  document.getElementById('btnClearRoute').style.display  = 'none';
  routeActive = false;
  const rb = document.getElementById('detailRouteBtn');
  if (rb) { rb.classList.remove('loading','active'); rb.innerHTML = '<i class="fas fa-route"></i><span>Tampilkan Rute dari Lokasi Saya</span>'; }
  const rs = document.getElementById('routeStatus');
  if (rs) { rs.textContent=''; rs.className='route-status'; }
}

// ============================================================
// NEARBY FACILITIES (Overpass API)
// ============================================================
const OVERPASS_URL = 'https://overpass-api.de/api/interpreter';
const FACILITY_RADIUS = 1000; // meter

function haversineDistance(lat1, lng1, lat2, lng2) {
  const R = 6371000;
  const dLat = (lat2-lat1) * Math.PI/180;
  const dLng = (lng2-lng1) * Math.PI/180;
  const a = Math.sin(dLat/2)**2 + Math.cos(lat1*Math.PI/180)*Math.cos(lat2*Math.PI/180)*Math.sin(dLng/2)**2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
}

async function fetchNearbyFacilities(lat, lng) {
  const grid  = document.getElementById('facilitiesGrid');
  const load  = document.getElementById('facilitiesLoading');
  const err   = document.getElementById('facilitiesError');

  // Clear previous facility markers before loading new ones
  clearFacilityMarkers();
  grid.innerHTML = '';
  err.style.display  = 'none';
  load.style.display = 'flex';

  // Build Overpass QL — union all queries in one request
  const allQueries = FACILITY_TYPES.flatMap(t => t.queries);
  const unionParts = allQueries.map(q => `${q}(around:${FACILITY_RADIUS},${lat},${lng});`).join('\n');
  const query = `[out:json][timeout:20];\n(\n${unionParts}\n);\nout body;`;

  try {
    const res  = await fetch(OVERPASS_URL, { method:'POST', body:'data=' + encodeURIComponent(query) });
    if (!res.ok) throw new Error('HTTP ' + res.status);
    const data = await res.json();
    load.style.display = 'none';
    renderFacilities(data.elements, lat, lng, grid);
  } catch(e) {
    console.error('Overpass error:', e);
    load.style.display = 'none';
    err.style.display  = 'flex';
  }
}

function matchFacilityType(tags) {
  for (const ft of FACILITY_TYPES) {
    for (const q of ft.queries) {
      // Parse "node["key"="value"]" pattern
      const match = q.match(/\["([^"]+)"="([^"]+)"\]/g);
      if (!match) continue;
      let matched = true;
      for (const cond of match) {
        const [,k,v] = cond.match(/\["([^"]+)"="([^"]+)"\]/);
        if (tags[k] !== v) { matched = false; break; }
      }
      if (matched) return ft;
    }
  }
  return null;
}

function renderFacilities(elements, destLat, destLng, grid) {
  if (!elements || elements.length === 0) {
    grid.innerHTML = '<div class="facilities-empty">Tidak ada fasilitas ditemukan dalam radius 1 km.</div>';
    return;
  }

  // Group by facility type, max 3 per group
  const groups = {};
  for (const el of elements) {
    if (!el.lat || !el.lon) continue;
    const tags = el.tags || {};
    const ft   = matchFacilityType(tags);
    if (!ft) continue;
    if (!groups[ft.label]) groups[ft.label] = { ft, items:[] };
    if (groups[ft.label].items.length >= 3) continue;
    const dist = haversineDistance(destLat, destLng, el.lat, el.lon);
    const name = tags.name || tags['name:id'] || tags['name:en'] || ft.label;
    groups[ft.label].items.push({ name, dist, lat: el.lat, lon: el.lon, tags });
  }

  if (Object.keys(groups).length === 0) {
    grid.innerHTML = '<div class="facilities-empty">Tidak ada fasilitas ditemukan dalam radius 1 km.</div>';
    return;
  }

  // Sort groups by order in FACILITY_TYPES
  const sortedGroups = FACILITY_TYPES
    .filter(ft => groups[ft.label])
    .map(ft => groups[ft.label]);

  // ---- Add markers to map ----
  clearFacilityMarkers();
  sortedGroups.forEach(({ ft, items }) => {
    items.sort((a,b) => a.dist - b.dist);
    items.forEach(item => {
      const distStr  = item.dist < 1000 ? Math.round(item.dist) + ' m' : (item.dist/1000).toFixed(1) + ' km';
      const subtitle = getSubtitle(item.tags, ft.label);
      const safeName = item.name.replace(/'/g, "\\'");
      const marker   = L.marker([item.lat, item.lon], {
        icon: createFacilityMapIcon(ft),
        zIndexOffset: 500
      });
      marker.bindPopup(`
        <div class="popup-content">
          <span class="popup-badge" style="background:${ft.iconBg};color:${ft.iconColor};border:1px solid ${ft.iconColor};">
            ${ft.emoji} ${ft.label}
          </span>
          <div class="popup-title">${item.name}</div>
          ${subtitle ? `<div class="popup-coords">${subtitle}</div>` : ''}
          <div style="font-size:10px;color:#94a3b8;margin:4px 0 10px;">
            <i class="fas fa-map-marker-alt" style="color:${ft.iconColor};"></i> ${distStr} dari destinasi
          </div>
          <button class="popup-btn" style="background:${ft.iconColor};"
            onclick="routeToFacility(${item.lat},${item.lon},'${safeName}','${ft.emoji}')">
            <i class="fas fa-directions"></i> Rute ke Sini
          </button>
        </div>`, { maxWidth: 240, closeButton: false });
      facilityMarkersGroup.addLayer(marker);
    });
  });

  // ---- Render sidebar list ----
  grid.innerHTML = sortedGroups.map(({ ft, items }) => {
    items.sort((a,b) => a.dist - b.dist);
    const itemsHtml = items.map(item => {
      const distStr  = item.dist < 1000 ? Math.round(item.dist) + ' m' : (item.dist/1000).toFixed(1) + ' km';
      const subtitle = getSubtitle(item.tags, ft.label);
      const safeName = item.name.replace(/'/g, "\\'");
      return `<div class="facility-item">
        <div class="facility-icon" style="background:${ft.iconBg};">
          <i class="fas ${ft.faIcon}" style="color:${ft.iconColor};"></i>
        </div>
        <div class="facility-info">
          <div class="facility-name">${item.name}</div>
          ${subtitle ? `<div class="facility-meta">${subtitle}</div>` : ''}
          <div class="facility-dist-inline">${distStr} dari sini</div>
        </div>
        <button
          class="facility-route-btn"
          title="Rute ke sini"
          onclick="routeToFacility(${item.lat},${item.lon},'${safeName}','${ft.emoji}')"
        >
          <i class="fas fa-directions"></i>
        </button>
      </div>`;
    }).join('');
    return `<div class="facility-group">
      <div class="facility-group-title">
        <i class="fas ${ft.faIcon}" style="color:${ft.iconColor};"></i>
        ${ft.label}
      </div>
      ${itemsHtml}
    </div>`;
  }).join('');
}

function getSubtitle(tags, label) {
  if (tags['opening_hours']) return `🕐 ${tags['opening_hours']}`;
  if (tags['brand'])         return tags['brand'];
  if (tags['operator'])      return tags['operator'];
  if (label === 'Masjid & Musholla') return tags['religion'] === 'muslim' ? 'Islam' : '';
  if (label === 'SPBU')      return tags['brand'] || 'SPBU';
  return '';
}

// ---- Route to a specific facility ----
window.routeToFacility = function(lat, lng, name, emoji) {
  // Don't close panel — just minimize it so user sees the map with markers
  document.getElementById('detailPanel').classList.remove('open');
  document.getElementById('detailOverlay').classList.remove('open');
  // Keep facility markers on map so user can see destination context

  const go = (fromLat, fromLng) => {
    clearRoute();

    document.getElementById('routeInfoCard').style.display = 'none';
    showToast(`Menghitung rute ke ${emoji} ${name}...`, 'info');

    try {
      routingControl = L.Routing.control({
        waypoints: [L.latLng(fromLat, fromLng), L.latLng(lat, lng)],
        routeWhileDragging: false,
        showAlternatives: false,
        fitSelectedRoutes: true,
        lineOptions: {
          styles: [
            { color:'#f59e0b', weight:5, opacity:0.9 },
            { color:'#fbbf24', weight:3, opacity:0.5 }
          ],
          extendToWaypoints: true,
          missingRouteTolerance: 0
        },
        createMarker: () => null,
        router: L.Routing.osrmv1({
          serviceUrl: 'https://router.project-osrm.org/route/v1',
          profile: 'driving'
        })
      })
      .on('routesfound', (e) => {
        const { totalDistance, totalTime } = e.routes[0].summary;
        const distKm  = (totalDistance / 1000).toFixed(1);
        const mins    = Math.ceil(totalTime / 60);
        const timeStr = mins >= 60
          ? `${Math.floor(mins/60)} jam ${mins%60} mnt`
          : `${mins} mnt`;

        document.getElementById('routeDistance').textContent = distKm + ' km';
        document.getElementById('routeTime').textContent     = timeStr;
        document.getElementById('routeDest').innerHTML =
          `<i class="fas fa-map-pin" style="color:#f59e0b"></i> ${emoji} Menuju: ${name}`;
        document.getElementById('routeInfoCard').style.display = 'block';
        document.getElementById('btnClearRoute').style.display  = 'flex';

        routeActive = true;
        showToast(`✅ Rute ke ${name}: ${distKm} km (${timeStr})`, 'success');
      })
      .on('routingerror', () => {
        showToast('Gagal menghitung rute ke fasilitas.', 'error');
      })
      .addTo(map);
    } catch(err) {
      showToast('Error saat routing ke fasilitas.', 'error');
    }
  };

  if (userLatLng) {
    go(userLatLng.lat, userLatLng.lng);
  } else {
    locateUser((fromLat, fromLng) => setTimeout(() => go(fromLat, fromLng), 800));
  }
};

// ============================================================
// FILTER & SEARCH
// ============================================================
function applyFilter(category) {
  activeFilter = category;
  filteredFeatures = category === 'all' ? [...allFeatures] : allFeatures.filter(f => f.properties.jenis_wisata === category);
  document.querySelectorAll('.chip').forEach(c => c.classList.toggle('active', c.dataset.category === category));
  renderAll();
  if (filteredFeatures.length) fitToFiltered();
}

function fitToFiltered() {
  if (!filteredFeatures.length) return;
  map.fitBounds(filteredFeatures.map(f => [f.geometry.coordinates[1], f.geometry.coordinates[0]]), { padding:[40,40] });
}

function applySearch(query) {
  const q = query.toLowerCase().trim();
  document.getElementById('searchClear').classList.toggle('visible', q.length > 0);
  let base = activeFilter === 'all' ? allFeatures : allFeatures.filter(f => f.properties.jenis_wisata === activeFilter);
  filteredFeatures = q ? base.filter(f => (f.properties.nama||'').toLowerCase().includes(q) || (f.properties.jenis_wisata||'').toLowerCase().includes(q)) : [...base];
  clearMarkers(); renderMarkers(filteredFeatures); renderList(filteredFeatures); renderCards(filteredFeatures); updateCounter(filteredFeatures.length);
}

// ============================================================
// DETAIL PANEL
// ============================================================
window.openDetail = function(name, cat, lat, lng) {
  const cfg    = getCategory(cat);
  const photos = getPhotos(name);
  activeDestLat  = lat;
  activeDestLng  = lng;
  activeDestName = name;

  // Clear old facility markers from previous selection
  clearFacilityMarkers();

  document.getElementById('detailCategory').innerHTML =
    `<span style="background:${cfg.bg};color:${cfg.color};border:1px solid ${cfg.border};padding:4px 10px;border-radius:99px;font-size:11px;font-weight:700;">${cfg.icon} ${cat}</span>`;
  document.getElementById('detailTitle').textContent   = name;
  document.getElementById('detailCoords').textContent  = `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
  document.getElementById('detailIconRow').textContent = cfg.icon;
  document.getElementById('detailDescription').textContent = generateDescription(name, cat);

  // Render photo gallery
  renderDetailGallery(photos, name, cfg);

  // Reset route button
  const rb = document.getElementById('detailRouteBtn');
  rb.classList.remove('loading','active');
  rb.innerHTML = '<i class="fas fa-route"></i><span>Tampilkan Rute dari Lokasi Saya</span>';
  document.getElementById('routeStatus').textContent = '';
  document.getElementById('routeStatus').className   = 'route-status';

  // Open panel
  document.getElementById('detailPanel').classList.add('open');
  document.getElementById('detailOverlay').classList.add('open');

  // Load nearby facilities
  fetchNearbyFacilities(lat, lng);
};

// ---- Detail Panel Photo Gallery ----
let galleryIndex = 0;
let galleryPhotos = [];

function renderDetailGallery(photos, name, cfg) {
  const container = document.getElementById('detailGallery');
  if (!photos || photos.length === 0) {
    container.innerHTML = `<div class="gallery-placeholder" style="--cat-color:${cfg.color}">
      <div class="gallery-placeholder-icon">${cfg.icon}</div>
      <div class="gallery-placeholder-text">Foto belum tersedia</div>
    </div>`;
    return;
  }

  galleryPhotos = photos;
  galleryIndex  = 0;

  if (photos.length === 1) {
    container.innerHTML = `
      <div class="gallery-single" onclick="openLightbox(galleryPhotos, 0)">
        <img src="${photos[0]}" alt="${name}" loading="lazy" onerror="this.parentElement.classList.add('gallery-img-error')" />
        <div class="gallery-zoom-hint"><i class="fas fa-search-plus"></i> Klik untuk perbesar</div>
      </div>`;
  } else {
    const dotsHtml = photos.map((_, i) =>
      `<button class="gallery-dot ${i===0?'active':''}" onclick="goGallery(${i})" id="gdot-${i}"></button>`
    ).join('');
    container.innerHTML = `
      <div class="gallery-carousel" id="galleryCarousel">
        <div class="gallery-slides" id="gallerySlides">
          ${photos.map((p, i) => `
            <div class="gallery-slide" onclick="openLightbox(galleryPhotos, ${i})">
              <img src="${p}" alt="${name} foto ${i+1}" loading="lazy" onerror="this.parentElement.classList.add('gallery-img-error')" />
              <div class="gallery-zoom-hint"><i class="fas fa-search-plus"></i></div>
            </div>`).join('')}
        </div>
        <button class="gallery-nav gallery-prev" onclick="goGallery(galleryIndex-1)"><i class="fas fa-chevron-left"></i></button>
        <button class="gallery-nav gallery-next" onclick="goGallery(galleryIndex+1)"><i class="fas fa-chevron-right"></i></button>
        <div class="gallery-dots">${dotsHtml}</div>
        <div class="gallery-counter">${photos.length} foto</div>
      </div>`;
    goGallery(0);
  }
}

window.goGallery = function(idx) {
  if (!galleryPhotos.length) return;
  galleryIndex = (idx + galleryPhotos.length) % galleryPhotos.length;
  const slides = document.getElementById('gallerySlides');
  if (slides) slides.style.transform = `translateX(-${galleryIndex * 100}%)`;
  document.querySelectorAll('.gallery-dot').forEach((d, i) => d.classList.toggle('active', i === galleryIndex));
};

window.flyToFeature = function(name) {
  const f = allFeatures.find(x => x.properties.nama === name);
  if (!f) return;
  const [lng,lat] = f.geometry.coordinates;
  map.flyTo([lat,lng], 16, { duration:1.2 });
  highlightListItem(name);
  setTimeout(() => {
    const idx = filteredFeatures.findIndex(x => x.properties.nama === name);
    if (idx >= 0 && markers[idx]) markers[idx].openPopup();
  }, 400);
};

function highlightListItem(name) {
  document.querySelectorAll('.dest-item').forEach(el => el.classList.toggle('active', el.dataset.name === name));
}
function closeDetailPanel() {
  document.getElementById('detailPanel').classList.remove('open');
  document.getElementById('detailOverlay').classList.remove('open');
  // NOTE: facility markers intentionally kept visible on map after panel closes
}

function generateDescription(name, cat) {
  const descs = {
    'Wisata Alam': `${name} merupakan destinasi wisata alam yang menakjubkan di Kota Padang, menawarkan keindahan panorama alam yang memukau dan menjadi favorit wisatawan lokal maupun mancanegara.`,
    'Wisata Budaya & Sejarah': `${name} adalah destinasi wisata budaya dan sejarah yang kaya nilai historis di Kota Padang, menyimpan berbagai cerita dan peninggalan budaya Minangkabau yang berharga.`,
    'Wisata Religi': `${name} merupakan tempat wisata religi yang memiliki nilai spiritual tinggi di Kota Padang, menjadi tempat ibadah sekaligus wisata rohani bagi pengunjung.`,
    'Landmark / Buatan': `${name} adalah landmark ikonik Kota Padang yang menjadi simbol kebanggaan masyarakat dan sangat populer sebagai spot foto dan rekreasi.`,
    'Wisata Sejarah': `${name} merupakan situs sejarah penting di Kota Padang yang menyimpan kenangan dan catatan peristiwa bersejarah yang wajib dikunjungi para pecinta sejarah.`,
    'Wisata Alam & Sejarah': `${name} memadukan keindahan alam dan nilai sejarah dalam satu destinasi unik di Kota Padang.`,
  };
  return descs[cat] || `${name} adalah destinasi wisata menarik di Kota Padang, Sumatera Barat yang layak untuk dikunjungi dan dieksplorasi.`;
}

// ============================================================
// LAYER
// ============================================================
function switchLayer(name) {
  map.removeLayer(tileLayer);
  tileLayer = L.tileLayer(TILE_LAYERS[name].url, { attribution:TILE_LAYERS[name].attr, maxZoom:19 }).addTo(map);
  document.querySelectorAll('.layer-option').forEach(el => el.classList.toggle('active', el.dataset.layer === name));
}

// ============================================================
// TOAST
// ============================================================
function showToast(msg, type='info') {
  const icons = { success:'✅', error:'❌', info:'ℹ️' };
  const el = document.createElement('div');
  el.className = `toast ${type}`;
  el.innerHTML = `<span>${icons[type]}</span> ${msg}`;
  document.getElementById('toastContainer').appendChild(el);
  setTimeout(() => el.remove(), 4000);
}

// ============================================================
// BIND UI
// ============================================================
function bindUI() {
  // Sidebar
  document.getElementById('sidebarToggle').addEventListener('click', () => {
    document.getElementById('sidebar').classList.toggle('collapsed');
    document.getElementById('mainContent').classList.toggle('expanded');
  });
  document.getElementById('menuBtn').addEventListener('click', () => {
    document.getElementById('sidebar').classList.toggle('collapsed');
    document.getElementById('mainContent').classList.toggle('expanded');
    document.getElementById('sidebar').classList.toggle('open');
  });

  // Filter chips
  document.querySelectorAll('.chip').forEach(chip => chip.addEventListener('click', () => applyFilter(chip.dataset.category)));

  // Search
  document.getElementById('searchInput').addEventListener('input', e => applySearch(e.target.value));
  document.getElementById('searchClear').addEventListener('click', () => { document.getElementById('searchInput').value=''; applySearch(''); });

  // Locate
  document.getElementById('btnLocate').addEventListener('click', () => locateUser());

  // Fit All
  document.getElementById('btnFitAll').addEventListener('click', () => {
    if (filteredFeatures.length) fitToFiltered(); else map.setView([-0.95,100.38],12);
  });

  // Layer toggle
  document.getElementById('btnLayerToggle').addEventListener('click', () => document.getElementById('layerSelector').classList.toggle('visible'));
  document.querySelectorAll('.layer-option').forEach(opt => opt.addEventListener('click', () => { switchLayer(opt.dataset.layer); document.getElementById('layerSelector').classList.remove('visible'); }));

  // Clear route
  document.getElementById('btnClearRoute').addEventListener('click', () => { clearRoute(); showToast('Rute dihapus.','info'); });
  document.getElementById('routeInfoClose').addEventListener('click', () => { document.getElementById('routeInfoCard').style.display='none'; });

  // Route button
  document.getElementById('detailRouteBtn').addEventListener('click', () => {
    if (activeDestLat === null) return;
    if (routeActive) { clearRoute(); showToast('Rute dihapus.','info'); return; }
    buildRoute(activeDestLat, activeDestLng, activeDestName);
  });

  // View toggle
  document.getElementById('viewMap').addEventListener('click', () => {
    document.getElementById('mapWrapper').classList.remove('hidden');
    document.getElementById('cardGridContainer').classList.add('hidden');
    document.getElementById('viewMap').classList.add('active');
    document.getElementById('viewSplit').classList.remove('active');
    map.invalidateSize();
  });
  document.getElementById('viewSplit').addEventListener('click', () => {
    document.getElementById('mapWrapper').classList.add('hidden');
    document.getElementById('cardGridContainer').classList.remove('hidden');
    document.getElementById('viewSplit').classList.add('active');
    document.getElementById('viewMap').classList.remove('active');
  });

  // Detail close
  document.getElementById('detailClose').addEventListener('click', closeDetailPanel);
  document.getElementById('detailOverlay').addEventListener('click', closeDetailPanel);

  // About modal
  document.getElementById('btnAbout').addEventListener('click', () => document.getElementById('modalAbout').classList.add('open'));
  document.getElementById('modalClose').addEventListener('click', () => document.getElementById('modalAbout').classList.remove('open'));
  document.getElementById('modalAbout').addEventListener('click', e => { if(e.target===e.currentTarget) e.currentTarget.classList.remove('open'); });

  // Keyboard navigation for lightbox
  document.addEventListener('keydown', (e) => {
    const lb = document.getElementById('photoLightbox');
    if (!lb.classList.contains('open')) return;
    if (e.key === 'Escape')     closeLightbox();
    if (e.key === 'ArrowLeft')  lightboxNav(-1);
    if (e.key === 'ArrowRight') lightboxNav(1);
  });

  // Touch swipe for lightbox
  let lbTouchStart = 0;
  document.getElementById('photoLightbox').addEventListener('touchstart', e => {
    lbTouchStart = e.changedTouches[0].screenX;
  }, { passive: true });
  document.getElementById('photoLightbox').addEventListener('touchend', e => {
    const diff = lbTouchStart - e.changedTouches[0].screenX;
    if (Math.abs(diff) > 50) lightboxNav(diff > 0 ? 1 : -1);
  }, { passive: true });
}

// ============================================================
// NOVELTY FEATURES (PREFERENCES, REVIEWS, REPORTS)
// ============================================================
const API_BASE = 'http://localhost:3000/api';

// 1. Session Management
function getSessionId() {
  let sid = localStorage.getItem('webgis_session_id');
  if (!sid) {
    sid = 'user_' + Math.random().toString(36).substr(2, 9);
    localStorage.setItem('webgis_session_id', sid);
    setTimeout(() => { document.getElementById('modalPreferences').classList.add('open'); }, 2500);
  } else {
    loadRecommendations(sid);
  }
  return sid;
}
const SESSION_ID = getSessionId();

// 2. Preferences
document.getElementById('preferencesForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const kategori_suka = formData.getAll('kategori');
  
  if(kategori_suka.length === 0) {
    showToast('Pilih minimal satu kategori', 'error'); return;
  }
  try {
    const res = await fetch(`${API_BASE}/preferences`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ session_id: SESSION_ID, kategori_suka })
    });
    if (res.ok) {
      showToast('Preferensi berhasil disimpan!', 'success');
      document.getElementById('modalPreferences').classList.remove('open');
      loadRecommendations(SESSION_ID);
    }
  } catch(err) {
    showToast('Gagal menyimpan preferensi', 'error');
  }
});
document.getElementById('btnSkipPreferences').addEventListener('click', () => {
  document.getElementById('modalPreferences').classList.remove('open');
});

// 3. Recommendations
async function loadRecommendations(sid) {
  try {
    const res = await fetch(`${API_BASE}/recommendations/${sid}`);
    const data = await res.json();
    const list = document.getElementById('recommendationList');
    const sec = document.getElementById('recommendationSection');
    if (data.data && data.data.length > 0) {
      sec.style.display = 'block';
      list.innerHTML = data.data.map(f => {
        const cat = f.jenis_wisata || 'Lainnya';
        const cfg = getCategory(cat);
        return `<div class="dest-item" onclick="flyToFeature('${esc(f.nama)}')">
          <span class="dest-dot" style="background:${cfg.color}"></span>
          <div class="dest-info"><div class="dest-name">${f.nama}</div><div class="dest-cat" style="font-size:10px">${cat}</div></div>
        </div>`;
      }).join('');
    }
  } catch(err) { console.error('Gagal load rekomendasi', err); }
}

// 4. Log Interactions (hook into openDetail)
const originalOpenDetail = window.openDetail;
window.openDetail = function(name, cat, lat, lng) {
  originalOpenDetail(name, cat, lat, lng);
  
  // Log interaction
  fetch(`${API_BASE}/interactions`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ session_id: SESSION_ID, wisata_nama: name, tipe: 'view_detail' })
  }).catch(()=>{});

  // Load Reviews
  loadReviews(name);
};

// 5. Reviews Logic
async function loadReviews(nama) {
  const list = document.getElementById('reviewList');
  list.innerHTML = '<div class="list-loading"><i class="fas fa-spinner fa-spin"></i> Memuat ulasan...</div>';
  try {
    const res = await fetch(`${API_BASE}/ulasan/${encodeURIComponent(nama)}`);
    const reviews = await res.json();
    if(reviews.length === 0) {
      list.innerHTML = '<div style="font-size:13px; color:#666; text-align:center; padding: 10px 0;">Belum ada ulasan. Jadilah yang pertama!</div>';
    } else {
      list.innerHTML = reviews.map(r => `
        <div style="background:#fff; border:1px solid #eee; border-radius:8px; padding:12px;">
          <div style="display:flex; justify-content:space-between; margin-bottom:5px;">
            <strong style="font-size:13px;">${r.nama_pengunjung || 'Anonim'}</strong>
            <span style="color:#FFD700; font-size:12px;">${'★'.repeat(r.rating)}${'☆'.repeat(5-r.rating)}</span>
          </div>
          <div style="font-size:13px; color:#444;">${r.komentar}</div>
        </div>
      `).join('');
    }
  } catch(e) { list.innerHTML = '<div style="color:red; font-size:12px;">Gagal memuat ulasan</div>'; }
}

// Star Rating UI
document.querySelectorAll('#starRatingContainer .fa-star').forEach(star => {
  star.addEventListener('click', (e) => {
    const rating = e.target.dataset.rating;
    document.getElementById('reviewRatingInput').value = rating;
    document.querySelectorAll('#starRatingContainer .fa-star').forEach(s => {
      s.style.color = s.dataset.rating <= rating ? '#FFD700' : '#ddd';
    });
  });
});

document.getElementById('reviewForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  if(!activeDestName) return;
  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData.entries());
  data.wisata_nama = activeDestName;
  
  if(!data.rating) { showToast('Pilih rating bintang terlebih dahulu', 'error'); return; }
  
  const btn = e.target.querySelector('button[type="submit"]');
  btn.disabled = true; btn.textContent = 'Mengirim...';
  try {
    const res = await fetch(`${API_BASE}/ulasan`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });
    if(res.ok) {
      showToast('Ulasan berhasil ditambahkan', 'success');
      e.target.reset();
      document.getElementById('reviewRatingInput').value = '';
      document.querySelectorAll('#starRatingContainer .fa-star').forEach(s => s.style.color = '#ddd');
      loadReviews(activeDestName);
    } else {
      showToast('Gagal mengirim ulasan', 'error');
    }
  } catch(e) { showToast('Gagal mengirim ulasan', 'error'); }
  btn.disabled = false; btn.textContent = 'Kirim Ulasan';
});

// 6. Reports / Crowdsourcing
document.getElementById('btnBukaLaporan').addEventListener('click', () => {
  if(!activeDestName) return;
  document.getElementById('laporanWisataNama').textContent = activeDestName;
  document.getElementById('modalLaporan').classList.add('open');
});
document.getElementById('modalLaporanClose').addEventListener('click', () => {
  document.getElementById('modalLaporan').classList.remove('open');
});

document.getElementById('laporanForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  if(!activeDestName) return;
  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData.entries());
  data.wisata_nama = activeDestName;
  
  const btn = document.getElementById('btnSubmitLaporan');
  btn.disabled = true; btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Mengirim...';
  
  try {
    const res = await fetch(`${API_BASE}/laporan`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });
    if(res.ok) {
      showToast('Laporan berhasil dikirim. Terima kasih!', 'success');
      document.getElementById('modalLaporan').classList.remove('open');
      e.target.reset();
    } else {
      showToast('Gagal mengirim laporan', 'error');
    }
  } catch(e) { showToast('Gagal mengirim laporan', 'error'); }
  btn.disabled = false; btn.innerHTML = '<i class="fas fa-paper-plane"></i> Kirim Laporan';
});
