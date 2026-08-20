"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Search, MapPin, Loader2, X } from "lucide-react";
import { resolvePlusCode } from "@/lib/plus-codes";

export interface SearchLocationResult {
  id: string | number;
  name: string;
  subtext?: string;
  center: [number, number]; // [lng, lat]
  zoom: number;
  categoryBadge?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  boundaryGeojson?: any;
  bbox?: [number, number, number, number]; // [minLng, minLat, maxLng, maxLat]
}

interface MapLocationSearchProps {
  onSelectLocation: (loc: SearchLocationResult) => void;
  placeholder?: string;
  className?: string;
}

export default function MapLocationSearch({
  onSelectLocation,
  placeholder = "Search location, city, coordinate...",
  className = "",
}: MapLocationSearchProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchLocationResult[]>([]);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Search places with intelligent administrative ranking & Plus Code support
  const performSearch = useCallback(async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || trimmed.length < 2) {
      setResults([]);
      setLoading(false);
      return;
    }

    setLoading(true);

    // 1. Check if query is a Google Plus Code (e.g. "JX24+WXR, Nyeri" or "6GFRJX24+WXR")
    const plusCodeResult = await resolvePlusCode(trimmed);
    if (plusCodeResult) {
      setResults([plusCodeResult]);
      setLoading(false);
      return;
    }

    // 2. Check if query is raw coordinates e.g. " -1.286389, 36.817223 " or "36.817223, -1.286389"
    const coordMatch = trimmed.match(/^([-+]?\d{1,2}(?:\.\d+)?)[,\s]+([-+]?\d{1,3}(?:\.\d+)?)$/);
    if (coordMatch) {
      const val1 = parseFloat(coordMatch[1]);
      const val2 = parseFloat(coordMatch[2]);
      const lat = Math.abs(val1) <= 90 ? val1 : val2;
      const lng = Math.abs(val1) <= 90 ? val2 : val1;
      setResults([
        {
          id: `coord-${lat}-${lng}`,
          name: `Coordinates: ${lat.toFixed(5)}, ${lng.toFixed(5)}`,
          subtext: "Direct GPS Coordinate Point",
          center: [lng, lat],
          zoom: 14,
          categoryBadge: "GPS",
        },
      ]);
      setLoading(false);
      return;
    }

    try {
      // 1. Primary: Nominatim with polygon_geojson and addressdetails enabled
      const nomRes = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&polygon_geojson=1&addressdetails=1&dedupe=1&q=${encodeURIComponent(
          trimmed
        )}&limit=10`
      );

      if (nomRes.ok) {
        const nomData = await nomRes.json();
        if (Array.isArray(nomData) && nomData.length > 0) {
          const lowerQuery = trimmed.toLowerCase();

          // Calculate ranking weight for each candidate
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const scored = nomData.map((item: any) => {
            const hasPolygon =
              item.geojson &&
              (item.geojson.type === "Polygon" || item.geojson.type === "MultiPolygon");

            const addressType = (item.addresstype || item.type || "").toLowerCase();
            const rawClass = (item.class || "").toLowerCase();
            const itemName = (item.name || item.display_name.split(",")[0] || "").trim();
            const lowerName = itemName.toLowerCase();

            let score = (item.importance || 0) * 20;

            // 1. Exact Name match boost
            if (lowerName === lowerQuery) {
              score += 50;
            } else if (lowerName.startsWith(lowerQuery)) {
              score += 25;
            }

            // 2. Administrative / County / Province / Country Boost
            let badge = "Location";
            if (addressType === "county" || item.address?.county) {
              score += 45;
              badge = "County";
            } else if (addressType === "country" || rawClass === "country") {
              score += 40;
              badge = "Country";
            } else if (
              addressType === "state" ||
              addressType === "province" ||
              addressType === "region"
            ) {
              score += 35;
              badge = "Region";
            } else if (addressType === "city" || rawClass === "place") {
              score += 30;
              badge = "City";
            } else if (addressType === "town" || addressType === "municipality") {
              score += 20;
              badge = "Town";
            }

            // 3. Polygon availability boost (boundary isolation preference)
            if (hasPolygon) {
              score += 30;
            }

            // 4. Deprioritize micro-pois (streets, buildings, bus stops)
            if (rawClass === "highway" || rawClass === "building" || rawClass === "amenity") {
              score -= 30;
            }

            // Nominatim bbox is [minLat, maxLat, minLon, maxLon]
            const bbox: [number, number, number, number] | undefined =
              item.boundingbox && item.boundingbox.length === 4
                ? [
                    parseFloat(item.boundingbox[2]), // minLng
                    parseFloat(item.boundingbox[0]), // minLat
                    parseFloat(item.boundingbox[3]), // maxLng
                    parseFloat(item.boundingbox[1]), // maxLat
                  ]
                : undefined;

            const subtext = item.display_name;

            const zoomLevel =
              badge === "Country"
                ? 5
                : badge === "County" || badge === "Region"
                ? 9
                : badge === "City"
                ? 11
                : 13;

            return {
              item: {
                id: item.place_id,
                name: itemName,
                subtext,
                center: [parseFloat(item.lon), parseFloat(item.lat)] as [number, number],
                zoom: zoomLevel,
                boundaryGeojson: hasPolygon ? item.geojson : undefined,
                bbox,
                categoryBadge: badge,
              } as SearchLocationResult,
              score,
            };
          });

          // Sort by highest score first and take top 6
          scored.sort((a, b) => b.score - a.score);
          setResults(scored.slice(0, 6).map((s) => s.item));
          setLoading(false);
          return;
        }
      }
      throw new Error("Nominatim fallback");
    } catch {
      // 2. Fallback: Photon geocoder
      try {
        const response = await fetch(
          `https://photon.komoot.io/api/?q=${encodeURIComponent(trimmed)}&limit=6`
        );
        if (response.ok) {
          const data = await response.json();
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const mapped: SearchLocationResult[] = (data.features || []).map((feat: any, idx: number) => {
            const props = feat.properties || {};
            const coords = feat.geometry?.coordinates || [0, 0];
            const title =
              props.name ||
              props.city ||
              props.street ||
              props.state ||
              props.country ||
              trimmed;

            const details = [props.city, props.state, props.country]
              .filter(Boolean)
              .filter((item) => item !== title)
              .join(", ");

            const badge =
              props.type === "country"
                ? "Country"
                : props.type === "county"
                ? "County"
                : props.type === "state"
                ? "Region"
                : props.type === "city"
                ? "City"
                : "Location";

            return {
              id: feat.properties?.osm_id || idx,
              name: title,
              subtext: details || props.country || "Location",
              center: [coords[0], coords[1]] as [number, number],
              zoom: props.type === "country" ? 5 : props.type === "city" ? 11 : 14,
              categoryBadge: badge,
            };
          });
          setResults(mapped);
        }
      } catch {
        setResults([]);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  // Debounced search trigger
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (query.trim().length >= 2) {
        performSearch(query);
      } else {
        setResults([]);
        setLoading(false);
      }
    }, 350);

    return () => clearTimeout(timeoutId);
  }, [query, performSearch]);

  const handleSelect = (loc: SearchLocationResult) => {
    onSelectLocation(loc);
    setIsOpen(false);
    setQuery(loc.name);
  };

  const handleClear = () => {
    setQuery("");
    setResults([]);
    if (inputRef.current) inputRef.current.focus();
  };

  return (
    <div ref={containerRef} className={`relative z-40 ${className}`}>
      {/* Search Input Bar / Trigger */}
      <div className="relative flex items-center">
        <div className="flex items-center w-full max-w-xs md:w-72 rounded-xl border border-zinc-800 bg-zinc-900/90 hover:bg-zinc-900 text-xs text-zinc-200 backdrop-blur-md shadow-lg transition-all focus-within:border-blue-500/60 focus-within:ring-1 focus-within:ring-blue-500/30">
          <Search className="h-3.5 w-3.5 text-zinc-400 ml-3 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onFocus={() => setIsOpen(true)}
            onChange={(e) => {
              setQuery(e.target.value);
              setIsOpen(true);
            }}
            onKeyDown={(e) => {
              if (e.key === "Escape") {
                setIsOpen(false);
              } else if (e.key === "Enter" && results.length > 0) {
                handleSelect(results[0]);
              }
            }}
            placeholder={placeholder}
            className="w-full bg-transparent px-2.5 py-1.5 text-xs text-zinc-100 placeholder:text-zinc-500 focus:outline-none"
          />
          {loading ? (
            <Loader2 className="h-3.5 w-3.5 text-blue-400 mr-2.5 animate-spin shrink-0" />
          ) : query ? (
            <button
              type="button"
              onClick={handleClear}
              className="mr-2 text-zinc-400 hover:text-zinc-200 p-0.5 rounded"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          ) : null}
        </div>
      </div>

      {/* Search Results Dropdown */}
      {isOpen && query.trim().length >= 2 && (
        <div className="absolute left-0 mt-2 w-72 md:w-80 p-1.5 rounded-2xl border border-zinc-800 bg-zinc-950/95 backdrop-blur-xl shadow-2xl space-y-1 z-50 animate-in fade-in zoom-in-95 duration-150">
          <div className="px-2.5 py-1 text-[10px] font-semibold text-zinc-500 uppercase tracking-wider">
            Location Results
          </div>

          {loading && results.length === 0 && (
            <div className="p-3 text-center text-xs text-zinc-400 flex items-center justify-center gap-2">
              <Loader2 className="h-3.5 w-3.5 animate-spin text-blue-400" />
              <span>Searching locations...</span>
            </div>
          )}

          {!loading && results.length === 0 && (
            <div className="p-3 text-center text-xs text-zinc-500">
              No matching locations found
            </div>
          )}

          {results.map((loc) => (
            <button
              key={loc.id}
              type="button"
              onClick={() => handleSelect(loc)}
              className="w-full flex items-start gap-2.5 p-2 rounded-xl text-left hover:bg-zinc-900 text-zinc-300 hover:text-white transition-all group"
            >
              <MapPin className="h-4 w-4 text-blue-400 shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5 justify-between">
                  <span className="text-xs font-medium truncate text-zinc-100">
                    {loc.name}
                  </span>
                  {loc.categoryBadge && (
                    <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded-md bg-zinc-800 text-zinc-300 border border-zinc-700/80 shrink-0">
                      {loc.categoryBadge}
                    </span>
                  )}
                </div>
                {loc.subtext && (
                  <span className="text-[10px] text-zinc-500 block truncate">
                    {loc.subtext}
                  </span>
                )}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
