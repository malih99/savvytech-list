import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Item, Sort } from "../model/types";

interface State {
  items: Item[];
  query: string;
  sort: Sort;
  createItemLocal: (item: Item) => void;
  updateItemLocal: (item: Item) => void;
  removeItemLocal: (id: string) => void;
  setQuery: (q: string) => void;
  setSort: (s: Sort) => void;
  hydrate: (items: Item[]) => void;
}

export const useItemsStore = create<State>()(
  persist(
    (set, get) => ({
      items: [],
      query: "",
      sort: "newest",
      createItemLocal: (item) => set({ items: [item, ...get().items] }),
      updateItemLocal: (item) =>
        set({
          items: get().items.map((i) =>
            i.id === item.id
              ? { ...item, updatedAt: new Date().toISOString() }
              : i
          ),
        }),
      removeItemLocal: (id) =>
        set({ items: get().items.filter((i) => i.id !== id) }),
      setQuery: (q) => set({ query: q }),
      setSort: (s) => set({ sort: s }),
      hydrate: (items) => set({ items }),
    }),
    { name: "savvytech-items" }
  )
);
