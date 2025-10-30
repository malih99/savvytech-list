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
import toast from "react-hot-toast";

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

  const { register, handleSubmit, reset, formState, setValue, watch } =
    useForm<ItemForm>({
      resolver: zodResolver(itemSchema),
      defaultValues: {
        title: "",
        subtitle: "",
        category: "",
        image: undefined,
      },
      mode: "onChange",
    });

  // Reset form when editing changes or when the modal opens
  React.useEffect(() => {
    if (editing) {
      reset({
        title: editing.title,
        subtitle: editing.subtitle,
        category: editing.category ?? "",
        image: editing.image ?? undefined,
      });
    } else {
      // when opening for create
      reset({ title: "", subtitle: "", category: "", image: undefined });
    }
  }, [editing, reset]);

  // When modal is closed, always clear the form so next open is clean
  React.useEffect(() => {
    if (!open) {
      reset({ title: "", subtitle: "", category: "", image: undefined });
    }
  }, [open, reset]);

  const handleFile = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () =>
        setValue("image", reader.result as string, { shouldValidate: true });
      reader.readAsDataURL(file);
    },
    [setValue]
  );

  const onSubmit = React.useCallback(
    (data: ItemForm) => {
      if (editing) {
        updateLocal({
          ...editing,
          title: data.title,
          subtitle: data.subtitle,
          category: data.category,
          image: data.image ?? null,
          updatedAt: new Date().toISOString(),
        });
        toast.success("Item updated");
      } else {
        const it = createItem({
          title: data.title,
          subtitle: data.subtitle,
          category: data.category,
          image: data.image ?? null,
        });
        createLocal(it);
        toast.success("Item created");
      }

      // reset form and close modal
      reset({ title: "", subtitle: "", category: "", image: undefined });
      onOpenChange(false);
      onSaved?.();
    },
    [editing, updateLocal, createLocal, reset, onOpenChange, onSaved]
  );

  // bind handleSubmit once so we don't inline an anonymous in JSX
  const onFormSubmit = React.useCallback(() => {
    void handleSubmit(onSubmit)();
  }, [handleSubmit, onSubmit]);

  const imagePreview = watch("image");

  const handleCancel = React.useCallback(() => {
    onOpenChange(false);
  }, [onOpenChange]);

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Overlay asChild>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/40 z-50"
        />
      </Dialog.Overlay>

      <Dialog.Content asChild>
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.16 }}
          className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-white rounded-2xl p-6 shadow-xl z-50"
        >
          <Dialog.Title className="text-lg font-semibold">
            {editing ? "Edit Item" : "Create Item"}
          </Dialog.Title>

          <form onSubmit={onFormSubmit} className="mt-4 flex flex-col gap-3">
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

            <input
              {...register("category")}
              placeholder="Category (e.g. Design, Research)"
              className="h-10 rounded-md border px-3"
              aria-label="Category"
            />

            <input type="file" accept="image/*" onChange={handleFile} />

            {imagePreview && (
              <img
                src={imagePreview}
                alt="preview"
                className="w-full h-40 object-cover rounded-md"
              />
            )}

            <div className="flex justify-end gap-2 mt-2">
              <Button variant="secondary" type="button" onClick={handleCancel}>
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
