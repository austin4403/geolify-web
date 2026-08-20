import DashboardHeader from "@/components/dashboard/DashboardHeader";
import MetricsCards from "@/components/dashboard/MetricsCards";
import MonthlyActivityChart from "@/components/dashboard/MonthlyActivityChart";
import MonthlyTargetChart from "@/components/dashboard/MonthlyTargetChart";
import ExplorationTrendsChart from "@/components/dashboard/ExplorationTrendsChart";
import GlobalSitesCard from "@/components/dashboard/GlobalSitesCard";
import RecentSurveysTable from "@/components/dashboard/RecentSurveysTable";

export default function Home() {
  return (
    <div className="flex flex-col min-h-full bg-zinc-950 text-zinc-100 pb-12">
      {/* Top Bar Header */}
      <DashboardHeader />

      {/* Main Dashboard Content */}
      <main className="flex-1 p-4 sm:p-6 space-y-4 sm:space-y-6 max-w-7xl w-full mx-auto">
        {/* Page Title & Subtitle Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-zinc-100 tracking-tight">
              Your Geolify Dashboard
            </h1>
            <p className="text-xs sm:text-sm text-zinc-400">
              Real-time telemetry, mineral assays, and concession modeling.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono text-zinc-400 bg-zinc-900 border border-zinc-800">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Dataset: v4.8 (Live)
            </span>
          </div>
        </div>

        {/* 1. Key Metrics Cards */}
        <MetricsCards />

        {/* 2. Monthly Activity & Target Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
          <div className="lg:col-span-8">
            <MonthlyActivityChart />
          </div>
          <div className="lg:col-span-4">
            <MonthlyTargetChart />
          </div>
        </div>

        {/* 3. Deep Trends & Exploration Confidence */}
        <div className="w-full">
          <ExplorationTrendsChart />
        </div>

        {/* 4. Global Sites & Recent Surveys Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
          <div className="lg:col-span-5">
            <GlobalSitesCard />
          </div>
          <div className="lg:col-span-7">
            <RecentSurveysTable />
          </div>
        </div>
      </main>
    </div>
  );
}
