import React from "react";
import { LucidePlus, LucideSearch, ArrowUpDown } from "lucide-react";
import Button from "../../../components/ui/Button";
import IconButton from "../../../components/ui/IconButton";
import { useItemsStore } from "../store/items.store";

export default function Toolbar({ onCreate }: { onCreate: () => void }) {
  const setQuery = useItemsStore((s) => s.setQuery);
  const setSort = useItemsStore((s) => s.setSort);
  const query = useItemsStore((s) => s.query);
  const sort = useItemsStore((s) => s.sort);

  const [search, setSearch] = React.useState(query);
  React.useEffect(() => {
    const t = setTimeout(() => setQuery(search), 200);
    return () => clearTimeout(t);
  }, [search, setQuery]);

  const toggleSort = () => {
    setSort(sort === "newest" ? "oldest" : "newest");
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
      <div className="flex items-center gap-3 w-full sm:w-auto">
        <div className="relative w-full">
          <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <LucideSearch size={16} />
          </span>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title or subtitle"
            className="pl-10 pr-3 h-12 w-full rounded-lg border border-slate-200 bg-white text-sm focus:ring-2 focus:ring-brand-500"
          />
        </div>

        {/* visible on wide screens: sort pill + create button */}
        <div className="hidden sm:flex gap-2 items-center">
          {/* sort pill like image */}
          <button
            onClick={toggleSort}
            className="flex items-center gap-2 h-12 px-4 rounded-lg border border-slate-200 bg-white"
            aria-label="Toggle sort"
            title={sort === "newest" ? "Newest first" : "Oldest first"}
          >
            <ArrowUpDown size={16} />
            <span className="text-sm">
              {sort === "newest" ? "Newest first" : "Oldest first"}
            </span>
          </button>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button onClick={onCreate}>
          <LucidePlus size={16} /> Create
        </Button>
      </div>
    </div>
  );
}
