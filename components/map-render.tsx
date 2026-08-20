"use client";

import { useEffect, useRef, useState } from "react";
import type { Map as MapLibreMap, StyleSpecification } from "maplibre-gl";
import { useMapTheme, MAP_STYLES } from "@/context/MapThemeContext";

interface MapRenderProps {
  initialCenter?: [number, number]; // [lng, lat]
  initialZoom?: number;
  className?: string;
  styleOverride?: string | StyleSpecification;
  marker?: { center: [number, number]; label?: string } | null;
  onMapClick?: (coords: [number, number], locationName?: string, targetZoom?: number) => void;
}

export default function MapRender({
  initialCenter = [0, 20],
  initialZoom = 2.2,
  className = "w-full h-full min-h-[500px]",
  styleOverride,
  marker = null,
  onMapClick,
}: MapRenderProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<MapLibreMap | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const markerInstanceRef = useRef<any>(null);
  const onMapClickRef = useRef(onMapClick);
  onMapClickRef.current = onMapClick;

  const [loaded, setLoaded] = useState(false);
  const { currentStyle, activeStyle } = useMapTheme();

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

      const maxZoomLimit = MAP_STYLES[activeStyle]?.maxZoom ?? 22;

      const map = new MapClass({
        container: mapContainerRef.current,
        style: effectiveStyle,
        center: initialCenter,
        zoom: initialZoom,
        maxZoom: maxZoomLimit,
        attributionControl: false,
      });

      // Top-right: Navigation (Compass & Pitch only)
      if (NavigationControlClass) {
        map.addControl(
          new NavigationControlClass({
            showZoom: false,
            showCompass: true,
            visualizePitch: true,
          }),
          "top-right"
        );
      }

      // Bottom-left: Scale bar
      if (ScaleControlClass) {
        map.addControl(new ScaleControlClass(), "bottom-left");
      }

      // Bottom-right: GPS Crosshairs / Device Location Tracker (manual click by user)
      if (GeolocateControlClass) {
        const geolocateControl = new GeolocateControlClass({
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
        }
      };

      map.on("click", async (e) => {
        if (!onMapClickRef.current) return;
        const lng = Number(e.lngLat.lng.toFixed(5));
        const lat = Number(e.lngLat.lat.toFixed(5));
        const coords: [number, number] = [lng, lat];
        const defaultName = `${lat.toFixed(4)}°, ${lng.toFixed(4)}°`;

        // 1. Immediately set focus coordinates (without modifying zoom)
        onMapClickRef.current(coords, defaultName);

        // 2. Fetch reverse geocoded place metadata
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=14`
          );
          if (res.ok) {
            const data = await res.json();
            if (data && data.display_name) {
              const placeTitle =
                data.name ||
                data.address?.suburb ||
                data.address?.city ||
                data.address?.town ||
                data.address?.county ||
                data.address?.country ||
                data.display_name.split(",")[0];

              const addressType = (data.addresstype || data.type || "").toLowerCase();
              const isCountry =
                addressType === "country" || data.address?.country === data.name;
              const isCountyOrRegion =
                addressType === "county" ||
                addressType === "state" ||
                addressType === "province" ||
                addressType === "region";
              const isCityOrTown =
                addressType === "city" ||
                addressType === "town" ||
                addressType === "municipality";

              // Determine target zoom ONLY if an administrative region was clicked
              let targetZoom: number | undefined = undefined;
              if (isCountry) {
                targetZoom = 5;
              } else if (isCountyOrRegion) {
                targetZoom = 8.5;
              } else if (isCityOrTown) {
                targetZoom = 11.5;
              }

              // If bounding box is available for the country/county/city, fit camera
              if (targetZoom && data.boundingbox && data.boundingbox.length === 4) {
                const minLat = parseFloat(data.boundingbox[0]);
                const maxLat = parseFloat(data.boundingbox[1]);
                const minLon = parseFloat(data.boundingbox[2]);
                const maxLon = parseFloat(data.boundingbox[3]);
                try {
                  map.fitBounds(
                    [
                      [minLon, minLat],
                      [maxLon, maxLat],
                    ],
                    {
                      padding: 48,
                      duration: 1100,
                      essential: true,
                    }
                  );
                } catch {
                  map.flyTo({ center: coords, zoom: targetZoom, essential: true });
                }
              } else if (targetZoom) {
                map.flyTo({ center: coords, zoom: targetZoom, essential: true });
              }

              onMapClickRef.current(coords, placeTitle, targetZoom);
            }
          }
        } catch {
          // keep default coordinate name without zoom change
        }
      });

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
  }, []);

  // 2. Smoothly fly to center/zoom if updated
  useEffect(() => {
    if (mapInstanceRef.current && loaded && initialCenter) {
      mapInstanceRef.current.flyTo({
        center: initialCenter,
        zoom: initialZoom,
        essential: true,
      });
    }
  }, [initialCenter?.[0], initialCenter?.[1], initialZoom, loaded]);

  // 3. Render / Update High-Visibility Red Pin & Location Label
  useEffect(() => {
    if (!mapInstanceRef.current || !loaded) return;

    if (markerInstanceRef.current) {
      markerInstanceRef.current.remove();
      markerInstanceRef.current = null;
    }

    if (!marker || !marker.center) return;

    import("maplibre-gl").then((maplibregl) => {
      if (!mapInstanceRef.current) return;
      const MarkerClass = maplibregl.Marker;
      if (!MarkerClass) return;

      // Custom container for red pin and high-contrast red label
      const el = document.createElement("div");
      el.className = "flex flex-col items-center pointer-events-auto cursor-pointer select-none group z-30";
      el.style.transform = "translate(0, -100%)";

      // 1. Red Location Name Badge
      if (marker.label) {
        const labelPill = document.createElement("div");
        labelPill.className =
          "px-3 py-1 mb-1 rounded-full bg-red-600 text-white font-bold text-xs shadow-xl shadow-red-600/50 border border-red-300/80 flex items-center gap-1.5 whitespace-nowrap animate-bounce";
        labelPill.innerHTML = `
          <svg class="w-3.5 h-3.5 text-white shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"/>
          </svg>
          <span class="tracking-wide">${marker.label}</span>
        `;
        el.appendChild(labelPill);
      }

      // 2. High-Visibility Pulsing Red Target Pin
      const pinWrapper = document.createElement("div");
      pinWrapper.className = "relative flex items-center justify-center w-6 h-6";
      pinWrapper.innerHTML = `
        <span class="absolute w-6 h-6 rounded-full bg-red-500/60 animate-ping"></span>
        <span class="relative w-4 h-4 rounded-full bg-red-600 border-2 border-white shadow-lg shadow-red-900"></span>
      `;
      el.appendChild(pinWrapper);

      const newMarker = new MarkerClass({ element: el, anchor: "bottom" })
        .setLngLat(marker.center)
        .addTo(mapInstanceRef.current);

      markerInstanceRef.current = newMarker;
    });

    return () => {
      if (markerInstanceRef.current) {
        markerInstanceRef.current.remove();
        markerInstanceRef.current = null;
      }
    };
  }, [marker?.center?.[0], marker?.center?.[1], marker?.label, loaded]);

  // 4. React to dynamic global basemap style changes
  useEffect(() => {
    if (mapInstanceRef.current && effectiveStyle) {
      try {
        mapInstanceRef.current.setStyle(effectiveStyle);
        const limit = MAP_STYLES[activeStyle]?.maxZoom ?? 22;
        mapInstanceRef.current.setMaxZoom(limit);
        if (mapInstanceRef.current.getZoom() > limit) {
          mapInstanceRef.current.setZoom(limit);
        }
      } catch (err) {
        console.warn("Map style switch error:", err);
      }
    }
  }, [effectiveStyle, activeStyle]);

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
