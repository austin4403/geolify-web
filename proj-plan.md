# Geolify Web 🌍⚡

> **Where Geology Meets Technology and Opportunity Meets Reality**

Geolify is an advanced geospatial intelligence platform designed for field geologists, mineral exploration teams, and earth scientists. It seamlessly bridges mobile field data acquisition (using smartphone GPS, compass, and orientation sensors) with interactive web GIS modeling and concession management.

---

## 🧭 Project Scope & Architecture

### 1. Mobile Field Sensor Integration
Field teams collect geological observations directly on their smartphones:
* **High-Accuracy GPS & Elevation**: Coordinates, waypoints, track traverses, and field elevation logs.
* **Structural Orientation Sensors (Compass / Magnetometer / Accelerometer)**:
  * **Strike & Dip**: Bedding, foliation, cleavage, and joint orientations.
  * **Trend & Plunge**: Lineations, fold axes, and fault slickensides.
* **Telemetry & Field Station Records**: Station numbers, lithological descriptions, rock classifications, assay sample IDs, and on-site photos.

---

### 2. Project-Centric Map Engine
Rather than a single static map, **each geological Project has its own dedicated, embedded MapLibre GL instance** rendering client-side geospatial vector layers:

```
┌─────────────────────────────────────────────────────────────┐
│                    Project Map Canvas                       │
├─────────────────────────────────────────────────────────────┤
│  ⬡ Polygons : Concession boundaries, lithology rock units,  │
│               alteration halos, mineral deposit zones       │
│                                                             │
│  〰 Lines    : Structural fault traces, geological contacts, │
│               seismic survey lines, drill traverses         │
│                                                             │
│  📍 Points   : Sample waypoints, core drill collars, active │
│               telemetry stations, strike & dip needles      │
└─────────────────────────────────────────────────────────────┘
```

* **Client-Side Rendering**: 100% rendered on the user's browser GPU via WebGL, keeping server overhead at zero and maintaining 60 FPS performance.
* **Carto Dark Matter GIS Theme**: Obsidian base (`#09090b`), dark oceans, and neon/cyan/emerald telemetry overlays tailored for high-contrast geological visualization.

---

## 🎨 Design System & Color Tokens

Geolify utilizes a curated, state-of-the-art dark theme configured directly in `app/globals.css`:

* **Base Surface (`Zinc 950`)**: `#09090b` (Deep obsidian slate, elevated cards, and subtle borders).
* **Brand Primary (`Blue`)**: `#2563eb` / `#3b82f6` (Active navigation states, interactive buttons, and primary telemetry).
* **Geology & Status Accent (`Emerald Green`)**: `#10b981` / `#34d399` (Live telemetry beacons, certification badges, and yield metrics).

---

## 📂 Project Structure

```bash
geolify-web/
├── app/
│   ├── layout.tsx            # Global layout with persistent Sidebar & viewport constraints
│   ├── globals.css           # Tailwind v4 theme tokens, MapLibre CSS, & dark scroll styles
│   ├── page.tsx              # Executive Geological Dashboard (Charts, KPIs, Surveys)
│   ├── map/                  # Full-screen interactive Geological GIS explorer
│   │   └── page.tsx
│   ├── report/               # Field reports, assay logs, and certification docs
│   │   └── page.tsx
│   ├── about/                # Company & platform information
│   │   └── page.tsx
│   └── contact/              # Contact & support
│       └── page.tsx
├── components/
│   ├── Sidebar.tsx           # Collapsible navigation sidebar with active route detection
│   ├── map-render.tsx        # Reusable client-side MapLibre GL map component
│   ├── dashboard/            # Dashboard widgets
│   │   ├── DashboardHeader.tsx
│   │   ├── MetricsCards.tsx
│   │   ├── MonthlyActivityChart.tsx
│   │   ├── MonthlyTargetChart.tsx
│   │   ├── ExplorationTrendsChart.tsx
│   │   ├── GlobalSitesCard.tsx
│   │   └── RecentSurveysTable.tsx
│   └── icons/
│       └── GeolifyLogo.tsx   # Custom SVG emblem (Hammer + Microscope + Open Book)
└── context/
    └── MapContext.tsx        # Camera controller & persistent GIS state management
```

---

## 📊 Structural Geology Data Model Preview

```typescript
// Sample Structural Station Observation from Phone Sensors
interface GeologicalStation {
  id: string;
  projectId: string;
  stationNumber: string;
  coordinates: [number, number]; // [longitude, latitude]
  elevation: number;            // meters
  timestamp: string;
  
  // Orientation Measurements (Phone Compass & Inclinometer)
  structure: {
    type: "bedding" | "foliation" | "fault_plane" | "joint";
    strike: number;             // 0° - 360°
    dip: number;                // 0° - 90°
    dipDirection: "N" | "NE" | "E" | "SE" | "S" | "SW" | "W" | "NW";
  };
  
  // Lithology & Sample Data
  lithology: {
    rockType: string;           // e.g., "Silty Carbonate", "Banded Iron Formation"
    formation: string;          // e.g., "Roberts Mountains Formation"
    sampleId?: string;          // e.g., "ASSAY-8901-A"
    mineralizationNotes?: string;
  };
}
```

---

## 🚀 Getting Started

### Prerequisites
* **Node.js**: 18.18+ or 20+
* **npm** / **pnpm** / **yarn**

### Installation

1. **Clone the repository and install dependencies**:
   ```bash
   git clone https://github.com/geolify/geolify-web.git
   cd geolify-web
   npm install
   ```

2. **Run the local development server**:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
npm run build
npm run start
```

---

## 🛠️ Technology Stack

* **Framework**: [Next.js 16 (App Router)](https://nextjs.org/) + [React 19](https://react.dev/)
* **Language**: [TypeScript](https://www.typescriptlang.org/)
* **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
* **Mapping & GIS**: [MapLibre GL](https://maplibre.org/)
* **Analytics & Charts**: [ApexCharts](https://apexcharts.com/) + [React-ApexCharts](https://github.com/apexcharts/react-apexcharts)
* **Icons**: [Lucide React](https://lucide.dev/)

---

## 📚 Citations & Attributions

For detailed documentation, direct URLs, tile endpoints, and license attributions for all external basemap services (CARTO, Esri World Imagery, OpenTopoMap) and geological reference data, see [CITATIONS.md](CITATIONS.md).

---

© 2026 Geolify Inc. All rights reserved.
