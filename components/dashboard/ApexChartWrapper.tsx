"use client";

import { useEffect, useState } from "react";
import type { ApexOptions } from "apexcharts";
import type { Props as ChartProps } from "react-apexcharts";

interface ApexChartWrapperProps {
  options: ApexOptions;
  series: ChartProps["series"];
  type: ChartProps["type"];
  height?: number | string;
  width?: number | string;
}

export default function ApexChartWrapper(props: ApexChartWrapperProps) {
  const [mounted, setMounted] = useState(false);
  const [ChartModule, setChartModule] = useState<{
    default: React.ComponentType<ChartProps>;
  } | null>(null);

  useEffect(() => {
    import("react-apexcharts").then((mod) => {
      setChartModule({
        default: (mod.default || mod) as React.ComponentType<ChartProps>,
      });
      setMounted(true);
    });
  }, []);

  if (!mounted || !ChartModule) {
    return (
      <div
        className="w-full flex items-center justify-center bg-zinc-950/40 rounded-xl animate-pulse"
        style={{
          height:
            typeof props.height === "number"
              ? `${props.height}px`
              : props.height || 280,
        }}
      >
        <div className="h-5 w-5 rounded-full border-2 border-blue-500/40 border-t-blue-500 animate-spin" />
      </div>
    );
  }

  const Chart = ChartModule.default;

  return (
    <Chart
      options={props.options}
      series={props.series}
      type={props.type}
      height={props.height || 280}
      width={props.width || "100%"}
    />
  );
}
