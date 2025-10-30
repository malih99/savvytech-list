import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { motion } from "framer-motion";
import Button from "../../../components/ui/Button";
import { formatDate } from "../model/utils";
import type { Item } from "../model/types";

export default function ItemDetailsModal({
  item,
  open,
  onOpenChange,
  onEdit,
  onDelete,
}: {
  item?: Item | null;
  open: boolean;
  onOpenChange: (v: boolean) => void;
  onEdit: (item: Item) => void;
  onDelete: (id: string) => void;
}) {
  if (!item) return null;

  const handleClose = React.useCallback(() => {
    onOpenChange(false);
  }, [onOpenChange]);

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
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.18 }}
          className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl bg-white rounded-2xl p-6 shadow-xl overflow-y-auto max-h-[90vh] z-50"
        >
          <div className="flex flex-col sm:flex-row gap-4">
            {item.image && (
              <div className="w-full sm:w-1/3 h-44 overflow-hidden rounded-md">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div className="flex-1">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="text-xl font-semibold">{item.title}</h2>
                  {item.category && (
                    <div className="mt-2">
                      <span className="text-xs inline-block px-2 py-1 rounded-md border bg-slate-50">
                        {item.category}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <p className="mt-4 text-sm text-slate-600">{item.subtitle}</p>

              <div className="mt-6 text-sm text-slate-500">
                Created: {formatDate(item.createdAt)}
                {item.updatedAt && (
                  <div>Updated: {formatDate(item.updatedAt)}</div>
                )}
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </div>
        </motion.div>
      </Dialog.Content>
    </Dialog.Root>
  );
}
