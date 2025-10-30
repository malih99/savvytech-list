import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Item, Sort } from "../model/types";

interface State {
  items: Item[];
  query: string;
  sort: Sort;
  categories: string[]; // NEW
  selectedCategories: string[]; // NEW (for filtering)
  // actions
  createItemLocal: (item: Item) => void;
  updateItemLocal: (item: Item) => void;
  removeItemLocal: (id: string) => void;
  setQuery: (q: string) => void;
  setSort: (s: Sort) => void;
  hydrate: (items: Item[]) => void;
  // category actions
  createCategory: (name: string) => void;
  updateCategory: (oldName: string, newName: string) => void;
  removeCategory: (name: string) => void;
  toggleSelectedCategory: (name: string) => void;
  clearSelectedCategories: () => void;
}

export const useItemsStore = create<State>()(
  persist(
    (set, get) => ({
      items: [],
      query: "",
      sort: "newest",
      categories: [], // persisted
      selectedCategories: [],

      createItemLocal: (item) => set({ items: [item, ...get().items] }),
      updateItemLocal: (item) =>
        set({
          items: get().items.map((i) =>
            i.id === item.id
              ? { ...item, ...item, updatedAt: new Date().toISOString() }
              : i
          ),
        }),
      removeItemLocal: (id) =>
        set({ items: get().items.filter((i) => i.id !== id) }),
      setQuery: (q) => set({ query: q }),
      setSort: (s) => set({ sort: s }),
      hydrate: (items) => set({ items }),

      // CATEGORY ACTIONS
      createCategory: (name) =>
        set((state) => {
          if (!name.trim()) return state;
          if (state.categories.includes(name)) return state; // prevent duplicates
          return { categories: [...state.categories, name] };
        }),
      updateCategory: (oldName, newName) =>
        set((state) => {
          if (!newName.trim()) return state;
          const categories = state.categories.map((c) =>
            c === oldName ? newName : c
          );
          // update items that used oldName to newName
          const items = state.items.map((it) =>
            it.category === oldName ? { ...it, category: newName } : it
          );
          return { categories, items };
        }),
      removeCategory: (name) =>
        set((state) => {
          const categories = state.categories.filter((c) => c !== name);
          // optionally clear category on items or keep unchanged; here we clear
          const items = state.items.map((it) =>
            it.category === name ? { ...it, category: undefined } : it
          );
          return {
            categories,
            items,
            selectedCategories: state.selectedCategories.filter(
              (s) => s !== name
            ),
          };
        }),
      toggleSelectedCategory: (name) =>
        set((state) => {
          const exists = state.selectedCategories.includes(name);
          return {
            selectedCategories: exists
              ? state.selectedCategories.filter((s) => s !== name)
              : [...state.selectedCategories, name],
          };
        }),
      clearSelectedCategories: () => set({ selectedCategories: [] }),
    }),
    { name: "savvytech-items" }
  )
);
