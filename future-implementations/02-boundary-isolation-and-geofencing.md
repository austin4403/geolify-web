# 🗺️ 02. Administrative Boundary Isolation & Geofencing

## 📌 Overview
Allows users searching for any country, state, county, concession, or town to isolate the geographic boundary on the map with a high-contrast dotted/dashed boundary, subtle color tint, and automated camera bounding box framing.

---

## 🛠️ Key Capabilities

### 1. Dynamic OSM Polygon Boundary Extraction
* When a user searches for *"Kenya"*, *"Elko County, Nevada"*, or *"Atacama"*, the query pulls full GeoJSON `Polygon` or `MultiPolygon` administrative borders from OpenStreetMap Nominatim or Overpass API.
* The boundary is rendered with a dotted line (`line-dasharray: [2, 2]`) and an illuminated glow effect.

### 2. Smart Camera Fitting (`fitBounds`)
* Automatically frames the camera with padding so the entire region fits smoothly inside the viewport regardless of device screen size.
* Computes bounding box `[minLng, minLat, maxLng, maxLat]` using `@turf/bbox`.

### 3. Concession Geofencing & Boundary Breach Alerts
* For mining claims and active concessions, boundaries can be marked as **Active Geofences**.
* If telemetry coordinates or field personnel cross outside the legal concession perimeter, visual alerts trigger on both mobile and desktop.

---

## 💻 Technical Implementation Blueprint

### A. Geocoding API Request with Polygon Output
```typescript
export async function fetchLocationBoundary(query: string) {
  const url = `https://nominatim.openstreetmap.org/search?format=json&polygon_geojson=1&q=${encodeURIComponent(query)}`;
  const response = await fetch(url);
  const data = await response.json();

  if (!data || data.length === 0) return null;

  const result = data[0];
  return {
    name: result.display_name,
    geojson: result.geojson, // Polygon / MultiPolygon
    bbox: result.boundingbox, // [minLat, maxLat, minLon, maxLon]
  };
}
```

### B. MapLibre Dotted Line & Fill Layers
```typescript
export function renderDottedBoundary(map: maplibregl.Map, geojsonData: any) {
  // Update or add GeoJSON source
  if (map.getSource("boundary-source")) {
    (map.getSource("boundary-source") as maplibregl.GeoJSONSource).setData(geojsonData);
  } else {
    map.addSource("boundary-source", {
      type: "geojson",
      data: geojsonData,
    });

    // 1. Dotted Outline
    map.addLayer({
      id: "boundary-line-layer",
      type: "line",
      source: "boundary-source",
      paint: {
        "line-color": "#ef4444",
        "line-width": 2.5,
        "line-dasharray": [2, 2], // Dotted pattern
      },
    });

    // 2. Translucent Fill Tint
    map.addLayer({
      id: "boundary-fill-layer",
      type: "fill",
      source: "boundary-source",
      paint: {
        "fill-color": "#ef4444",
        "fill-opacity": 0.05,
      },
    });
  }
}
```

---

## 🎯 Geological & Mining Value
1. **Legal Concession Integrity**: Ensures field teams stay strictly within licensed mineral tenement borders.
2. **Jurisdiction Clarity**: Instantly clarifies international, state, and provincial mining rights borders.
3. **Focused Presentation**: Highlights target exploration blocks during stakeholder and investor presentations.
