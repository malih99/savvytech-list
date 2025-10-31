import React from "react";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button";

export default function DeleteConfirm({
  open,
  onOpenChange,
  onConfirm,
  title = "Delete item?",
  description = "This action can't be undone.",
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  onConfirm: () => void;
  title?: string;
  description?: string;
}) {
  const handleCancel = React.useCallback(() => {
    onOpenChange(false);
  }, [onOpenChange]);

  const handleDelete = React.useCallback(() => {
    onOpenChange(false);
    window.setTimeout(() => {
      try {
        onConfirm();
      } catch {
        // ignore
      }
    }, 100);
  }, [onOpenChange, onConfirm]);

  return (
    <AlertDialog.Root open={open} onOpenChange={onOpenChange}>
      <AlertDialog.Overlay asChild>
        <motion.div
          className="fixed inset-0 bg-black/40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />
      </AlertDialog.Overlay>

      <AlertDialog.Content asChild>
        <motion.div
          className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-2xl p-6 shadow-xl z-50"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
        >
          <AlertDialog.Title className="text-lg font-semibold">
            {title}
          </AlertDialog.Title>
          <AlertDialog.Description className="mt-2 text-sm text-slate-600">
            {description}
          </AlertDialog.Description>

          <div className="mt-4 flex justify-end gap-2">
            <Button variant="secondary" onClick={handleCancel}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </div>
        </motion.div>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
}
