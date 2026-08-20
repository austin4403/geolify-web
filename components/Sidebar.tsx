"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  MapPin,
  FileBarChart,
  Users,
  Info,
  Mail,
  ChevronLeft,
  Menu,
  X,
} from "lucide-react";
import GeolifyLogo from "./icons/GeolifyLogo";

const navItems = [
  {
    name: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    name: "Map",
    href: "/map",
    icon: MapPin,
  },
  {
    name: "Report",
    href: "/report",
    icon: FileBarChart,
  },
  {
    name: "Teams",
    href: "/teams",
    icon: Users,
  },
  {
    name: "About",
    href: "/about",
    icon: Info,
  },
  {
    name: "Contact",
    href: "/contact",
    icon: Mail,
  },
];

export default function Sidebar() {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Close mobile drawer whenever route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [mobileMenuOpen]);

  return (
    <>
      {/* ========================================================= */}
      {/* MOBILE TOP BAR (Hidden on Desktop: md:hidden)             */}
      {/* ========================================================= */}
      <div className="md:hidden sticky top-0 z-40 flex items-center justify-between w-full h-14 px-4 bg-zinc-950/95 border-b border-zinc-800/80 backdrop-blur-md shrink-0">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-gradient-to-br from-blue-600/20 to-emerald-500/20 border border-blue-500/30 text-blue-400">
            <GeolifyLogo className="w-5 h-5 text-blue-400" />
          </div>
          <span className="text-zinc-100 font-bold text-lg tracking-tight">
            Geolify
          </span>
          <span className="inline-flex items-center px-1.5 py-0.2 rounded-full text-[9px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            Live
          </span>
        </Link>

        <div className="flex items-center gap-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="h-7 w-7 rounded-full object-cover ring-1 ring-zinc-700"
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt="John Doe"
          />
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            className="p-2 rounded-xl border border-zinc-800 bg-zinc-900 text-zinc-300 hover:text-white hover:border-zinc-700 transition-colors"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5 text-zinc-200" />
            ) : (
              <Menu className="h-5 w-5 text-zinc-200" />
            )}
          </button>
        </div>
      </div>

      {/* ========================================================= */}
      {/* MOBILE SLIDE-OVER DRAWER (Hidden on Desktop: md:hidden)   */}
      {/* ========================================================= */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          {/* Backdrop overlay */}
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-300"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer content */}
          <div className="relative flex flex-col justify-between w-[280px] max-w-[85vw] h-full bg-zinc-950 border-r border-zinc-800/90 shadow-2xl z-10 animate-in slide-in-from-left duration-300 overflow-y-auto">
            {/* Drawer Header */}
            <div>
              <div className="flex items-center justify-between px-4 py-4 border-b border-zinc-800/80">
                <Link
                  href="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2.5"
                >
                  <div className="p-2 rounded-xl bg-gradient-to-br from-blue-600/20 to-emerald-500/20 border border-blue-500/30 text-blue-400">
                    <GeolifyLogo className="w-5 h-5 text-blue-400" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-zinc-100 font-bold text-lg tracking-tight">
                      Geolify
                    </span>
                    <span className="text-[10px] text-zinc-400 font-medium">
                      Geological Intel
                    </span>
                  </div>
                </Link>

                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Close navigation"
                  className="p-1.5 rounded-lg border border-zinc-800 bg-zinc-900 text-zinc-400 hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Navigation Links */}
              <div className="p-3 space-y-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive =
                    item.href === "/"
                      ? pathname === "/"
                      : pathname.startsWith(item.href);

                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`group flex items-center px-3 py-2.5 text-sm font-medium rounded-xl transition-colors ${
                        isActive
                          ? "bg-blue-600/15 text-blue-400 border border-blue-500/30"
                          : "text-zinc-300 hover:text-zinc-100 hover:bg-zinc-900 border border-transparent"
                      }`}
                    >
                      <Icon
                        className={`mr-3 shrink-0 h-5 w-5 ${
                          isActive
                            ? "text-blue-400"
                            : "text-zinc-400 group-hover:text-blue-400"
                        }`}
                      />
                      <span>{item.name}</span>
                      {isActive && (
                        <span className="ml-auto w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                      )}
                    </Link>
                  );
                })}
              </div>

              {/* Mobile Projects Section */}
              <div className="px-3 pt-3 border-t border-zinc-800/60 space-y-2">
                <div className="flex items-center justify-between px-3">
                  <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                    Projects
                  </h3>
                  <span className="text-[10px] text-zinc-500 font-mono">4</span>
                </div>
                <div className="space-y-1">
                  <a
                    href="#"
                    className="group flex items-center justify-between px-3 py-1.5 text-xs font-medium text-zinc-400 rounded-md hover:text-zinc-100 hover:bg-zinc-900 transition-colors"
                  >
                    <span className="truncate">Website redesign</span>
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-400 shrink-0" />
                  </a>
                  <a
                    href="#"
                    className="group flex items-center justify-between px-3 py-1.5 text-xs font-medium text-zinc-400 rounded-md hover:text-zinc-100 hover:bg-zinc-900 transition-colors"
                  >
                    <span className="truncate">GraphQL API</span>
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shrink-0" />
                  </a>
                  <a
                    href="#"
                    className="group flex items-center justify-between px-3 py-1.5 text-xs font-medium text-zinc-400 rounded-md hover:text-zinc-100 hover:bg-zinc-900 transition-colors"
                  >
                    <span className="truncate">Customer migration guides</span>
                    <span className="h-1.5 w-1.5 rounded-full bg-zinc-600 shrink-0" />
                  </a>
                  <a
                    href="#"
                    className="group flex items-center justify-between px-3 py-1.5 text-xs font-medium text-zinc-400 rounded-md hover:text-zinc-100 hover:bg-zinc-900 transition-colors"
                  >
                    <span className="truncate">Profit sharing program</span>
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shrink-0" />
                  </a>
                </div>
              </div>
            </div>

            {/* Mobile User Profile Footer */}
            <div className="p-3 border-t border-zinc-800/80 bg-zinc-950 shrink-0">
              <a
                href="#"
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-zinc-900 transition-colors group"
              >
                <div className="relative shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    className="h-9 w-9 rounded-full object-cover ring-2 ring-zinc-800 group-hover:ring-blue-500/50"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt="John Doe"
                  />
                  <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-zinc-950" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-zinc-200 group-hover:text-white truncate">
                    John Doe
                  </p>
                  <p className="text-xs text-zinc-400 group-hover:text-zinc-300 truncate">
                    Voir le profil
                  </p>
                </div>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* DESKTOP SIDEBAR (Visible only on Desktop: hidden md:flex) */}
      {/* ========================================================= */}
      <div className="hidden md:flex relative shrink-0 h-screen max-h-screen sticky top-0 z-30">
        <aside
          aria-label="Sidebar"
          className={`h-screen max-h-screen bg-zinc-950 border-r border-zinc-800/80 relative transition-all duration-500 ease-in-out flex flex-col justify-between overflow-hidden ${
            !toggleMenu ? "w-64" : "w-0"
          }`}
        >
          {/* Collapse / Expand Toggle Button */}
          <button
            type="button"
            onClick={() => setToggleMenu(!toggleMenu)}
            aria-label={toggleMenu ? "Open sidebar" : "Collapse sidebar"}
            className={`absolute z-30 flex items-center justify-center p-2 rounded-full shadow-lg border border-zinc-700 bg-zinc-900 text-zinc-300 hover:text-white hover:border-blue-500 hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-zinc-950 transition-all duration-500 ease-in-out ${
              !toggleMenu ? "top-7 left-56" : "top-7 left-5"
            }`}
          >
            <ChevronLeft
              className={`h-4 w-4 transition-transform duration-500 ${
                toggleMenu ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* Sidebar Main Content */}
          <div
            className={`flex flex-col flex-grow pt-6 pb-4 overflow-hidden whitespace-nowrap transition-opacity duration-300 ${
              !toggleMenu ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            {/* Brand Header */}
            <div className="px-5 pb-5 border-b border-zinc-800/60">
              <Link
                href="/"
                className="flex items-center justify-between group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-gradient-to-br from-blue-600/20 to-emerald-500/20 border border-blue-500/30 text-blue-400 group-hover:border-blue-500/60 transition-colors">
                    <GeolifyLogo className="w-6 h-6 text-blue-400" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-zinc-100 font-bold text-xl tracking-tight">
                      Geolify
                    </span>
                    <span className="text-[11px] text-zinc-400 font-medium tracking-wide">
                      Geological Intel
                    </span>
                  </div>
                </div>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Web
                </span>
              </Link>
            </div>

            {/* Nav Items */}
            <div className="mt-4 flex-grow flex flex-col px-3">
              <nav className="flex-1 space-y-6" aria-label="Sidebar navigation">
                <div className="space-y-1">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive =
                      item.href === "/"
                        ? pathname === "/"
                        : pathname.startsWith(item.href);

                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={`group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                          isActive
                            ? "bg-blue-600/15 text-blue-400 border border-blue-500/30"
                            : "text-zinc-300 hover:text-zinc-100 hover:bg-zinc-900 border border-transparent"
                        }`}
                      >
                        <Icon
                          className={`mr-3 shrink-0 h-5 w-5 transition-colors ${
                            isActive
                              ? "text-blue-400"
                              : "text-zinc-400 group-hover:text-blue-400"
                          }`}
                        />
                        <span>{item.name}</span>
                        {isActive && (
                          <span className="ml-auto w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                        )}
                      </Link>
                    );
                  })}
                </div>

                {/* Projects Section */}
                <div className="space-y-2 pt-3 border-t border-zinc-800/60">
                  <div className="flex items-center justify-between px-3">
                    <h3
                      className="text-xs font-semibold text-zinc-400 uppercase tracking-wider"
                      id="projects-headline"
                    >
                      Projets
                    </h3>
                    <span className="text-[10px] text-zinc-500 font-mono">4</span>
                  </div>
                  <div
                    className="space-y-1"
                    role="group"
                    aria-labelledby="projects-headline"
                  >
                    <a
                      href="#"
                      className="group flex items-center justify-between px-3 py-1.5 text-xs font-medium text-zinc-400 rounded-md hover:text-zinc-100 hover:bg-zinc-900 transition-colors"
                    >
                      <span className="truncate">Website redesign</span>
                      <span className="h-1.5 w-1.5 rounded-full bg-blue-400 shrink-0" />
                    </a>

                    <a
                      href="#"
                      className="group flex items-center justify-between px-3 py-1.5 text-xs font-medium text-zinc-400 rounded-md hover:text-zinc-100 hover:bg-zinc-900 transition-colors"
                    >
                      <span className="truncate">GraphQL API</span>
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shrink-0" />
                    </a>

                    <a
                      href="#"
                      className="group flex items-center justify-between px-3 py-1.5 text-xs font-medium text-zinc-400 rounded-md hover:text-zinc-100 hover:bg-zinc-900 transition-colors"
                    >
                      <span className="truncate">Customer migration guides</span>
                      <span className="h-1.5 w-1.5 rounded-full bg-zinc-600 shrink-0" />
                    </a>

                    <a
                      href="#"
                      className="group flex items-center justify-between px-3 py-1.5 text-xs font-medium text-zinc-400 rounded-md hover:text-zinc-100 hover:bg-zinc-900 transition-colors"
                    >
                      <span className="truncate">Profit sharing program</span>
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shrink-0" />
                    </a>
                  </div>
                </div>
              </nav>
            </div>
          </div>

          {/* User Profile Footer */}
          <div
            className={`shrink-0 p-3 border-t border-zinc-800/80 bg-zinc-950/80 overflow-hidden whitespace-nowrap transition-opacity duration-300 ${
              !toggleMenu ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            <a
              href="#"
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-zinc-900/80 transition-colors group"
            >
              <div className="relative shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="h-9 w-9 rounded-full object-cover ring-2 ring-zinc-800 group-hover:ring-blue-500/50 transition-all"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt="John Doe"
                />
                <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-zinc-950" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-zinc-200 group-hover:text-white truncate">
                  John Doe
                </p>
                <p className="text-xs text-zinc-400 group-hover:text-zinc-300 truncate">
                  Voir le profil
                </p>
              </div>
            </a>
          </div>
        </aside>
      </div>
    </>
  );
}
