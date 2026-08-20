"use client";

import { useEffect, useRef, useState } from "react";
import type { Map as MapLibreMap, StyleSpecification } from "maplibre-gl";
import { useMapTheme } from "@/context/MapThemeContext";

interface MapRenderProps {
  initialCenter?: [number, number]; // [lng, lat]
  initialZoom?: number;
  className?: string;
  styleOverride?: string | StyleSpecification;
  autoGeolocate?: boolean; // Requests device GPS and flies to user location
}

export default function MapRender({
  initialCenter = [0, 20],
  initialZoom = 2.2,
  className = "w-full h-full min-h-[500px]",
  styleOverride,
  autoGeolocate = false,
}: MapRenderProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<MapLibreMap | null>(null);
  const [loaded, setLoaded] = useState(false);
  const { currentStyle } = useMapTheme();

  const effectiveStyle = styleOverride || currentStyle;

  // 1. Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;
    let isCancelled = false;

    import("maplibre-gl").then((maplibregl) => {
      if (isCancelled || !mapContainerRef.current) return;

      if (maplibregl.config) {
        maplibregl.config.WORKER_URL = "/maplibre-gl-worker.mjs";
      }

      const MapClass = maplibregl.Map;
      const NavigationControlClass = maplibregl.NavigationControl;
      const ScaleControlClass = maplibregl.ScaleControl;
      const GeolocateControlClass = maplibregl.GeolocateControl;

      if (!MapClass) return;

      const map = new MapClass({
        container: mapContainerRef.current,
        style: effectiveStyle,
        center: initialCenter,
        zoom: initialZoom,
        attributionControl: false,
      });

      // Top-right: Navigation (Pitch, Zoom, Bearing)
      if (NavigationControlClass) {
        map.addControl(
          new NavigationControlClass({ visualizePitch: true }),
          "top-right"
        );
      }

      // Bottom-left: Scale bar
      if (ScaleControlClass) {
        map.addControl(new ScaleControlClass(), "bottom-left");
      }

      // Bottom-right: GPS Crosshairs / Device Location Tracker
      let geolocateControl: InstanceType<typeof maplibregl.GeolocateControl> | null = null;
      if (GeolocateControlClass) {
        geolocateControl = new GeolocateControlClass({
          positionOptions: {
            enableHighAccuracy: true,
          },
          trackUserLocation: true,
          showUserLocation: true,
          showAccuracyCircle: true,
        });
        map.addControl(geolocateControl, "bottom-right");
      }

      const handleReady = () => {
        if (!isCancelled) {
          map.resize();
          setLoaded(true);

          if (autoGeolocate && geolocateControl) {
            try {
              geolocateControl.trigger();
            } catch {
              // ignore geolocation permission rejections
            }
          }
        }
      };

      map.on("load", handleReady);
      map.on("render", () => {
        if (!isCancelled && !loaded) {
          setLoaded(true);
        }
      });

      // Safety timeout for tile readiness
      const timer = setTimeout(() => {
        if (!isCancelled) {
          map.resize();
          setLoaded(true);
        }
      }, 1000);

      mapInstanceRef.current = map;

      return () => {
        clearTimeout(timer);
      };
    });

    return () => {
      isCancelled = true;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialCenter, initialZoom, autoGeolocate]);

  // 2. React to dynamic global basemap style changes
  useEffect(() => {
    if (mapInstanceRef.current && effectiveStyle) {
      try {
        mapInstanceRef.current.setStyle(effectiveStyle);
      } catch (err) {
        console.warn("Map style switch error:", err);
      }
    }
  }, [effectiveStyle]);

  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 ${className}`}
    >
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-zinc-950/80 z-10">
          <div className="flex flex-col items-center gap-3">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-blue-500 border-t-transparent" />
            <span className="text-xs text-zinc-400 font-mono">
              Initializing MapLibre Engine...
            </span>
          </div>
        </div>
      )}
      <div ref={mapContainerRef} className="w-full h-full" />
    </div>
  );
}
