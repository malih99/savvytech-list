export type ItemId = string;
export interface Item {
  id: ItemId;
  title: string;
  subtitle?: string;
  createdAt: string;
  updatedAt?: string;
}
export type Sort = "newest" | "oldest";
