"use client";

import { useState } from "react";
import MapRender from "@/components/map-render";
import MapLayerSwitcher from "@/components/map/MapLayerSwitcher";
import MapLocationSearch, { SearchLocationResult } from "@/components/map/MapLocationSearch";
import { Compass } from "lucide-react";

/*
// =========================================================================
// CONCESSION PRESETS (Commented out for future backend integration)
// =========================================================================
interface ConcessionPreset {
  id: string;
  name: string;
  location: string;
  center: [number, number];
  zoom: number;
  mineral: string;
}

const concessions: ConcessionPreset[] = [
  {
    id: "global",
    name: "Global Home",
    location: "Worldwide Telemetry",
    center: [0, 20],
    zoom: 2.2,
    mineral: "All Minerals",
  },
  // Here we'll add the others i.e. concessions when we get the data from the backend
  // like most recent project and change it to dropdown list...
];
*/

const DEFAULT_CENTER: [number, number] = [0, 20];
const DEFAULT_ZOOM = 2.2;
const DEFAULT_LOCATION_NAME = "Global Telemetry View";

export default function MapPage() {
  const [mapCenter, setMapCenter] = useState<[number, number]>(DEFAULT_CENTER);
  const [mapZoom, setMapZoom] = useState<number>(DEFAULT_ZOOM);
  const [currentLocationName, setCurrentLocationName] = useState<string>(DEFAULT_LOCATION_NAME);
  const [searchMarker, setSearchMarker] = useState<{
    center: [number, number];
    label?: string;
  } | null>(null);

  const handleSelectLocation = (loc: SearchLocationResult) => {
    setMapCenter(loc.center);
    setMapZoom(loc.zoom);
    setCurrentLocationName(loc.name);
    setSearchMarker({ center: loc.center, label: loc.name });
  };

  const handleMapClick = (
    coords: [number, number],
    locationName?: string,
    targetZoom?: number
  ) => {
    const label = locationName || `${coords[1].toFixed(4)}°, ${coords[0].toFixed(4)}°`;
    setMapCenter(coords);
    if (targetZoom) {
      setMapZoom(targetZoom);
    }
    setCurrentLocationName(label);
    setSearchMarker({ center: coords, label });
  };

  const handleResetView = () => {
    setMapCenter(DEFAULT_CENTER);
    setMapZoom(DEFAULT_ZOOM);
    setCurrentLocationName(DEFAULT_LOCATION_NAME);
    setSearchMarker(null);
  };

  return (
    <div className="relative flex flex-col flex-1 h-[calc(100dvh-3.5rem)] md:h-auto md:min-h-full p-0 md:p-6 space-y-0 md:space-y-6 overflow-hidden md:overflow-visible">
      {/* ========================================================= */}
      {/* DESKTOP TOP HEADER (Visible only on Desktop: hidden md:flex) */}
      {/* ========================================================= */}
      <div className="hidden md:flex md:items-center justify-between gap-4 md:pl-10">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-100">
            Geological & Telemetry Map
          </h1>
          <p className="text-sm text-zinc-400">
            Interactive map exploration powered by MapLibre GL.
          </p>
        </div>

        {/* Location Search Bar & Layer Switcher */}
        <div className="flex flex-wrap items-center gap-3">
          <MapLocationSearch onSelectLocation={handleSelectLocation} />
          <MapLayerSwitcher />
        </div>
      </div>

      {/* ========================================================= */}
      {/* MOBILE FLOATING TOP CONTROLS (Hidden on Desktop: md:hidden) */}
      {/* ========================================================= */}
      <div className="md:hidden absolute top-3 left-3 right-3 z-30 flex items-center justify-between gap-2 pointer-events-none">
        <div className="pointer-events-auto flex-1 max-w-[240px]">
          <MapLocationSearch
            placeholder="Search location..."
            onSelectLocation={handleSelectLocation}
          />
        </div>

        {/* Layer Switcher */}
        <div className="pointer-events-auto shadow-xl shrink-0">
          <MapLayerSwitcher direction="down" align="right" />
        </div>
      </div>

      {/* ========================================================= */}
      {/* MAP VIEW CONTAINER (Full bleed on Mobile, Card on Desktop) */}
      {/* ========================================================= */}
      <div className="flex-1 w-full h-full md:min-h-[600px] flex flex-col relative overflow-hidden">
        <MapRender
          initialCenter={mapCenter}
          initialZoom={mapZoom}
          marker={searchMarker}
          onMapClick={handleMapClick}
          className="flex-1 w-full h-full rounded-none md:rounded-2xl border-0 md:border md:border-zinc-800"
        />
      </div>

      {/* ========================================================= */}
      {/* MOBILE FLOATING BOTTOM HUD (Hidden on Desktop) */}
      {/* ========================================================= */}
      <div className="md:hidden absolute bottom-3 left-3 right-3 z-30 flex items-center justify-between gap-2 pointer-events-none">
        <div className="pointer-events-auto flex-1 min-w-0 px-3 py-2 rounded-xl bg-zinc-950/90 border border-zinc-800/90 shadow-xl backdrop-blur-md flex items-center justify-between gap-2">
          <div className="min-w-0">
            <span className="text-[10px] text-zinc-400 block truncate">
              {mapCenter[1].toFixed(4)}°, {mapCenter[0].toFixed(4)}°
            </span>
            <span className="text-xs font-semibold text-zinc-200 block truncate">
              {currentLocationName}
            </span>
          </div>
          <span className="text-[10px] font-mono text-emerald-400 shrink-0 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
            Telemetry
          </span>
        </div>

        <button
          type="button"
          onClick={handleResetView}
          className="pointer-events-auto p-2.5 rounded-xl bg-zinc-950/90 border border-zinc-800/90 text-zinc-300 hover:text-white shadow-xl backdrop-blur-md shrink-0 active:scale-95 transition-transform"
          title="Reset View"
          aria-label="Reset View"
        >
          <Compass className="h-4 w-4 text-blue-400" />
        </button>
      </div>

      {/* ========================================================= */}
      {/* DESKTOP TELEMETRY STATUS BAR (Hidden on Mobile: hidden md:flex) */}
      {/* ========================================================= */}
      <div className="hidden md:flex rounded-2xl border border-zinc-800/80 bg-zinc-900/60 p-4 backdrop-blur-sm items-center justify-between gap-4">
        <div className="flex items-center gap-6">
          <div>
            <span className="text-[11px] text-zinc-500 uppercase tracking-wider block">
              Active Focus
            </span>
            <span className="text-sm font-semibold text-zinc-200">
              {currentLocationName}
            </span>
          </div>

          <div className="h-8 w-px bg-zinc-800" />

          <div>
            <span className="text-[11px] text-zinc-500 uppercase tracking-wider block">
              Coordinates
            </span>
            <span className="text-sm font-mono text-emerald-400">
              {mapCenter[1].toFixed(4)}° N, {mapCenter[0].toFixed(4)}° E
            </span>
          </div>

          <div className="h-8 w-px bg-zinc-800" />

          <div>
            <span className="text-[11px] text-zinc-500 uppercase tracking-wider block">
              Navigation Zoom
            </span>
            <span className="text-xs font-mono text-zinc-300">
              {mapZoom.toFixed(1)}x
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={handleResetView}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-zinc-800 bg-zinc-900 text-xs font-medium text-zinc-300 hover:text-white hover:border-zinc-700 transition-colors"
        >
          <Compass className="h-3.5 w-3.5 text-blue-400" />
          <span>Reset View</span>
        </button>
      </div>
    </div>
  );
}
