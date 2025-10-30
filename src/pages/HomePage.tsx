import React from "react";
import Toolbar from "../features/items/components/Toolbar";
import ItemList from "../features/items/components/ItemList";
import ItemFormModal from "../features/items/components/ItemFormModal";
import DeleteConfirm from "../features/items/components/DeleteConfirm";
import type { Item } from "../features/items/model/types";
import { useItemsStore } from "../features/items/store/items.store";
import ItemDetailsModal from "../features/items/components/ItemDetailsModal";
export default function HomePage() {
  const [isModalOpen, setModalOpen] = React.useState(false);
  const [detailsOpen, setDetailsOpen] = React.useState(false);
  const [detailsItem, setDetailsItem] = React.useState<Item | null>(null);
  const [editing, setEditing] = React.useState<Item | null>(null);
  const [isDeleteOpen, setDeleteOpen] = React.useState(false);
  const [toDeleteId, setToDeleteId] = React.useState<string | null>(null);
  const remove = useItemsStore((s) => s.removeItemLocal);

  React.useEffect(() => {
    if (!isModalOpen) {
      setEditing(null);
    }
  }, [isModalOpen]);

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

  const handleOpenDetails = (item: Item) => {
    setDetailsItem(item);
    setDetailsOpen(true);
  };

  const handleEditFromDetails = (item: Item) => {
    setEditing(item);
    setModalOpen(true);
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
      <ItemList
        onEdit={handleEdit}
        onDelete={handleDelete}
        onOpenDetails={handleOpenDetails}
      />

      <ItemFormModal
        open={isModalOpen}
        onOpenChange={setModalOpen}
        editing={editing}
        onSaved={() => {
          setEditing(null);
        }}
      />
      <DeleteConfirm
        open={isDeleteOpen}
        onOpenChange={setDeleteOpen}
        onConfirm={confirmDelete}
      />

      <ItemDetailsModal
        item={detailsItem}
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
        onEdit={(item) => handleEditFromDetails(item)}
        onDelete={(id) => {
          remove(id);
          setDetailsOpen(false);
        }}
      />
    </main>
  );
}
