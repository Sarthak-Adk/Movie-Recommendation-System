"use client";

import { Search, X } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative mx-auto max-w-3xl px-4 sm:px-6">
      <div className="flex items-center rounded-full border border-zinc-800 bg-zinc-900/80 px-5 py-3 shadow-lg backdrop-blur-sm">
        <Search className="mr-3 shrink-0 text-zinc-400" size={20} />

        <input
          type="text"
          placeholder="Search movies..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-transparent text-white outline-none placeholder:text-zinc-500"
        />

        {value && (
          <button
            type="button"
            onClick={() => onChange("")}
            className="ml-2 rounded-full p-1 text-zinc-400 transition hover:bg-zinc-800 hover:text-white"
            aria-label="Clear search"
          >
            <X size={18} />
          </button>
        )}
      </div>
    </div>
  );
}
