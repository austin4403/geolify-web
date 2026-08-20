"use client";

import { FileText, Download, Share2, CheckCircle2, MapPin } from "lucide-react";
import MapRender from "@/components/map-render";
import MapLayerSwitcher from "@/components/map/MapLayerSwitcher";

export default function ReportPage() {
  return (
    <div className="flex flex-col flex-1 p-4 sm:p-6 space-y-4 sm:space-y-6 max-w-5xl mx-auto w-full min-h-full pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-100">
            Geological Field Report
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400">
            Concession: Carlin Trend Gold Complex (NV-8901)
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl border border-zinc-800 bg-zinc-900/80 hover:bg-zinc-800 text-zinc-200 text-xs font-medium backdrop-blur-md transition-colors"
          >
            <Share2 className="h-3.5 w-3.5 text-zinc-400" />
            <span>Share Report</span>
          </button>

          <button
            type="button"
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium shadow-md shadow-blue-600/20 transition-colors"
          >
            <Download className="h-3.5 w-3.5" />
            <span>Export PDF</span>
          </button>
        </div>
      </div>

      {/* Embedded Project Geological Map Preview */}
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-amber-400" />
            <span className="text-xs font-semibold text-zinc-200">
              Survey Area Location & Traverse
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[11px] font-mono text-zinc-400 hidden sm:inline">
              40.83° N, 116.08° W
            </span>
            <MapLayerSwitcher />
          </div>
        </div>
        <MapRender
          initialCenter={[-116.08, 40.83]}
          initialZoom={10}
          className="w-full h-[200px] sm:h-[280px]"
        />
      </div>

      {/* Main Report Card */}
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4 sm:p-6 shadow-xl space-y-4 sm:space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-zinc-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-blue-600/10 border border-blue-500/20 text-blue-400 shrink-0">
              <FileText className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-semibold text-zinc-100">
                Lithology & Spectrometry Assessment
              </h2>
              <span className="text-[11px] sm:text-xs text-zinc-500 font-mono">
                Report ID: REP-2026-0819-NV • Verified by QA
              </span>
            </div>
          </div>
          <span className="self-start sm:self-auto inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <CheckCircle2 className="h-3.5 w-3.5" />
            Status: Certified
          </span>
        </div>

        {/* Report Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          <div className="p-3.5 sm:p-4 rounded-xl border border-zinc-800 bg-zinc-950/60">
            <span className="text-xs text-zinc-400">Primary Mineral Deposit</span>
            <p className="text-base sm:text-lg font-bold text-amber-400 mt-1">Au (Gold) ~ 4.2 g/t</p>
          </div>
          <div className="p-3.5 sm:p-4 rounded-xl border border-zinc-800 bg-zinc-950/60">
            <span className="text-xs text-zinc-400">Total Core Depth Sampled</span>
            <p className="text-base sm:text-lg font-bold text-zinc-100 mt-1">1,480 meters</p>
          </div>
          <div className="p-3.5 sm:p-4 rounded-xl border border-zinc-800 bg-zinc-950/60">
            <span className="text-xs text-zinc-400">Est. Deposit Valuation</span>
            <p className="text-base sm:text-lg font-bold text-emerald-400 mt-1">$2,450,000</p>
          </div>
        </div>

        {/* Geological Summary */}
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-zinc-200">
            Executive Summary & Stratigraphic Observations
          </h3>
          <p className="text-xs leading-relaxed text-zinc-400">
            Subsurface seismic refraction profiling and drill core assays confirm high-grade disseminated gold mineralization hosted along the structural contact between silty carbonate rocks and Roberts Mountains Formation thrust faulting. Telemetry sensors indicate stable hydrothermal fluid conductivity.
          </p>
        </div>
      </div>
    </div>
  );
}
