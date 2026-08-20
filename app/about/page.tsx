import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | Geolify",
  description: "About Geolify - Who we are and what we do.",
};

export default function AboutPage() {
  return (
    <div className="flex flex-col flex-1 min-h-screen bg-zinc-950 text-zinc-100 p-8">
      <div className="max-w-4xl mx-auto w-full space-y-4">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-100">
          About Geolify
        </h1>
        <p className="text-zinc-400">
          Who we are and what we do.  
        </p>
        <p className="text-zinc-400">
          Geolify is a technology company that is... 
        </p>
      </div>
    </div>
  );
}
