import React from "react";
import { useItemsStore } from "../store/items.store";
import ItemCard from "./ItemCard";
import EmptyState from "./EmptyState";
import type { Item } from "../model/types";

export default function ItemList({
  onEdit,
  onDelete,
}: {
  onEdit: (item: Item) => void;
  onDelete: (id: string) => void;
}) {
  const items = useItemsStore((s) => s.items);
  const query = useItemsStore((s) => s.query);
  const sort = useItemsStore((s) => s.sort);

  // derived filtered & sorted
  const filtered = React.useMemo(() => {
    const q = query?.trim().toLowerCase();
    let list = items;
    if (q) {
      list = list.filter((i) =>
        (i.title + " " + (i.subtitle || "")).toLowerCase().includes(q)
      );
    }
    list = list
      .slice()
      .sort((a, b) =>
        sort === "newest"
          ? b.createdAt.localeCompare(a.createdAt)
          : a.createdAt.localeCompare(b.createdAt)
      );
    return list;
  }, [items, query, sort]);

  if (!filtered || filtered.length === 0) {
    return <EmptyState onCreate={() => {}} />;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {filtered.map((item) => (
        <ItemCard
          key={item.id}
          item={item}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
