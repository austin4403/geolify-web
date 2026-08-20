"use client";

import { Filter, Eye, CheckCircle2, Clock, AlertCircle } from "lucide-react";

interface Survey {
  id: string;
  project: string;
  depositType: string;
  siteLocation: string;
  assaysLogged: number;
  estValuation: string;
  status: "Verified" | "Analyzing" | "In Field" | "Pending Review";
  date: string;
}

const surveys: Survey[] = [
  {
    id: "SRV-8901",
    project: "Carlin Trend Gold Deposit",
    depositType: "Hydrothermal / Epithermal",
    siteLocation: "Elko County, NV",
    assaysLogged: 420,
    estValuation: "$2,450,000",
    status: "Verified",
    date: "Aug 19, 2026",
  },
  {
    id: "SRV-8902",
    project: "Pilbara Banded Iron Formation",
    depositType: "Sedimentary BIF",
    siteLocation: "Western Australia",
    assaysLogged: 215,
    estValuation: "$1,890,000",
    status: "Analyzing",
    date: "Aug 18, 2026",
  },
  {
    id: "SRV-8903",
    project: "Atacama Lithium Brine Salar",
    depositType: "Evaporite Salar",
    siteLocation: "Antofagasta, Chile",
    assaysLogged: 360,
    estValuation: "$3,120,000",
    status: "Verified",
    date: "Aug 17, 2026",
  },
  {
    id: "SRV-8904",
    project: "Kidd Creek Volcanogenic Massive Sulfide",
    depositType: "VMS Cu-Zn",
    siteLocation: "Timmins, ON",
    assaysLogged: 140,
    estValuation: "$940,000",
    status: "In Field",
    date: "Aug 16, 2026",
  },
  {
    id: "SRV-8905",
    project: "Witwatersrand Auriferous Conglomerate",
    depositType: "Paleoplacer",
    siteLocation: "Johannesburg, SA",
    assaysLogged: 95,
    estValuation: "$670,000",
    status: "Pending Review",
    date: "Aug 15, 2026",
  },
];

export default function RecentSurveysTable() {

  const getStatusBadge = (status: Survey["status"]) => {
    switch (status) {
      case "Verified":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <CheckCircle2 className="h-3 w-3" />
            Verified
          </span>
        );
      case "Analyzing":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">
            <Clock className="h-3 w-3" />
            Analyzing
          </span>
        );
      case "In Field":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Clock className="h-3 w-3" />
            In Field
          </span>
        );
      case "Pending Review":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-zinc-700/40 text-zinc-300 border border-zinc-700">
            <AlertCircle className="h-3 w-3" />
            Pending Review
          </span>
        );
    }
  };

  return (
    <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/60 p-6 backdrop-blur-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h3 className="text-base font-semibold text-zinc-100">
            Recent Geological Surveys & Sample Logs
          </h3>
          <p className="text-xs text-zinc-400 mt-0.5">
            Active exploratory assessments and core sample data
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-zinc-800 bg-zinc-900 text-xs font-medium text-zinc-300 hover:text-white hover:border-zinc-700 transition-colors"
          >
            <Filter className="h-3.5 w-3.5 text-zinc-400" />
            <span>Filter</span>
          </button>
          <button
            type="button"
            className="px-3 py-1.5 rounded-xl border border-zinc-800 bg-zinc-900 text-xs font-medium text-zinc-300 hover:text-white hover:border-zinc-700 transition-colors"
          >
            View All
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-zinc-800 text-zinc-400 font-medium">
              <th className="pb-3 pr-4">Survey / Project</th>
              <th className="pb-3 px-4">Deposit Lithology</th>
              <th className="pb-3 px-4">Location</th>
              <th className="pb-3 px-4">Assays</th>
              <th className="pb-3 px-4">Est. Valuation</th>
              <th className="pb-3 px-4">Status</th>
              <th className="pb-3 pl-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/60 text-zinc-200">
            {surveys.map((survey) => (
              <tr
                key={survey.id}
                className="group hover:bg-zinc-800/40 transition-colors"
              >
                <td className="py-3.5 pr-4">
                  <div className="font-semibold text-zinc-100 group-hover:text-blue-400 transition-colors">
                    {survey.project}
                  </div>
                  <span className="text-[11px] font-mono text-zinc-500">
                    {survey.id} • {survey.date}
                  </span>
                </td>
                <td className="py-3.5 px-4 text-zinc-300">
                  {survey.depositType}
                </td>
                <td className="py-3.5 px-4 text-zinc-400">
                  {survey.siteLocation}
                </td>
                <td className="py-3.5 px-4 font-mono text-zinc-300">
                  {survey.assaysLogged} logs
                </td>
                <td className="py-3.5 px-4 font-semibold text-emerald-400">
                  {survey.estValuation}
                </td>
                <td className="py-3.5 px-4">{getStatusBadge(survey.status)}</td>
                <td className="py-3.5 pl-4 text-right">
                  <button
                    type="button"
                    className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition-colors"
                    title="View Survey Details"
                  >
                    <Eye className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
