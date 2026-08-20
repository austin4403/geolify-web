# ⛏️ 03. Field Telemetry, Outcrop Pins & Offline Mobile Sync

## 📌 Overview
Equips exploration teams to capture geological field observations directly onto the map (rock samples, assay results, strike & dip structural compass readings, photos) with offline resilience and automatic synchronization when cellular or satellite connectivity returns.

---

## 🛠️ Key Capabilities

### 1. Geological Sample & Outcrop Pins
* Drop geolocated pins categorized by rock type, alteration style, and mineral classification (e.g., *Gold Quartz Vein*, *Spodumene Pegmatite*, *Gossan Outcrop*).
* Attach high-resolution outcrop photographs and field notes directly to the pin.

### 2. Live Strike & Dip Compass Readings
* Visualizes structural geology directly on the 2D/3D map using standardized geological strike and dip symbols (T-bars with angle notations).
* Can integrate directly with mobile device internal magnetometers and gyroscopes to record strike/dip with one tap on rock faces.

### 3. Offline-First PWA Storage (IndexedDB + Service Worker)
* Remote mineral exploration frequently happens without cellular coverage.
* Field observations are stored in browser **IndexedDB** locally with raster tile caching (via CacheStorage API).
* When the mobile device reconnects to Starlink, Wi-Fi, or cellular networks, queued sync actions push to PostgreSQL.

---

## 💻 Technical Schema Blueprint

### Sample Pin GeoJSON Structure
```json
{
  "type": "Feature",
  "id": "sample-pin-902",
  "geometry": {
    "type": "Point",
    "coordinates": [36.8219, -1.2921]
  },
  "properties": {
    "sampleCode": "GEO-2026-AU-084",
    "sampler": "Austin",
    "lithology": "Granodiorite with Quartz Stringers",
    "strike": 142,
    "dip": 45,
    "dipDirection": "NE",
    "mineralTarget": "Gold / Pyrite",
    "photos": [
      "https://storage.geolify.io/outcrops/geo-84-a.webp"
    ],
    "timestamp": "2026-08-20T14:30:00Z"
  }
}
```

---

## 🎯 Geological & Mining Value
1. **Zero Data Loss**: Ensures weeks of grueling field sampling are never lost due to device disconnects.
2. **Instant QA/QC**: Field laboratory assay results can be mapped against sample points within minutes of geochemical lab delivery.
