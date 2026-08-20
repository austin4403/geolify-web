"use client";

import React, {
  createContext,
  useContext,
  useRef,
  useState,
  useCallback,
  useEffect,
} from "react";
import type { Map as MapLibreMap } from "maplibre-gl";

export interface CameraOptions {
  center?: [number, number]; // [lng, lat]
  zoom?: number;
  pitch?: number;
  bearing?: number;
  duration?: number; // ms
  interactive?: boolean;
}

interface MapContextType {
  map: MapLibreMap | null;
  isMapReady: boolean;
  setMapInstance: (map: MapLibreMap | null) => void;
  flyTo: (options: CameraOptions) => void;
  activeLayer: "geology" | "satellite" | "terrain" | "dark";
  setActiveLayer: (layer: "geology" | "satellite" | "terrain" | "dark") => void;
}

const MapContext = createContext<MapContextType | null>(null);

export function MapProvider({ children }: { children: React.ReactNode }) {
  const [map, setMap] = useState<MapLibreMap | null>(null);
  const [isMapReady, setIsMapReady] = useState(false);
  const [activeLayer, setActiveLayer] = useState<"geology" | "satellite" | "terrain" | "dark">("dark");
  const mapRef = useRef<MapLibreMap | null>(null);

  const setMapInstance = useCallback((instance: MapLibreMap | null) => {
    mapRef.current = instance;
    setMap(instance);
    setIsMapReady(!!instance);
  }, []);

  const flyTo = useCallback((options: CameraOptions) => {
    const currentMap = mapRef.current;
    if (!currentMap) return;

    currentMap.flyTo({
      center: options.center,
      zoom: options.zoom,
      pitch: options.pitch ?? 0,
      bearing: options.bearing ?? 0,
      duration: options.duration ?? 2500,
      essential: true,
    });
  }, []);

  return (
    <MapContext.Provider
      value={{
        map,
        isMapReady,
        setMapInstance,
        flyTo,
        activeLayer,
        setActiveLayer,
      }}
    >
      {children}
    </MapContext.Provider>
  );
}

export function useMap() {
  const context = useContext(MapContext);
  if (!context) {
    throw new Error("useMap must be used within a MapProvider");
  }
  return context;
}

/**
 * Declarative hook for pages to control camera upon mounting or state change
 */
export function useMapCamera(options: CameraOptions, deps: React.DependencyList = []) {
  const { flyTo, isMapReady, map } = useMap();

  useEffect(() => {
    if (!isMapReady || !map) return;

    if (options.center || options.zoom !== undefined) {
      flyTo(options);
    }

    if (options.interactive !== undefined) {
      if (options.interactive) {
        map.scrollZoom.enable();
        map.boxZoom.enable();
        map.dragPan.enable();
        map.dragRotate.enable();
        map.keyboard.enable();
        map.doubleClickZoom.enable();
        map.touchZoomRotate.enable();
      } else {
        map.scrollZoom.disable();
        map.boxZoom.disable();
        map.dragPan.disable();
        map.dragRotate.disable();
        map.keyboard.disable();
        map.doubleClickZoom.disable();
        map.touchZoomRotate.disable();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMapReady, ...deps]);
}
