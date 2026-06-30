import { Search } from "lucide-react";

type Filter = "all" | "completed" | "pending";

interface Props {
  search: string;
  onSearchChange: (value: string) => void;
  filter: Filter;
  onFilterChange: (value: Filter) => void;
}

const FILTERS: { label: string; value: Filter }[] = [
  { label: "All", value: "all" },
  { label: "Completed", value: "completed" },
  { label: "Pending", value: "pending" },
];

export default function TaskFilters({
  search,
  onSearchChange,
  filter,
  onFilterChange,
}: Props) {
  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 px-4 sm:px-6 py-3 sm:py-4 min-w-0">
      {/* Search */}
      <div className="relative min-w-0 flex-1">
        <Search
          size={15}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
        />
        <input
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search tasks…"
          className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Filter tabs */}
      <div className="flex flex-shrink-0 border border-gray-200 rounded-lg overflow-hidden">
        {FILTERS.map((f) => (
          <button
            key={f.value}
            onClick={() => onFilterChange(f.value)}
            className={`flex-1 sm:flex-none px-3 sm:px-4 py-2 text-sm transition-colors whitespace-nowrap ${
              filter === f.value
                ? "bg-blue-600 text-white font-medium"
                : "bg-white text-gray-500 hover:bg-gray-50"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>
    </div>
  );
}