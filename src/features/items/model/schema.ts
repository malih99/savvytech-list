import { z } from "zod";

export const itemSchema = z.object({
  title: z.string().min(1, "Title is required").max(80, "Max 80 chars"),
  subtitle: z.string().max(160).optional(),
  category: z.string().max(50).optional(),
  image: z.string().optional(),
});
export type ItemForm = z.infer<typeof itemSchema>;
