# Citations & Attribution Guide 📚🗺️

This document details all external map tile providers, GIS endpoints, geological data references, and open-source libraries utilized within **Geolify Web**, including direct URLs, license terms, and provider attributions.

---

## 🌍 1. Geospatial & Basemap Tile Services

### 🌌 Carto Dark Matter (Dark GIS Basemap)
* **Description**: Primary high-contrast dark basemap tailored for night operations, telemetry, and strike & dip structural visualization.
* **Provider**: CARTO & OpenStreetMap Contributors
* **Direct Style URL**: [https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json](https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json)
* **Homepage**: [https://carto.com/basemaps/](https://carto.com/basemaps/)
* **License & Attribution**: © [CARTO](https://carto.com/about-carto/), © [OpenStreetMap contributors](https://www.openstreetmap.org/copyright) (ODbL / CC BY 4.0).

---

### 🛰️ Esri World Imagery (High-Resolution Satellite Layer)
* **Description**: Global satellite and high-resolution aerial imagery used for field rock outcropping and surface exploration.
* **Provider**: Esri, Maxar, Earthstar Geographics, CNES/Airbus DS, USDA FSA, USGS, Aerogrid, IGN, IGP, and the GIS User Community
* **Direct Tile Endpoint**: [https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}](https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x})
* **ArcGIS Item**: [https://www.arcgis.com/home/item.html?id=10df2279f9684e4a9f6a7f08febac2a9](https://www.arcgis.com/home/item.html?id=10df2279f9684e4a9f6a7f08febac2a9)
* **Terms of Use**: [Esri Master License Agreement](https://www.esri.com/en-us/legal/terms/full-master-agreement)

---

### ⛰️ OpenTopoMap (Topography & Relief Layer)
* **Description**: Topographic contour lines, elevation intervals, and hillshading derived from OpenStreetMap and SRTM elevation models.
* **Provider**: OpenTopoMap Project
* **Direct Tile Endpoint**: [https://tile.opentopomap.org/{z}/{x}/{y}.png](https://tile.opentopomap.org/{z}/{x}/{y}.png)
* **Homepage**: [https://opentopomap.org/](https://opentopomap.org/)
* **License & Attribution**: Kartendaten: © [OpenStreetMap-Mitwirkende](https://www.openstreetmap.org/copyright), SRTM; Kartendarstellung: © [OpenTopoMap](https://opentopomap.org/) (CC-BY-SA).

---

### 🗺️ Carto Voyager (Geographic & Infrastructure Layer)
* **Description**: Detailed street grids, international administrative boundaries, and transportation corridors.
* **Provider**: CARTO & OpenStreetMap Contributors
* **Direct Style URL**: [https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json](https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json)
* **Homepage**: [https://carto.com/basemaps/](https://carto.com/basemaps/)
* **License & Attribution**: © [CARTO](https://carto.com/about-carto/), © [OpenStreetMap contributors](https://www.openstreetmap.org/copyright) (ODbL / CC BY 4.0).

---

### 🌐 MapLibre Demo Tiles
* **Description**: Lightweight vector demo basemap used for initial testing and local verification.
* **Provider**: MapLibre Community & OpenMapTiles
* **Direct Style URL**: [https://demotiles.maplibre.org/style.json](https://demotiles.maplibre.org/style.json)
* **Homepage**: [https://maplibre.org/](https://maplibre.org/)
* **License**: BSD-3-Clause / CC-BY

---

## ⛏️ 2. Geological Data & Regional Concession References

* **Carlin Trend Gold Province (Nevada, USA)**:
  * Reference Agency: [United States Geological Survey (USGS) Mineral Resources Program](https://www.usgs.gov/programs/mineral-resources-program) & [Nevada Bureau of Mines and Geology (NBMG)](https://nbmg.unr.edu/)
  * Coordinates: `40.83° N, 116.08° W`

* **Salar de Atacama Lithium Flats (Antofagasta, Chile)**:
  * Reference Agency: [Servicio Nacional de Geología y Minería de Chile (SERNAGEOMIN)](https://www.sernageomin.cl/)
  * Coordinates: `23.50° S, 68.35° W`

* **Pilbara Iron Ore Province (Western Australia)**:
  * Reference Agency: [Geological Survey of Western Australia (GSWA)](https://www.dmp.wa.gov.au/Geological-Survey/) / Department of Energy, Mines, Industry Regulation and Safety
  * Coordinates: `22.30° S, 118.80° E`

* **Athabasca Basin Uranium District (Saskatchewan, Canada)**:
  * Reference Agency: [Saskatchewan Geological Survey](https://www.saskatchewan.ca/business/agriculture-natural-resources-and-industry/mineral-resources) & [Natural Resources Canada (NRCan)](https://natural-resources.canada.ca/)
  * Coordinates: `58.00° N, 106.00° W`

* **Witwatersrand Basin Gold Deposit (South Africa)**:
  * Reference Agency: [Council for Geoscience (South Africa)](https://www.geoscience.org.za/)
  * Coordinates: `26.20° S, 28.04° E`

---

## 💻 3. Core Software Libraries & Open Source Tools

| Technology | Provider / Maintainer | Direct Link | License |
| :--- | :--- | :--- | :--- |
| **MapLibre GL JS** | MapLibre Organization | [https://github.com/maplibre/maplibre-gl-js](https://github.com/maplibre/maplibre-gl-js) | BSD 3-Clause |
| **Next.js 16** | Vercel Inc. | [https://nextjs.org/](https://nextjs.org/) | MIT |
| **React 19** | Meta Platforms Inc. | [https://react.dev/](https://react.dev/) | MIT |
| **Tailwind CSS v4** | Tailwind Labs | [https://tailwindcss.com/](https://tailwindcss.com/) | MIT |
| **ApexCharts** | ApexCharts.js | [https://apexcharts.com/](https://apexcharts.com/) | MIT |
| **Lucide Icons** | Lucide Community | [https://lucide.dev/](https://lucide.dev/) | ISC |
| **Geist Typography** | Vercel Inc. | [https://vercel.com/font](https://vercel.com/font) | SIL Open Font License |
| **Unsplash** | Unsplash Community (Avatars) | [https://unsplash.com/](https://unsplash.com/) | Unsplash License |

---

*Last Updated: August 2026 • Geolify Engineering Team*
