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
    <div className="flex flex-col flex-1 p-6 space-y-6 min-h-full">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
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

      {/* Embedded Map Container */}
      <div className="flex-1 w-full min-h-[600px] flex flex-col">
        <MapRender
          key={selectedConcession.id}
          initialCenter={selectedConcession.center}
          initialZoom={selectedConcession.zoom}
          autoGeolocate={selectedConcession.id === "global"}
          className="flex-1 w-full min-h-[650px]"
        />
      </div>

      {/* Concession Info Bar */}
      <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/60 p-4 backdrop-blur-sm flex flex-wrap items-center justify-between gap-4">
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
