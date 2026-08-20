# 🏔️ 04. 3D Terrain Elevation & Subsurface Borehole Slicing

## 📌 Overview
Transforms the 2D map into a full 3D terrain viewer using high-resolution Digital Elevation Models (DEM), with cross-sectional lithology slicing and 3D borehole trajectory visualization.

---

## 🛠️ Key Capabilities

### 1. MapLibre 3D Terrain Mesh (RGB-DEM)
* Integrates MapLibre's native 3D terrain engine using Terrarium or Mapbox RGB elevation tiles.
* Allows pitch tilting (0° to 85°) and camera rotation to inspect mountains, fault scarps, and valley morphology.

```typescript
// MapLibre 3D Terrain Setup
map.addSource("terrain-dem", {
  type: "raster-dem",
  url: "https://demotiles.maplibre.org/terrain-tiles/tiles.json",
  tileSize: 256,
});

map.setTerrain({
  source: "terrain-dem",
  exaggeration: 1.5, // 1.5x vertical exaggeration for subtle geological features
});
```

### 2. Subsurface Borehole Visualization (3D Drillholes)
* Renders drillhole collars, downhole assay intervals (e.g., gold grams per tonne, copper percentage), and lithological strata in 3D WebGL space.
* Core sample intervals color-coded by grade cutoff.

### 3. Interactive Cross-Sectional Elevation Slicing
* Geologists can draw a straight transect line `A ——— A'` across any geological structure.
* The system generates an instant 2D elevation profile and geological cross-section diagram showing topography, fault lines, and subsurface rock strata below ground.

---

## 🎯 Geological & Mining Value
1. **Structural Interpretation**: Identifies fault lines, anticlines, and synclines hidden in 2D top-down views.
2. **Drill Targeting**: Significantly improves precision of diamond core drilling campaigns by aligning drill azimuth and dip with 3D geological models.
