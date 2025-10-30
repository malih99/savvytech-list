import React from "react";
import { useForm } from "react-hook-form";
import { useDebounce } from "use-debounce";
import { LucidePlus, LucideSearch } from "lucide-react";
import Button from "../../../components/ui/Button";
import { useItemsStore } from "../store/items.store";
import IconButton from "../../../components/ui/IconButton";

export default function Toolbar({ onCreate }: { onCreate: () => void }) {
  const setQuery = useItemsStore((s) => s.setQuery);
  const setSort = useItemsStore((s) => s.setSort);
  const query = useItemsStore((s) => s.query);
  // simple local state for search
  const [search, setSearch] = React.useState(query);
  React.useEffect(() => {
    const t = setTimeout(() => setQuery(search), 200);
    return () => clearTimeout(t);
  }, [search, setQuery]);

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
        <div className="hidden sm:flex gap-2 items-center">
          <select
            value={useItemsStore.getState().sort}
            onChange={(e) => setSort(e.target.value as any)}
            className="h-12 rounded-lg border border-slate-200 px-3"
            aria-label="Sort"
          >
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
          </select>
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
