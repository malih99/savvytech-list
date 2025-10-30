import type { Item } from "../model/types";
import { formatDate } from "../model/utils";
import IconButton from "../../../components/ui/IconButton";
import { Edit2, Trash2 } from "lucide-react";

export default function ItemCard({
  item,
  onEdit,
  onDelete,
  onOpenDetails,
}: {
  item: Item;
  onEdit: (item: Item) => void;
  onDelete: (id: string) => void;
  onOpenDetails?: (item: Item) => void;
}) {
  return (
    <article
      className="card cursor-pointer"
      onClick={() => onOpenDetails?.(item)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onOpenDetails?.(item);
      }}
    >
      <div className="card-actions">
        <IconButton
          aria-label="Edit"
          onClick={(e) => {
            e.stopPropagation();
            onEdit(item);
          }}
        >
          <Edit2 size={16} />
        </IconButton>

        <IconButton
          aria-label="Delete"
          onClick={(e) => {
            e.stopPropagation();
            onDelete(item.id);
          }}
        >
          <Trash2 size={16} />
        </IconButton>
      </div>

      {item.image ? (
        <div className="w-full h-40 overflow-hidden rounded-md mb-3">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover"
          />
        </div>
      ) : null}
      <h3 className="title">{item.title}</h3>
      {item.category && (
        <span className="text-xs inline-block px-2 py-1 rounded-md border bg-slate-50">
          {item.category}
        </span>
      )}
      <p className="subtitle mt-2">{item.subtitle}</p>
      <div className="date mt-4">{formatDate(item.createdAt)}</div>
    </article>
  );
}
