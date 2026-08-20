import type { Metadata } from "next";
import { Users, UserPlus, Shield, Compass, Mail, Radio } from "lucide-react";

export const metadata: Metadata = {
  title: "Teams | Geolify",
  description: "Geological field crew, telemetry operators, and exploration leads.",
};

interface TeamMember {
  name: string;
  role: string;
  specialty: string;
  location: string;
  status: "active_field" | "lab_analysis" | "standby";
  avatar: string;
  assignedProject: string;
}

const teamMembers: TeamMember[] = [
  {
    name: "Dr. Elena Rostova",
    role: "Lead Structural Geologist",
    specialty: "Fault Kinematics & Strike-Dip Modeling",
    location: "Elko Basecamp, NV",
    status: "active_field",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    assignedProject: "Carlin Trend Gold Complex",
  },
  {
    name: "Marcus Vance",
    role: "Senior Exploration Geophysicist",
    specialty: "Seismic Refraction & Resistivity",
    location: "Antofagasta, Chile",
    status: "active_field",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    assignedProject: "Atacama Salar Lithium Flats",
  },
  {
    name: "Amina Al-Mansoor",
    role: "GIS & Remote Sensing Specialist",
    specialty: "Hyperspectral Satellite Telemetry",
    location: "Remote / Perth HQ",
    status: "lab_analysis",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
    assignedProject: "Pilbara Iron Range Survey",
  },
  {
    name: "David K. O'Connor",
    role: "Drill Operations Supervisor",
    specialty: "Diamond Core Drilling & Sampling QA",
    location: "Saskatoon, Canada",
    status: "standby",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80",
    assignedProject: "Athabasca Basin Uranium",
  },
];

export default function TeamsPage() {
  return (
    <div className="flex flex-col flex-1 p-6 space-y-6 max-w-7xl mx-auto w-full min-h-full pb-12">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Users className="h-6 w-6 text-blue-400" />
            <h1 className="text-2xl font-bold tracking-tight text-zinc-100">
              Exploration Teams & Field Personnel
            </h1>
          </div>
          <p className="text-sm text-zinc-400 mt-1">
            Manage geological field crews, station telemetry leads, and laboratory analysts.
          </p>
        </div>

        <button
          type="button"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md shadow-blue-600/20 transition-colors"
        >
          <UserPlus className="h-4 w-4" />
          <span>Add Team Member</span>
        </button>
      </div>

      {/* Team Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs text-zinc-400">Active Field Crews</span>
            <Radio className="h-4 w-4 text-emerald-400 animate-pulse" />
          </div>
          <p className="text-2xl font-bold text-zinc-100 mt-2">18 Geologists</p>
          <span className="text-[11px] text-emerald-400 mt-1 block">Live GPS Telemetry Syncing</span>
        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs text-zinc-400">Active Projects Covered</span>
            <Compass className="h-4 w-4 text-blue-400" />
          </div>
          <p className="text-2xl font-bold text-zinc-100 mt-2">5 Concessions</p>
          <span className="text-[11px] text-blue-400 mt-1 block">4 Continents Operational</span>
        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs text-zinc-400">Assay Quality Control</span>
            <Shield className="h-4 w-4 text-amber-400" />
          </div>
          <p className="text-2xl font-bold text-zinc-100 mt-2">99.4% Verified</p>
          <span className="text-[11px] text-zinc-400 mt-1 block">QA/QC Protocol Certified</span>
        </div>
      </div>

      {/* Team Roster Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {teamMembers.map((member) => (
          <div
            key={member.name}
            className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5 space-y-4 hover:border-zinc-700 transition-colors"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="h-12 w-12 rounded-full object-cover ring-2 ring-zinc-800"
                />
                <div>
                  <h3 className="text-base font-semibold text-zinc-100">
                    {member.name}
                  </h3>
                  <p className="text-xs text-blue-400 font-medium">
                    {member.role}
                  </p>
                </div>
              </div>

              <span
                className={`px-2.5 py-1 rounded-full text-[10px] font-semibold border ${
                  member.status === "active_field"
                    ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                    : member.status === "lab_analysis"
                    ? "bg-blue-500/10 text-blue-400 border-blue-500/20"
                    : "bg-zinc-800 text-zinc-400 border-zinc-700"
                }`}
              >
                {member.status === "active_field"
                  ? "Field Active"
                  : member.status === "lab_analysis"
                  ? "Lab Analysis"
                  : "Standby"}
              </span>
            </div>

            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between py-1 border-t border-zinc-800/60">
                <span className="text-zinc-500">Core Specialty</span>
                <span className="font-medium text-zinc-300">{member.specialty}</span>
              </div>
              <div className="flex justify-between py-1 border-t border-zinc-800/60">
                <span className="text-zinc-500">Current Station</span>
                <span className="font-medium text-zinc-300">{member.location}</span>
              </div>
              <div className="flex justify-between py-1 border-t border-zinc-800/60">
                <span className="text-zinc-500">Assigned Project</span>
                <span className="font-medium text-emerald-400">{member.assignedProject}</span>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-zinc-200 transition-colors"
              >
                <Mail className="h-3.5 w-3.5" />
                <span>Contact Lead</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
