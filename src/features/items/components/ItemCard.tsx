import { Edit2, Trash2 } from "lucide-react";
import type { Item } from "@/features/items/model/types";

export default function ItemCard({
  item,
  onEdit,
  onRequestDelete,
  onOpenDetails,
}: {
  item: Item;
  onEdit: (item: Item) => void;
  onRequestDelete: () => void;
  onOpenDetails?: (item: Item) => void;
}) {
  return (
    <div
      className="rounded-xl border bg-white shadow-sm hover:shadow-md cursor-pointer overflow-hidden"
      onClick={() => onOpenDetails?.(item)}
    >
      {item.image && (
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-40 object-cover"
        />
      )}
      <div className="p-4">
        <h3 className="text-lg font-semibold">{item.title}</h3>
        <p className="text-sm text-slate-500">{item.subtitle}</p>
        <div className="mt-3 flex gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit(item);
            }}
            className="text-blue-600 hover:underline flex items-center gap-1"
          >
            <Edit2 size={14} /> Edit
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onRequestDelete();
            }}
            className="text-red-600 hover:underline flex items-center gap-1"
          >
            <Trash2 size={14} /> Delete
          </button>
        </div>
      </div>
    </div>
  );
}
