"use client";

import { useState, useRef, useEffect } from "react";
import { Layers, Check } from "lucide-react";
import { useMapTheme, MAP_STYLES, MapStyleType } from "@/context/MapThemeContext";

interface MapLayerSwitcherProps {
  direction?: "up" | "down";
  align?: "left" | "right";
}

export default function MapLayerSwitcher({
  direction = "down",
  align = "right",
}: MapLayerSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { activeStyle, setActiveStyle } = useMapTheme();
  const menuRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={menuRef} className="relative inline-block z-40">
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border border-zinc-800 bg-zinc-900/90 hover:bg-zinc-800 text-zinc-200 text-xs font-medium backdrop-blur-md shadow-lg transition-all"
        title="Switch Map Layer"
      >
        <Layers className="h-3.5 w-3.5 text-blue-400" />
        <span>{MAP_STYLES[activeStyle].name}</span>
      </button>

      {/* Layer Options Dropdown Modal */}
      {isOpen && (
        <div
          className={`absolute w-64 p-2 rounded-2xl border border-zinc-800 bg-zinc-950/95 backdrop-blur-xl shadow-2xl space-y-1 z-50 animate-in fade-in zoom-in-95 duration-150 ${
            align === "right" ? "right-0" : "left-0"
          } ${direction === "down" ? "top-full mt-2" : "bottom-full mb-2"}`}
        >
          <div className="px-2 py-1.5 border-b border-zinc-800/80 mb-1">
            <span className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider block">
              Basemap Layer
            </span>
          </div>

          {(Object.keys(MAP_STYLES) as MapStyleType[]).map((key) => {
            const item = MAP_STYLES[key];
            const isSelected = activeStyle === key;

            return (
              <button
                key={key}
                type="button"
                onClick={() => {
                  setActiveStyle(key);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center justify-between p-2 rounded-xl text-left transition-all ${
                  isSelected
                    ? "bg-blue-600/20 text-white border border-blue-500/40"
                    : "text-zinc-300 hover:text-white hover:bg-zinc-900 border border-transparent"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-lg leading-none">{item.icon}</span>
                  <div>
                    <span className="text-xs font-medium block">
                      {item.name}
                    </span>
                    <span className="text-[10px] text-zinc-500 block">
                      {item.description}
                    </span>
                  </div>
                </div>

                {isSelected && (
                  <Check className="h-4 w-4 text-blue-400 shrink-0" />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
