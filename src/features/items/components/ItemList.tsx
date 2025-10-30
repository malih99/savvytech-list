import React from "react";
import { useItemsStore } from "../store/items.store";
import ItemCard from "./ItemCard";
import EmptyState from "./EmptyState";
import type { Item } from "../model/types";

const PERSIST_KEY = "savvytech-items"; // باید با name گزینه persist در store برابر باشد

export default function ItemList({
  onEdit,
  onDelete,
  onOpenDetails,
}: {
  onEdit: (item: Item) => void;
  onDelete: (id: string) => void;
  onOpenDetails?: (item: Item) => void;
}) {
  const items = useItemsStore((s) => s.items);
  const createItemLocal = useItemsStore((s) => s.createItemLocal);
  const removeItemLocal = useItemsStore((s) => s.removeItemLocal);
  const query = useItemsStore((s) => s.query);
  const sort = useItemsStore((s) => s.sort);

  // === اضافه کردن ماک‌ها فقط یکبار در mount ===
  React.useEffect(() => {
    // اگر دادهٔ persisted وجود داره، از اضافه کردن ماک خودداری کن
    try {
      const raw = localStorage.getItem(PERSIST_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        // ساختار persist معمولاً { state: { items: [...] , ... } , version: ... }
        const persistedItems = parsed?.state?.items;
        if (Array.isArray(persistedItems) && persistedItems.length > 0) {
          return; // دادهٔ واقعی وجود داره، ماک لازم نیست
        }
      }
    } catch (e) {
      // ignore parse errors and fall back to checking current in-memory items
    }

    // اگر هم در localStorage چیزی نبود و در حافظه هم آیتمی نداریم -> ماک اضافه کن
    const currentItems = useItemsStore.getState().items;
    if (currentItems.length === 0) {
      const now = new Date().toISOString();
      const mockItems: Item[] = [
        {
          id: "mock1",
          title: "Sample Item 1",
          subtitle: "Description 1",
          createdAt: now,
        },
        {
          id: "mock2",
          title: "Sample Item 2",
          subtitle: "Description 2",
          createdAt: now,
        },
        {
          id: "mock3",
          title: "Sample Item 3",
          subtitle: "Description 3",
          createdAt: now,
        },
      ];
      mockItems.forEach(createItemLocal);
    }
  }, [createItemLocal]);

  const handleCreate = (newItem: Item) => {
    const stateItems = useItemsStore.getState().items.slice(); // snapshot
    stateItems
      .filter((i) => i.id.startsWith("mock"))
      .forEach((m) => removeItemLocal(m.id));

    createItemLocal(newItem);
  };

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

  if (filtered.length === 0) {
    return (
      <EmptyState
        onCreate={() =>
          handleCreate({
            id: `user-${Date.now()}`,
            title: "New Item",
            subtitle: "",
            createdAt: new Date().toISOString(),
          })
        }
      />
    );
  }

  // === رندر آیتم‌ها ===
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {filtered.map((item) => (
        <ItemCard
          key={item.id}
          item={item}
          onEdit={onEdit}
          onDelete={(id) => {
            removeItemLocal(id);
            onDelete?.(id);
          }}
          onOpenDetails={onOpenDetails}
        />
      ))}
    </div>
  );
}
