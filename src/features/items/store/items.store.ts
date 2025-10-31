import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Item, Sort } from "@/features/items/model/types";

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

  categories: string[];
  createCategory: (name: string) => void;
  updateCategory: (oldName: string, newName: string) => void;
  removeCategory: (name: string) => void;
}

export const useItemsStore = create<State>()(
  persist(
    (set, get) => ({
      // items
      items: [],
      query: "",
      sort: "newest",
      createItemLocal: (item: Item) => {
        set((state) => {
          console.trace("[store] createItemLocal called for", item.id);
          if (state.items.some((i) => i.id === item.id)) {
            console.warn(
              "[store] createItemLocal skipped, id exists ->",
              item.id
            );
            return state;
          }
          return { ...state, items: [item, ...state.items] };
        });
      },

      updateItemLocal: (item: Item) => {
        set((state) => ({
          ...state,
          items: state.items.map((i) =>
            i.id === item.id
              ? { ...item, updatedAt: new Date().toISOString() }
              : i
          ),
        }));
      },

      removeItemLocal: (id: string) => {
        set((state) => ({
          ...state,
          items: state.items.filter((i) => i.id !== id),
        }));
      },
      setQuery: (q: string) => set({ query: q }),
      setSort: (s: Sort) => set({ sort: s }),
      hydrate: (items: Item[]) => set({ items }),

      categories: [],

      createCategory: (name: string) => {
        const trimmed = name.trim();
        if (!trimmed) return;
        const exists = get().categories.includes(trimmed);
        if (exists) return;
        set({ categories: [...get().categories, trimmed] });
      },

      updateCategory: (oldName: string, newName: string) => {
        const trimmed = newName.trim();
        if (!trimmed) return;
        set({
          categories: get().categories.map((c) =>
            c === oldName ? trimmed : c
          ),
        });
      },

      removeCategory: (name: string) => {
        set({ categories: get().categories.filter((c) => c !== name) });
      },
    }),
    { name: "savvytech-items" }
  )
);
