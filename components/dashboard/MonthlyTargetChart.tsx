"use client";

import { ApexOptions } from "apexcharts";
import { ArrowUpRight, Target, MoreHorizontal } from "lucide-react";
import ApexChartWrapper from "./ApexChartWrapper";

export default function MonthlyTargetChart() {
  const series = [78.4];

  const options: ApexOptions = {
    colors: ["#3b82f6"],
    chart: {
      type: "radialBar",
      height: 240,
      sparkline: { enabled: true },
      fontFamily: "inherit",
    },
    plotOptions: {
      radialBar: {
        startAngle: -90,
        endAngle: 90,
        hollow: {
          size: "72%",
        },
        track: {
          background: "#27272a",
          strokeWidth: "95%",
          margin: 0,
        },
        dataLabels: {
          name: { show: false },
          value: {
            offsetY: -20,
            fontSize: "28px",
            fontWeight: "700",
            color: "#f4f4f5",
            formatter: (val) => `${val}%`,
          },
        },
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        type: "horizontal",
        gradientToColors: ["#10b981"],
        stops: [0, 100],
      },
    },
    stroke: { lineCap: "round" },
  };

  return (
    <div className="flex flex-col justify-between rounded-2xl border border-zinc-800/80 bg-zinc-900/60 p-4 sm:p-6 backdrop-blur-sm">
      <div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Target className="h-4 w-4 text-emerald-400" />
            <h3 className="text-sm sm:text-base font-semibold text-zinc-100">
              Exploration Target
            </h3>
          </div>
          <button
            type="button"
            className="p-1.5 rounded-lg text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800 transition-colors"
          >
            <MoreHorizontal className="h-4 w-4" />
          </button>
        </div>
        <p className="text-xs text-zinc-400 mt-1">
          Quarterly mineral deposit extraction & modeling goals
        </p>
      </div>

      <div className="py-2">
        <ApexChartWrapper
          options={options}
          series={series}
          type="radialBar"
          height={240}
        />
        <div className="text-center -mt-4">
          <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
            <ArrowUpRight className="h-3 w-3" />
            +8.4% ahead of schedule
          </span>
        </div>
      </div>

      {/* Target Breakdown */}
      <div className="grid grid-cols-3 gap-2 pt-4 border-t border-zinc-800/60 text-center">
        <div>
          <span className="text-[11px] text-zinc-500 block">Goal</span>
          <span className="text-sm font-semibold text-zinc-200">5,000 km²</span>
        </div>
        <div className="border-x border-zinc-800/60">
          <span className="text-[11px] text-zinc-500 block">Surveyed</span>
          <span className="text-sm font-semibold text-blue-400">3,920 km²</span>
        </div>
        <div>
          <span className="text-[11px] text-zinc-500 block">Identified</span>
          <span className="text-sm font-semibold text-emerald-400">14 Zones</span>
        </div>
      </div>
    </div>
  );
}
