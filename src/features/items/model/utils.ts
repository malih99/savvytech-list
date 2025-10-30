import { nanoid } from "nanoid";
import type { Item } from "./types";

export const createItem = (data: {
  title: string;
  subtitle?: string;
  category?: string;
  image?: string | null;
}): Item => {
  const now = new Date().toISOString();
  return {
    id: nanoid(),
    title: data.title,
    subtitle: data.subtitle,
    category: data.category,
    image: data.image ?? null,
    createdAt: now,
    updatedAt: now,
  };
};
