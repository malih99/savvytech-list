import { nanoid } from "nanoid";
import type { Item } from "./types";

export const createItem = (data: {
  title: string;
  subtitle?: string;
}): Item => {
  const now = new Date().toISOString();
  return {
    id: nanoid(),
    title: data.title,
    subtitle: data.subtitle,
    createdAt: now,
    updatedAt: now,
  };
};

export const formatDate = (iso: string) =>
  new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(iso));
