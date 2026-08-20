import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | Geolify",
  description: "Contact the Geolify geology and intelligence team.",
};

export default function ContactPage() {
  return (
    <div className="flex flex-col flex-1 min-h-screen bg-zinc-950 text-zinc-100 p-4 sm:p-8">
      <div className="max-w-4xl mx-auto w-full space-y-4">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-100">
          Contact
        </h1>
        <p className="text-zinc-400">
          Contact Page
        </p>
      </div>
    </div>
  );
}
