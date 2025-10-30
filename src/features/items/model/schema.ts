import { z } from "zod";

export const itemSchema = z.object({
  title: z.string().min(1, "Title is required").max(80, "Max 80 chars"),
  subtitle: z.string().max(160).optional(),
});

export type ItemForm = z.infer<typeof itemSchema>;
