import React from "react";
import { LucidePlus, LucideSearch } from "lucide-react";
import Button from "@/components/ui/Button";
import { useItemsStore } from "@/features/items/store/items.store";

export default function Toolbar({ onCreate }: { onCreate: () => void }) {
  const setQuery = useItemsStore((s) => s.setQuery);
  const setSort = useItemsStore((s) => s.setSort);
  const query = useItemsStore((s) => s.query);
  const sort = useItemsStore((s) => s.sort);

  const [search, setSearch] = React.useState(query);

  React.useEffect(() => {
    const t = window.setTimeout(() => setQuery(search), 200);
    return () => window.clearTimeout(t);
  }, [search, setQuery]);

  const handleSearchChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(e.target.value);
    },
    []
  );

  const handleSortChange = React.useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setSort(e.target.value as "newest" | "oldest");
    },
    [setSort]
  );

  const handleCreateClick = React.useCallback(() => {
    onCreate();
  }, [onCreate]);

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
      <div className="flex items-center gap-3 w-full sm:w-auto">
        <div className="relative flex items-center w-full">
          {/* Search input */}
          <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <LucideSearch size={16} />
          </span>
          <input
            value={search}
            onChange={handleSearchChange}
            placeholder="Search by title or subtitle"
            className="pl-10 pr-3 h-12 w-full rounded-lg border border-slate-200 bg-white text-sm focus:ring-2 focus:ring-brand-500"
            aria-label="Search items"
          />

          <label htmlFor="sort-select" className="sr-only">
            Sort
          </label>
          <select
            id="sort-select"
            value={sort}
            onChange={handleSortChange}
            className="ml-3 h-10 px-3 rounded-lg border border-slate-200 bg-white text-sm focus:outline-none"
            aria-label="Select sort order"
            title={sort === "newest" ? "Newest first" : "Oldest first"}
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
          </select>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button onClick={handleCreateClick}>
          <LucidePlus size={16} /> Create
        </Button>
      </div>
    </div>
  );
}
