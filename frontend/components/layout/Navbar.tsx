"use client";

import Link from "next/link";
import { Film } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-zinc-800 bg-black/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 transition hover:opacity-90">
          <Film className="text-yellow-400" size={28} />
          <span className="text-xl font-bold text-white">
            Movie<span className="text-yellow-400">Hub</span>
          </span>
        </Link>

        <div className="flex items-center gap-4 sm:gap-6">
          <Link
            href="/"
            className="text-sm font-medium text-zinc-300 transition hover:text-yellow-400"
          >
            Home
          </Link>
          <Link
            href="/recommendations"
            className="text-sm font-medium text-zinc-300 transition hover:text-yellow-400"
          >
            Recommendations
          </Link>
        </div>
      </div>
    </nav>
  );
}
