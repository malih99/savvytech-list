export type ItemId = string;
export interface Item {
  id: ItemId;
  title: string;
  subtitle?: string;
  category?: string;
  image?: string | null;
  createdAt: string;
  updatedAt?: string;
}
export type Sort = "newest" | "oldest";
