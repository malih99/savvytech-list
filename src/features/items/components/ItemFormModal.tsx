import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { itemSchema } from "../../items/model/schema";
import type { ItemForm } from "../../items/model/schema";
import Button from "../../../components/ui/Button";
import { motion } from "framer-motion";
import { createItem } from "../model/utils";
import type { Item } from "../model/types";
import { useItemsStore } from "../store/items.store";

export default function ItemFormModal({
  open,
  onOpenChange,
  editing,
  onSaved,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  editing?: Item | null;
  onSaved?: () => void;
}) {
  const createLocal = useItemsStore((s) => s.createItemLocal);
  const updateLocal = useItemsStore((s) => s.updateItemLocal);

  const { register, handleSubmit, reset, formState } = useForm<ItemForm>({
    resolver: zodResolver(itemSchema),
    defaultValues: { title: "", subtitle: "" },
  });

  React.useEffect(() => {
    if (editing) {
      reset({ title: editing.title, subtitle: editing.subtitle });
    } else {
      reset({ title: "", subtitle: "" });
    }
  }, [editing, reset]);

  const onSubmit = (data: ItemForm) => {
    if (editing) {
      updateLocal({
        ...editing,
        title: data.title,
        subtitle: data.subtitle,
        updatedAt: new Date().toISOString(),
      });
    } else {
      const it = createItem({ title: data.title, subtitle: data.subtitle });
      createLocal(it);
      reset({});
    }
    onOpenChange(false);
    onSaved?.();
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Overlay asChild>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/40"
        />
      </Dialog.Overlay>

      <Dialog.Content asChild>
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.16 }}
          className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-white rounded-2xl p-6 shadow-xl"
        >
          <Dialog.Title className="text-lg font-semibold">
            {editing ? "Edit Item" : "Create Item"}
          </Dialog.Title>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-4 flex flex-col gap-3"
          >
            <input
              {...register("title")}
              placeholder="Title"
              className="h-12 rounded-md border px-3"
              aria-label="Title"
            />
            <textarea
              {...register("subtitle")}
              placeholder="Subtitle"
              rows={3}
              className="rounded-md border px-3 py-2 !resize-none"
            />
            <div className="flex justify-end gap-2 mt-2">
              <Button
                variant="secondary"
                type="button"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={!formState.isValid}>
                {editing ? "Save" : "Create"}
              </Button>
            </div>
          </form>
        </motion.div>
      </Dialog.Content>
    </Dialog.Root>
  );
}
