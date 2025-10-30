import type { Item } from "../model/types";
import { formatDate } from "../model/utils";
import IconButton from "../../../components/ui/IconButton";
import { LucideEdit2, LucideTrash2 } from "lucide-react";

export default function ItemCard({
  item,
  onEdit,
  onDelete,
}: {
  item: Item;
  onEdit: (item: Item) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <article className="relative rounded-2xl border border-slate-200 bg-white p-4 shadow-card hover:shadow-cardHover transition-transform transform hover:-translate-y-0.5">
      <div className="absolute top-3 right-3 flex gap-2">
        <IconButton
          onClick={() => onEdit(item)}
          label={`Edit ${item.title}`}
          className="hover:bg-slate-100"
        >
          <LucideEdit2 size={16} />
        </IconButton>
        <IconButton
          onClick={() => onDelete(item.id)}
          label={`Delete ${item.title}`}
          className="hover:bg-rose-50"
        >
          <LucideTrash2 size={16} className="text-rose-600" />
        </IconButton>
      </div>

      <h3 className="text-lg font-semibold truncate pr-14">{item.title}</h3>
      <p className="mt-2 text-sm text-slate-600 line-clamp-2">
        {item.subtitle}
      </p>
      <div className="mt-4 text-xs text-slate-400">
        {formatDate(item.createdAt)}
      </div>
    </article>
  );
}
