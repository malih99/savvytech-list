import React from "react";
import { useItemsStore } from "../store/items.store";
import ItemCard from "./ItemCard";
import DeleteConfirm from "./DeleteConfirm";
import EmptyState from "./EmptyState";
import type { Item } from "../model/types";
import toast from "react-hot-toast";

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
  const removeItemLocal = useItemsStore((s) => s.removeItemLocal);
  const [deleteTarget, setDeleteTarget] = React.useState<string | null>(null);
  const [mockCreated, setMockCreated] = React.useState(false);
  const query = useItemsStore((s) => s.query);
  const sort = useItemsStore((s) => s.sort);

  React.useEffect(() => {
    const currentItems = useItemsStore.getState().items;

    if (currentItems.length === 0 && !deleteTarget && !mockCreated) {
      const now = new Date().toISOString();
      const mockItems: Item[] = [
        {
          id: "mock1",
          title: "Sample Item 1",
          subtitle: "Description 1",
          createdAt: now,
          image: "/images/p1.jpg",
        },
        {
          id: "mock2",
          title: "Sample Item 2",
          subtitle: "Description 2",
          createdAt: now,
          image: "/images/p2.jpg",
        },
        {
          id: "mock3",
          title: "Sample Item 3",
          subtitle: "Description 3",
          createdAt: now,
          image: "/images/p3.jpg",
        },
      ];
      mockItems.forEach(useItemsStore.getState().createItemLocal);
      setMockCreated(true);
    }
  }, [deleteTarget, mockCreated]);

  React.useEffect(() => {
    const store = useItemsStore.getState();
    const hasRealItem = store.items.some((i) => !i.id.startsWith("mock"));
    if (hasRealItem) {
      store.items
        .filter((i) => i.id.startsWith("mock"))
        .forEach((m) => store.removeItemLocal(m.id));
    }
  }, [items]);

  const handleCreate = (newItem: Item) => {
    const store = useItemsStore.getState();
    const hasMock = store.items.some((i) => i.id.startsWith("mock"));
    if (hasMock) {
      store.items
        .filter((i) => i.id.startsWith("mock"))
        .forEach((m) => store.removeItemLocal(m.id));
    }
    store.createItemLocal(newItem);
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

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {filtered.map((item) => (
        <ItemCard
          key={item.id}
          item={item}
          onEdit={onEdit}
          onRequestDelete={() => setDeleteTarget(item.id)}
          onOpenDetails={onOpenDetails}
        />
      ))}

      <DeleteConfirm
        open={!!deleteTarget}
        onOpenChange={(v) => {
          if (!v) setDeleteTarget(null);
        }}
        onConfirm={() => {
          if (deleteTarget) {
            removeItemLocal(deleteTarget);
            onDelete?.(deleteTarget);
            toast.success("Item deleted");
            setDeleteTarget(null);
          }
        }}
      />
    </div>
  );
}
