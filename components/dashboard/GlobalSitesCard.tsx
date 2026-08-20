"use client";

import { Globe2 } from "lucide-react";

interface Site {
  country: string;
  region: string;
  surveys: number;
  percentage: number;
  flag: string;
}

const sites: Site[] = [
  {
    country: "United States",
    region: "Nevada & Permian Basin",
    surveys: 1420,
    percentage: 78,
    flag: "🇺🇸",
  },
  {
    country: "Canada",
    region: "Athabasca Basin, SK",
    surveys: 890,
    percentage: 62,
    flag: "🇨🇦",
  },
  {
    country: "Australia",
    region: "Pilbara Iron Ore Range",
    surveys: 640,
    percentage: 49,
    flag: "🇦🇺",
  },
  {
    country: "Chile",
    region: "Atacama Lithium Flats",
    surveys: 420,
    percentage: 34,
    flag: "🇨🇱",
  },
  {
    country: "South Africa",
    region: "Witwatersrand Basin",
    surveys: 310,
    percentage: 26,
    flag: "🇿🇦",
  },
];

export default function GlobalSitesCard() {
  return (
    <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/60 p-4 sm:p-6 backdrop-blur-sm">
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="flex items-center gap-2">
            <Globe2 className="h-4 w-4 text-blue-400" />
            <h3 className="text-sm sm:text-base font-semibold text-zinc-100">
              Global Geological Sites
            </h3>
          </div>
          <p className="text-xs text-zinc-400 mt-0.5">
            Active survey operations & concessions
          </p>
        </div>
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-600/10 text-blue-400 border border-blue-500/20">
          5 Concessions
        </span>
      </div>

      <div className="space-y-4 mt-6">
        {sites.map((site) => (
          <div key={site.country} className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="text-base">{site.flag}</span>
                <div>
                  <span className="font-medium text-zinc-200 block">
                    {site.country}
                  </span>
                  <span className="text-[11px] text-zinc-500">
                    {site.region}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <span className="font-semibold text-zinc-200">
                  {site.surveys.toLocaleString()}
                </span>
                <span className="text-[10px] text-zinc-500 block">
                  {site.percentage}% yield
                </span>
              </div>
            </div>

            {/* Progress bar */}
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-zinc-800">
              <div
                className="h-full rounded-full bg-gradient-to-r from-blue-500 to-emerald-400 transition-all duration-500"
                style={{ width: `${site.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
