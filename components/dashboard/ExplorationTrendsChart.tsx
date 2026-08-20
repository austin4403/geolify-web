"use client";

import { useState } from "react";
import { ApexOptions } from "apexcharts";
import { TrendingUp } from "lucide-react";
import ApexChartWrapper from "./ApexChartWrapper";

export default function ExplorationTrendsChart() {
  const [activeTab, setActiveTab] = useState<"1M" | "6M" | "1Y">("6M");

  const options: ApexOptions = {
    colors: ["#3b82f6", "#10b981"],
    chart: {
      type: "area",
      height: 280,
      toolbar: { show: false },
      fontFamily: "inherit",
      background: "transparent",
    },
    stroke: {
      curve: "smooth",
      width: 2.5,
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        type: "vertical",
        shadeIntensity: 0.5,
        gradientToColors: undefined,
        inverseColors: true,
        opacityFrom: 0.45,
        opacityTo: 0.05,
        stops: [0, 95, 100],
      },
    },
    dataLabels: { enabled: false },
    xaxis: {
      categories: [
        "Week 1",
        "Week 2",
        "Week 3",
        "Week 4",
        "Week 5",
        "Week 6",
        "Week 7",
        "Week 8",
        "Week 9",
        "Week 10",
        "Week 11",
        "Week 12",
      ],
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: {
        style: {
          colors: "#71717a",
          fontSize: "12px",
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: "#71717a",
          fontSize: "12px",
        },
        formatter: (val: number) => `${val}%`,
      },
    },
    grid: {
      borderColor: "#27272a",
      strokeDashArray: 4,
      yaxis: { lines: { show: true } },
      xaxis: { lines: { show: false } },
    },
    legend: {
      position: "top",
      horizontalAlign: "right",
      labels: { colors: "#a1a1aa" },
    },
    tooltip: {
      theme: "dark",
    },
  };

  const series = [
    {
      name: "Lithology Assay Accuracy",
      data: [68, 72, 75, 71, 80, 84, 82, 89, 91, 88, 94, 96],
    },
    {
      name: "Seismic Model Confidence",
      data: [45, 52, 58, 62, 60, 68, 74, 78, 82, 85, 89, 92],
    },
  ];

  return (
    <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/60 p-6 backdrop-blur-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-blue-400" />
            <h3 className="text-base font-semibold text-zinc-100">
              AI Geological Prediction & Model Confidence
            </h3>
          </div>
          <p className="text-xs text-zinc-400 mt-0.5">
            Lithology accuracy vs seismic deep subsurface resolution
          </p>
        </div>

        {/* Timeframe Tabs */}
        <div className="flex items-center rounded-xl bg-zinc-950 p-1 border border-zinc-800">
          {(["1M", "6M", "1Y"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              type="button"
              className={`px-3 py-1 text-xs font-medium rounded-lg transition-colors ${
                activeTab === tab
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="w-full">
        <ApexChartWrapper
          options={options}
          series={series}
          type="area"
          height={280}
        />
      </div>
    </div>
  );
}
