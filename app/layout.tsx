import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import { MapThemeProvider } from "@/context/MapThemeContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Geolify",
  description: "Where geology meets technology and opportunity meets reality",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body
        suppressHydrationWarning
        className="h-screen w-screen flex flex-col md:flex-row bg-zinc-950 text-zinc-100 overflow-hidden"
      >
        <MapThemeProvider>
          {/* Navigation Sidebar */}
          <Sidebar />

          {/* Scrollable Page Content Area */}
          <div className="relative z-10 flex-1 flex flex-col min-w-0 h-screen max-h-screen overflow-y-auto overflow-x-hidden">
            {children}
          </div>
        </MapThemeProvider>
      </body>
    </html>
  );
}
