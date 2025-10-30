import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import Button from "../../../components/ui/Button";
import IconButton from "../../../components/ui/IconButton";
import { Edit2, Trash2, Plus } from "lucide-react";
import { useItemsStore } from "../store/items.store";
import toast from "react-hot-toast";

export default function CategoryManager({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const categories = useItemsStore((s) => s.categories);
  const createCategory = useItemsStore((s) => s.createCategory);
  const updateCategory = useItemsStore((s) => s.updateCategory);
  const removeCategory = useItemsStore((s) => s.removeCategory);

  const [newName, setNewName] = React.useState("");
  const [editing, setEditing] = React.useState<string | null>(null);
  const [editValue, setEditValue] = React.useState("");

  const handleCreate = () => {
    if (!newName.trim()) return;
    createCategory(newName.trim());
    toast.success("Category added");
    setNewName("");
  };

  const startEdit = (name: string) => {
    setEditing(name);
    setEditValue(name);
  };

  const confirmEdit = () => {
    if (!editing) return;
    updateCategory(editing, editValue.trim());
    toast.success("Category updated");
    setEditing(null);
    setEditValue("");
  };

  const handleRemove = (name: string) => {
    removeCategory(name);
    toast.success("Category removed");
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Overlay className="fixed inset-0 bg-black/40" />
      <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-2xl p-6 shadow-xl">
        <Dialog.Title className="text-lg font-semibold">
          Manage Categories
        </Dialog.Title>

        <div className="mt-4 flex gap-2">
          <input
            className="flex-1 rounded-md border px-3 h-10"
            placeholder="New category"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
          <Button onClick={handleCreate}>
            <Plus size={14} /> Add
          </Button>
        </div>

        <ul className="mt-4 space-y-2 max-h-64 overflow-auto">
          {categories.length === 0 && (
            <div className="text-sm text-slate-500">No categories yet.</div>
          )}
          {categories.map((c) => (
            <li key={c} className="flex items-center justify-between gap-2">
              {editing === c ? (
                <div className="flex-1 flex gap-2">
                  <input
                    className="flex-1 rounded-md border px-2 h-9"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                  />
                  <Button onClick={confirmEdit}>Save</Button>
                  <Button
                    variant="secondary"
                    onClick={() => {
                      setEditing(null);
                      setEditValue("");
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              ) : (
                <>
                  <div className="flex-1">{c}</div>
                  <div className="flex gap-2">
                    <IconButton
                      aria-label={`Edit ${c}`}
                      onClick={() => startEdit(c)}
                    >
                      <Edit2 size={14} />
                    </IconButton>
                    <IconButton
                      aria-label={`Remove ${c}`}
                      onClick={() => handleRemove(c)}
                    >
                      <Trash2 size={14} />
                    </IconButton>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>

        <div className="mt-4 flex justify-end">
          <Button variant="secondary" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </div>
      </Dialog.Content>
    </Dialog.Root>
  );
}
