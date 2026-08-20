"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import type { StyleSpecification } from "maplibre-gl";

export type MapStyleType = "dark" | "satellite" | "terrain" | "voyager";

export interface MapStyleOption {
  id: MapStyleType;
  name: string;
  style: string | StyleSpecification;
  icon: string;
  description: string;
  maxZoom?: number;
}

// Open raster style configurations with zero API key requirement
const satelliteStyle: StyleSpecification = {
  version: 8,
  sources: {
    satellite: {
      type: "raster",
      tiles: [
        "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
      ],
      tileSize: 256,
      maxzoom: 19,
      attribution: "Esri, Maxar, Earthstar Geographics",
    },
  },
  layers: [
    {
      id: "satellite-layer",
      type: "raster",
      source: "satellite",
      minzoom: 0,
      maxzoom: 21,
    },
  ],
};

const terrainStyle: StyleSpecification = {
  version: 8,
  sources: {
    topo: {
      type: "raster",
      tiles: [
        "https://tile.opentopomap.org/{z}/{x}/{y}.png",
      ],
      tileSize: 256,
      maxzoom: 17,
      attribution: "OpenTopoMap, SRTM",
    },
  },
  layers: [
    {
      id: "topo-layer",
      type: "raster",
      source: "topo",
      minzoom: 0,
      maxzoom: 19,
    },
  ],
};

export const MAP_STYLES: Record<MapStyleType, MapStyleOption> = {
  dark: {
    id: "dark",
    name: "Dark GIS",
    style: "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json",
    icon: "🌌",
    description: "High-contrast telemetry & lithology mode",
    maxZoom: 22,
  },
  satellite: {
    id: "satellite",
    name: "Satellite",
    style: satelliteStyle,
    icon: "🛰️",
    description: "High-res earth & outcrop imagery",
    maxZoom: 20,
  },
  terrain: {
    id: "terrain",
    name: "Topography",
    style: terrainStyle,
    icon: "⛰️",
    description: "Elevation contours & relief shading",
    maxZoom: 18,
  },
  voyager: {
    id: "voyager",
    name: "Geographic",
    style: "https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json",
    icon: "🗺️",
    description: "Detailed infrastructure & borders",
    maxZoom: 22,
  },
};

interface MapThemeContextType {
  activeStyle: MapStyleType;
  setActiveStyle: (style: MapStyleType) => void;
  currentStyle: string | StyleSpecification;
}

const MapThemeContext = createContext<MapThemeContextType | null>(null);

export function MapThemeProvider({ children }: { children: React.ReactNode }) {
  const [activeStyle, setActiveStyle] = useState<MapStyleType>("dark");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("geolify_map_style") as MapStyleType;
      if (saved && MAP_STYLES[saved]) {
        setActiveStyle(saved);
      }
    } catch {
      // ignore localStorage errors
    }
  }, []);

  const handleSetStyle = (style: MapStyleType) => {
    setActiveStyle(style);
    try {
      if (typeof window !== "undefined") {
        localStorage.setItem("geolify_map_style", style);
      }
    } catch {
      // ignore localStorage errors
    }
  };

  return (
    <MapThemeContext.Provider
      value={{
        activeStyle,
        setActiveStyle: handleSetStyle,
        currentStyle: MAP_STYLES[activeStyle].style,
      }}
    >
      {children}
    </MapThemeContext.Provider>
  );
}

export function useMapTheme() {
  const context = useContext(MapThemeContext);
  if (!context) {
    throw new Error("useMapTheme must be used within a MapThemeProvider");
  }
  return context;
}
