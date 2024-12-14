import { Search } from "lucide-react";

export function SearchBar({ onSearch }) {
  return (
    <div className="flex-1 min-w-[300px]">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 h-5 w-5" />
        <input
          type="text"
          placeholder="Search products..."
          onChange={(e) => onSearch(e.target.value)}
          className="w-full pl-12 pr-4 py-3 bg-neutral-800 border border-neutral-700 rounded-xl focus:outline-none focus:border-indigo-500 text-neutral-100 placeholder-neutral-400 transition-colors"
        />
      </div>
    </div>
  );
}
