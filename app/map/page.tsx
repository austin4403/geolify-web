"use client";

import { useState } from "react";
import MapRender from "@/components/map-render";
import MapLayerSwitcher from "@/components/map/MapLayerSwitcher";
import { MapPin, Compass } from "lucide-react";

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
  //Here we'll add the others i.e. concessions when we get the data from the backend like most recent project and change it to dropdown list...
];

export default function MapPage() {
  const [selectedConcession, setSelectedConcession] = useState<ConcessionPreset>(concessions[0]);

  return (
    <div className="relative flex flex-col flex-1 h-[calc(100dvh-3.5rem)] md:h-auto md:min-h-full p-0 md:p-6 space-y-0 md:space-y-6 overflow-hidden md:overflow-visible">
      {/* ========================================================= */}
      {/* DESKTOP TOP HEADER (Visible only on Desktop: hidden md:flex) */}
      {/* ========================================================= */}
      <div className="hidden md:flex md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-100">
            Geological & Telemetry Map
          </h1>
          <p className="text-sm text-zinc-400">
            Interactive map exploration powered by MapLibre GL.
          </p>
        </div>

        {/* Quick Concession Buttons & Layer Switcher */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex flex-wrap items-center gap-2 rounded-2xl border border-zinc-800/80 bg-zinc-900/80 p-1.5 backdrop-blur-md shadow-xl">
            {concessions.map((item) => (
              <button
                key={item.id}
                onClick={() => setSelectedConcession(item)}
                type="button"
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                  selectedConcession.id === item.id
                    ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                    : "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800"
                }`}
              >
                <MapPin className="h-3.5 w-3.5" />
                <span>{item.name}</span>
              </button>
            ))}
          </div>

          <MapLayerSwitcher />
        </div>
      </div>

      {/* ========================================================= */}
      {/* MOBILE FLOATING TOP CONTROLS (Hidden on Desktop: md:hidden) */}
      {/* ========================================================= */}
      <div className="md:hidden absolute top-3 left-3 right-3 z-30 flex items-center justify-between gap-2 pointer-events-none">
        {/* Active Concession Pill */}
        <div className="pointer-events-auto flex items-center gap-2 px-3 py-1.5 rounded-xl bg-zinc-950/90 border border-zinc-800/90 shadow-xl backdrop-blur-md text-xs font-semibold text-zinc-200">
          <MapPin className="h-3.5 w-3.5 text-blue-400 shrink-0" />
          <span className="truncate">{selectedConcession.name}</span>
          <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
            {selectedConcession.mineral}
          </span>
        </div>

        {/* Layer Switcher */}
        <div className="pointer-events-auto shrink-0 shadow-xl">
          <MapLayerSwitcher direction="down" align="right" />
        </div>
      </div>

      {/* ========================================================= */}
      {/* MAP VIEW CONTAINER (Full bleed on Mobile, Card on Desktop) */}
      {/* ========================================================= */}
      <div className="flex-1 w-full h-full md:min-h-[600px] flex flex-col relative overflow-hidden">
        <MapRender
          key={selectedConcession.id}
          initialCenter={selectedConcession.center}
          initialZoom={selectedConcession.zoom}
          autoGeolocate={selectedConcession.id === "global"}
          className="flex-1 w-full h-full rounded-none md:rounded-2xl border-0 md:border md:border-zinc-800"
        />
      </div>

      {/* ========================================================= */}
      {/* MOBILE FLOATING BOTTOM HUD (Hidden on Desktop: md:hidden) */}
      {/* ========================================================= */}
      <div className="md:hidden absolute bottom-3 left-3 right-3 z-30 flex items-center justify-between gap-2 pointer-events-none">
        <div className="pointer-events-auto flex-1 min-w-0 px-3 py-2 rounded-xl bg-zinc-950/90 border border-zinc-800/90 shadow-xl backdrop-blur-md flex items-center justify-between gap-2">
          <div className="min-w-0">
            <span className="text-[10px] text-zinc-400 block truncate">
              {selectedConcession.location}
            </span>
            <span className="text-xs font-semibold text-zinc-200 block truncate">
              Focus: {selectedConcession.name}
            </span>
          </div>
          <span className="text-[10px] font-mono text-emerald-400 shrink-0 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
            Active
          </span>
        </div>

        <button
          type="button"
          onClick={() => setSelectedConcession(concessions[0])}
          className="pointer-events-auto p-2.5 rounded-xl bg-zinc-950/90 border border-zinc-800/90 text-zinc-300 hover:text-white shadow-xl backdrop-blur-md shrink-0 active:scale-95 transition-transform"
          title="Reset View"
          aria-label="Reset View"
        >
          <Compass className="h-4 w-4 text-blue-400" />
        </button>
      </div>

      {/* ========================================================= */}
      {/* DESKTOP CONCESSION INFO BAR (Hidden on Mobile: hidden md:flex) */}
      {/* ========================================================= */}
      <div className="hidden md:flex rounded-2xl border border-zinc-800/80 bg-zinc-900/60 p-4 backdrop-blur-sm items-center justify-between gap-4">
        <div className="flex items-center gap-6">
          <div>
            <span className="text-[11px] text-zinc-500 uppercase tracking-wider block">
              Active Focus
            </span>
            <span className="text-sm font-semibold text-zinc-200">
              {selectedConcession.name}
            </span>
          </div>

          <div className="h-8 w-px bg-zinc-800" />

          <div>
            <span className="text-[11px] text-zinc-500 uppercase tracking-wider block">
              Target Lithology
            </span>
            <span className="text-sm font-semibold text-emerald-400">
              {selectedConcession.mineral}
            </span>
          </div>

          <div className="h-8 w-px bg-zinc-800" />

          <div>
            <span className="text-[11px] text-zinc-500 uppercase tracking-wider block">
              Concession Region
            </span>
            <span className="text-xs font-medium text-zinc-300">
              {selectedConcession.location}
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setSelectedConcession(concessions[0])}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-zinc-800 bg-zinc-900 text-xs font-medium text-zinc-300 hover:text-white hover:border-zinc-700 transition-colors"
        >
          <Compass className="h-3.5 w-3.5" />
          <span>Reset View</span>
        </button>
      </div>
    </div>
  );
}
