"use client";

import { ApexOptions } from "apexcharts";
import { MoreHorizontal } from "lucide-react";
import ApexChartWrapper from "./ApexChartWrapper";

export default function MonthlyActivityChart() {
  const options: ApexOptions = {
    colors: ["#3b82f6", "#10b981"],
    chart: {
      type: "bar",
      height: 260,
      toolbar: { show: false },
      fontFamily: "inherit",
      background: "transparent",
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "45%",
        borderRadius: 4,
        borderRadiusApplication: "end",
      },
    },
    dataLabels: { enabled: false },
    stroke: {
      show: true,
      width: 3,
      colors: ["transparent"],
    },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
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
        formatter: (val: number) => `${val}k`,
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
      markers: { size: 4 },
    },
    tooltip: {
      theme: "dark",
      y: {
        formatter: (val: number) => `${val}k samples`,
      },
    },
  };

  const series = [
    {
      name: "Rock Samples",
      data: [35, 48, 62, 54, 78, 92, 85, 68, 95, 110, 102, 118],
    },
    {
      name: "Core Drill Logs",
      data: [20, 28, 35, 30, 45, 58, 52, 42, 60, 72, 65, 80],
    },
  ];

  return (
    <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/60 p-4 sm:p-6 backdrop-blur-sm">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm sm:text-base font-semibold text-zinc-100">
            Monthly Field Activity
          </h3>
          <p className="text-xs text-zinc-400 mt-0.5">
            Rock sample analysis vs core drill logs
          </p>
        </div>
        <button
          type="button"
          className="p-1.5 rounded-lg text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800 transition-colors"
        >
          <MoreHorizontal className="h-4 w-4" />
        </button>
      </div>

      <div className="w-full">
        <ApexChartWrapper
          options={options}
          series={series}
          type="bar"
          height={260}
        />
      </div>
    </div>
  );
}
