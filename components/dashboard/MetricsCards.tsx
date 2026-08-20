"use client";

import {
  Layers,
  Activity,
  DollarSign,
  FileCheck2,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

interface Metric {
  id: string;
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  period: string;
  icon: React.ElementType;
  iconBg: string;
  iconColor: string;
}

const metrics: Metric[] = [
  {
    id: "samples",
    title: "Analyzed Samples",
    value: "14,892",
    change: "+12.5%",
    isPositive: true,
    period: "vs last month",
    icon: Layers,
    iconBg: "bg-blue-600/10 border-blue-500/20",
    iconColor: "text-blue-400",
  },
  {
    id: "telemetry",
    title: "Field Stations",
    value: "128 Active",
    change: "+4.2%",
    isPositive: true,
    period: "99.8% uptime",
    icon: Activity,
    iconBg: "bg-emerald-500/10 border-emerald-500/20",
    iconColor: "text-emerald-400",
  },
  {
    id: "yield",
    title: "Mineral Yield Value",
    value: "$842,500",
    change: "+18.3%",
    isPositive: true,
    period: "Target: $800k",
    icon: DollarSign,
    iconBg: "bg-blue-600/10 border-blue-500/20",
    iconColor: "text-blue-400",
  },
  {
    id: "reports",
    title: "Exploration Reports",
    value: "3,410",
    change: "-2.1%",
    isPositive: false,
    period: "142 pending review",
    icon: FileCheck2,
    iconBg: "bg-emerald-500/10 border-emerald-500/20",
    iconColor: "text-emerald-400",
  },
];

export default function MetricsCards() {
  return (
    <div className="grid grid-cols-1 gap-3 sm:gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {metrics.map((item) => {
        const Icon = item.icon;
        return (
          <div
            key={item.id}
            className="rounded-2xl border border-zinc-800/80 bg-zinc-900/60 p-4 sm:p-5 backdrop-blur-sm hover:border-zinc-700/80 transition-all hover:shadow-lg hover:shadow-black/20"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-zinc-400 uppercase tracking-wider">
                {item.title}
              </span>
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-xl border ${item.iconBg} ${item.iconColor}`}
              >
                <Icon className="h-5 w-5" />
              </div>
            </div>

            <div className="mt-4 flex items-baseline justify-between">
              <h3 className="text-2xl font-bold text-zinc-100 tracking-tight">
                {item.value}
              </h3>
              <div
                className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold ${
                  item.isPositive
                    ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                    : "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                }`}
              >
                {item.isPositive ? (
                  <TrendingUp className="h-3 w-3" />
                ) : (
                  <TrendingDown className="h-3 w-3" />
                )}
                <span>{item.change}</span>
              </div>
            </div>

            <p className="mt-2 text-xs text-zinc-500">{item.period}</p>
          </div>
        );
      })}
    </div>
  );
}
