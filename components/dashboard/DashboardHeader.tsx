"use client";

import { useState } from "react";
import { Search, Bell, Download, Plus, ChevronDown } from "lucide-react";

export default function DashboardHeader() {
  const [notifications] = useState(3);

  return (
    <header className="sticky top-0 z-20 flex w-full items-center justify-between border-b border-zinc-800/80 bg-zinc-950/90 px-4 py-3 sm:px-6 sm:py-4 md:pl-16 backdrop-blur-md gap-3 sm:gap-4">
      {/* Search Input */}
      <div className="flex items-center gap-4 flex-1 max-w-md min-w-0">
        <div className="relative w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
          <input
            type="text"
            placeholder="Search surveys, minerals, telemetry..."
            className="w-full rounded-xl border border-zinc-800 bg-zinc-900/90 py-1.5 sm:py-2 pl-10 pr-10 sm:pr-12 text-xs sm:text-sm text-zinc-100 placeholder:text-zinc-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
          />
          <kbd className="hidden sm:inline-block absolute right-3 top-1/2 -translate-y-1/2 rounded bg-zinc-800 px-1.5 py-0.5 text-[10px] font-medium text-zinc-400 border border-zinc-700">
            ⌘K
          </kbd>
        </div>
      </div>

      {/* Right Controls & Profile */}
      <div className="flex items-center gap-3">
        {/* Live Status Pill */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 text-emerald-400 text-xs font-medium">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Telemetry Active</span>
        </div>

        {/* Quick Action Button */}
        <button
          type="button"
          className="hidden md:inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium shadow-md shadow-blue-600/20 transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>New Survey</span>
        </button>

        {/* Export Data */}
        <button
          type="button"
          className="p-2 rounded-xl border border-zinc-800 bg-zinc-900 text-zinc-400 hover:text-zinc-100 hover:border-zinc-700 transition-colors"
          title="Export CSV / PDF"
        >
          <Download className="h-4 w-4" />
        </button>

        {/* Notifications */}
        <button
          type="button"
          className="relative p-2 rounded-xl border border-zinc-800 bg-zinc-900 text-zinc-400 hover:text-zinc-100 hover:border-zinc-700 transition-colors"
          title="Notifications"
        >
          <Bell className="h-4 w-4" />
          {notifications > 0 && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-blue-600 text-[9px] font-bold text-white ring-2 ring-zinc-950">
              {notifications}
            </span>
          )}
        </button>

        {/* Separator */}
        <div className="h-6 w-px bg-zinc-800 mx-1" />

        {/* Header Profile Dropdown */}
        <button
          type="button"
          className="flex items-center gap-2.5 p-1 rounded-xl hover:bg-zinc-900 transition-colors"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt="John Doe"
            className="h-8 w-8 rounded-lg object-cover ring-1 ring-zinc-700"
          />
          <div className="hidden lg:flex flex-col text-left">
            <span className="text-xs font-semibold text-zinc-200">John Doe</span>
            <span className="text-[10px] text-zinc-500">Lead Geologist</span>
          </div>
          <ChevronDown className="hidden lg:block h-3.5 w-3.5 text-zinc-500" />
        </button>
      </div>
    </header>
  );
}
