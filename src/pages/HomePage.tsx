import React from "react";
import Toolbar from "../features/items/components/Toolbar";
import ItemList from "../features/items/components/ItemList";
import ItemFormModal from "../features/items/components/ItemFormModal";
import DeleteConfirm from "../features/items/components/DeleteConfirm";
import type { Item } from "../features/items/model/types";
import { useItemsStore } from "../features/items/store/items.store";

export default function HomePage() {
  const [isModalOpen, setModalOpen] = React.useState(false);
  const [editing, setEditing] = React.useState<Item | null>(null);
  const [isDeleteOpen, setDeleteOpen] = React.useState(false);
  const [toDeleteId, setToDeleteId] = React.useState<string | null>(null);
  const remove = useItemsStore((s) => s.removeItemLocal);

  const handleCreate = () => {
    setEditing(null);
    setModalOpen(true);
  };

  const handleEdit = (item: Item) => {
    setEditing(item);
    setModalOpen(true);
  };

  const handleDelete = (id: string) => {
    setToDeleteId(id);
    setDeleteOpen(true);
  };

  const confirmDelete = () => {
    if (toDeleteId) remove(toDeleteId);
    setToDeleteId(null);
  };

  return (
    <main className="max-w-[1120px] mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">SavvyTech – List</h1>
        <p className="text-sm text-slate-500 mt-1">
          View and manage your items
        </p>
      </div>

      <Toolbar onCreate={handleCreate} />
      <ItemList onEdit={handleEdit} onDelete={handleDelete} />

      <ItemFormModal
        open={isModalOpen}
        onOpenChange={setModalOpen}
        editing={editing}
      />
      <DeleteConfirm
        open={isDeleteOpen}
        onOpenChange={setDeleteOpen}
        onConfirm={confirmDelete}
      />
    </main>
  );
}
