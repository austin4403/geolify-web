"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Bell,
  CheckCheck,
  AlertTriangle,
  Radio,
  FileCheck,
  ShieldAlert,
  Satellite,
  Compass,
  CheckCircle2,
  Trash2,
  ExternalLink,
  SlidersHorizontal,
  Flame,
  Info,
} from "lucide-react";

interface NotificationItem {
  id: string;
  title: string;
  description: string;
  category: "telemetry" | "assay" | "system" | "security";
  severity: "critical" | "warning" | "success" | "info";
  time: string;
  read: boolean;
  actionLabel?: string;
  actionHref?: string;
  stationOrProject?: string;
}

const initialNotifications: NotificationItem[] = [
  {
    id: "notif-1",
    title: "Seismic Anomaly Spike Detected",
    description: "Field Station #04 recorded a 3.4 magnitude micro-tremor burst along the Carlin Fault strike-slip zone.",
    category: "telemetry",
    severity: "critical",
    time: "12 minutes ago",
    read: false,
    actionLabel: "View Live Telemetry",
    actionHref: "/map",
    stationOrProject: "Carlin Trend, NV",
  },
  {
    id: "notif-2",
    title: "Lithology Assay Batch #4982 Complete",
    description: "XRF and spectrometry analysis for core sample #8841 confirmed 4.8 g/t gold-copper mineral grade confidence.",
    category: "assay",
    severity: "success",
    time: "45 minutes ago",
    read: false,
    actionLabel: "View Exploration Report",
    actionHref: "/report",
    stationOrProject: "Atacama Salar, Chile",
  },
  {
    id: "notif-3",
    title: "Concession Boundary Overlap Notice",
    description: "Mining claim EL-994 has an overlapping boundary inquiry with adjacent exploration concession sector B.",
    category: "system",
    severity: "warning",
    time: "2 hours ago",
    read: false,
    actionLabel: "Inspect Concession Map",
    actionHref: "/map",
    stationOrProject: "Pilbara Iron Range",
  },
  {
    id: "notif-4",
    title: "Telemetry Satellite Uplink Restored",
    description: "Field Station #128 re-established direct L-band satellite link at 100% throughput following maintenance.",
    category: "telemetry",
    severity: "info",
    time: "4 hours ago",
    read: true,
    actionLabel: "Check Station Status",
    actionHref: "/",
    stationOrProject: "Pilbara Station 128",
  },
  {
    id: "notif-5",
    title: "Dr. Elena Rostova Submitted New Assay Log",
    description: "Field report for drill hole DH-2026-14 has been uploaded with structural strike-dip models attached.",
    category: "assay",
    severity: "info",
    time: "6 hours ago",
    read: true,
    actionLabel: "View Team Member",
    actionHref: "/teams",
    stationOrProject: "Drilling Crew Alpha",
  },
  {
    id: "notif-6",
    title: "Multispectral Satellite Pass Scheduled",
    description: "Sentinel-2B orbital pass scheduled over Atacama Salar in 3h 40m for high-resolution shortwave infrared capture.",
    category: "system",
    severity: "info",
    time: "8 hours ago",
    read: true,
    actionLabel: "Track Satellite Window",
    actionHref: "/map",
    stationOrProject: "Orbital Recon Sentinel-2B",
  },
];

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<NotificationItem[]>(initialNotifications);
  const [filter, setFilter] = useState<"all" | "unread" | "telemetry" | "assay" | "system">("all");

  const unreadCount = notifications.filter((n) => !n.read).length;

  const filteredNotifications = notifications.filter((item) => {
    if (filter === "unread") return !item.read;
    if (filter === "telemetry") return item.category === "telemetry";
    if (filter === "assay") return item.category === "assay";
    if (filter === "system") return item.category === "system" || item.category === "security";
    return true;
  });

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const getSeverityBadge = (severity: NotificationItem["severity"]) => {
    switch (severity) {
      case "critical":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/10 text-rose-400 border border-rose-500/20">
            <Flame className="h-3 w-3 text-rose-400" />
            Critical Alert
          </span>
        );
      case "warning":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <AlertTriangle className="h-3 w-3 text-amber-400" />
            Warning
          </span>
        );
      case "success":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <CheckCircle2 className="h-3 w-3 text-emerald-400" />
            Completed
          </span>
        );
      case "info":
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20">
            <Info className="h-3 w-3 text-blue-400" />
            Telemetry
          </span>
        );
    }
  };

  const getCategoryIcon = (category: NotificationItem["category"], severity: NotificationItem["severity"]) => {
    if (severity === "critical") {
      return (
        <div className="p-2.5 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-400 shrink-0">
          <ShieldAlert className="h-5 w-5" />
        </div>
      );
    }
    switch (category) {
      case "telemetry":
        return (
          <div className="p-2.5 rounded-xl bg-blue-600/15 border border-blue-500/30 text-blue-400 shrink-0">
            <Radio className="h-5 w-5" />
          </div>
        );
      case "assay":
        return (
          <div className="p-2.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 shrink-0">
            <FileCheck className="h-5 w-5" />
          </div>
        );
      case "system":
      default:
        return (
          <div className="p-2.5 rounded-xl bg-violet-500/15 border border-violet-500/30 text-violet-400 shrink-0">
            <Satellite className="h-5 w-5" />
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col flex-1 p-4 sm:p-6 space-y-4 sm:space-y-6 max-w-5xl mx-auto w-full min-h-full pb-12">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 md:pl-10">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400">
              <Bell className="h-5 w-5" />
            </div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-100">
              Notifications & Alerts
            </h1>
            {unreadCount > 0 && (
              <span className="ml-2 px-2 py-0.5 rounded-full text-xs font-bold bg-blue-600 text-white shadow-sm">
                {unreadCount} new
              </span>
            )}
          </div>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Real-time telemetry spikes, assay laboratory results, and geological concession updates.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {unreadCount > 0 && (
            <button
              type="button"
              onClick={markAllAsRead}
              className="inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl border border-zinc-800 bg-zinc-900/90 hover:bg-zinc-800 text-zinc-200 text-xs font-semibold backdrop-blur-md shadow-sm transition-all"
            >
              <CheckCheck className="h-4 w-4 text-blue-400" />
              <span>Mark all as read</span>
            </button>
          )}
        </div>
      </div>

      {/* Summary KPI Pills */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-3.5 flex items-center justify-between">
          <div>
            <p className="text-[11px] font-medium text-zinc-400">Unread Alerts</p>
            <p className="text-lg font-bold text-zinc-100 mt-0.5">{unreadCount}</p>
          </div>
          <div className="h-8 w-8 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
            <Bell className="h-4 w-4" />
          </div>
        </div>

        <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-3.5 flex items-center justify-between">
          <div>
            <p className="text-[11px] font-medium text-zinc-400">Critical Events</p>
            <p className="text-lg font-bold text-rose-400 mt-0.5">1</p>
          </div>
          <div className="h-8 w-8 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400">
            <ShieldAlert className="h-4 w-4" />
          </div>
        </div>

        <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-3.5 flex items-center justify-between">
          <div>
            <p className="text-[11px] font-medium text-zinc-400">Telemetry Pings</p>
            <p className="text-lg font-bold text-emerald-400 mt-0.5">128</p>
          </div>
          <div className="h-8 w-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <Radio className="h-4 w-4" />
          </div>
        </div>

        <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-3.5 flex items-center justify-between">
          <div>
            <p className="text-[11px] font-medium text-zinc-400">Resolved Today</p>
            <p className="text-lg font-bold text-zinc-200 mt-0.5">9</p>
          </div>
          <div className="h-8 w-8 rounded-xl bg-zinc-800 flex items-center justify-center text-zinc-400">
            <CheckCircle2 className="h-4 w-4" />
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none border-b border-zinc-800/80">
        <button
          type="button"
          onClick={() => setFilter("all")}
          className={`px-3.5 py-2 text-xs font-semibold rounded-xl whitespace-nowrap transition-all ${
            filter === "all"
              ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
              : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900"
          }`}
        >
          All Notifications ({notifications.length})
        </button>

        <button
          type="button"
          onClick={() => setFilter("unread")}
          className={`px-3.5 py-2 text-xs font-semibold rounded-xl whitespace-nowrap transition-all ${
            filter === "unread"
              ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
              : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900"
          }`}
        >
          Unread ({unreadCount})
        </button>

        <button
          type="button"
          onClick={() => setFilter("telemetry")}
          className={`px-3.5 py-2 text-xs font-semibold rounded-xl whitespace-nowrap transition-all ${
            filter === "telemetry"
              ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
              : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900"
          }`}
        >
          Telemetry & Sensors
        </button>

        <button
          type="button"
          onClick={() => setFilter("assay")}
          className={`px-3.5 py-2 text-xs font-semibold rounded-xl whitespace-nowrap transition-all ${
            filter === "assay"
              ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
              : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900"
          }`}
        >
          Assay Lab & Reports
        </button>

        <button
          type="button"
          onClick={() => setFilter("system")}
          className={`px-3.5 py-2 text-xs font-semibold rounded-xl whitespace-nowrap transition-all ${
            filter === "system"
              ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
              : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900"
          }`}
        >
          Concessions & System
        </button>
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {filteredNotifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-12 text-center rounded-2xl border border-zinc-800/80 bg-zinc-900/30">
            <div className="p-3.5 rounded-2xl bg-zinc-800/60 text-zinc-500 mb-3">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <h3 className="text-sm font-semibold text-zinc-200">No notifications found</h3>
            <p className="text-xs text-zinc-500 mt-1 max-w-sm">
              All notifications in this filter category have been read or cleared.
            </p>
          </div>
        ) : (
          filteredNotifications.map((item) => (
            <div
              key={item.id}
              className={`group relative rounded-2xl border p-4 sm:p-5 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                !item.read
                  ? "border-blue-500/30 bg-zinc-900/90 shadow-lg shadow-blue-950/20"
                  : "border-zinc-800/80 bg-zinc-900/40 hover:bg-zinc-900/70"
              }`}
            >
              {/* Left Details */}
              <div className="flex items-start gap-3.5 flex-1 min-w-0">
                {getCategoryIcon(item.category, item.severity)}

                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-sm font-semibold text-zinc-100 tracking-tight">
                      {item.title}
                    </h3>
                    {getSeverityBadge(item.severity)}
                    {!item.read && (
                      <span className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
                    )}
                  </div>

                  <p className="text-xs text-zinc-400 leading-relaxed">
                    {item.description}
                  </p>

                  <div className="flex items-center gap-3 pt-1 text-[11px] text-zinc-500">
                    {item.stationOrProject && (
                      <span className="font-mono text-zinc-400">
                        {item.stationOrProject}
                      </span>
                    )}
                    <span>•</span>
                    <span>{item.time}</span>
                  </div>
                </div>
              </div>

              {/* Right Actions */}
              <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                {item.actionLabel && item.actionHref && (
                  <Link
                    href={item.actionHref}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-zinc-800 bg-zinc-800/80 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold transition-colors"
                  >
                    <span>{item.actionLabel}</span>
                    <ExternalLink className="h-3 w-3 text-zinc-400" />
                  </Link>
                )}

                {!item.read && (
                  <button
                    type="button"
                    onClick={() => markAsRead(item.id)}
                    title="Mark as read"
                    className="p-2 rounded-xl border border-zinc-800 bg-zinc-900 text-zinc-400 hover:text-white hover:border-zinc-700 transition-colors"
                  >
                    <CheckCheck className="h-4 w-4" />
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => deleteNotification(item.id)}
                  title="Delete notification"
                  className="p-2 rounded-xl border border-zinc-800 bg-zinc-900 text-zinc-500 hover:text-rose-400 hover:border-rose-500/30 transition-colors opacity-80 group-hover:opacity-100"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
