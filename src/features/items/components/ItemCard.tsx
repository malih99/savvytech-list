import type { Item } from "../model/types";
import { formatDate } from "../model/utils";
import IconButton from "../../../components/ui/IconButton";
import { LucideEdit2, LucideTrash2 } from "lucide-react";

export default function ItemCard({ item, onEdit, onDelete }) {
  return (
    <article className="card">
      <div className="card-actions">
        <button onClick={() => onEdit(item)} className="icon-btn">
          ✏️
        </button>
        <button onClick={() => onDelete(item.id)} className="icon-btn">
          🗑️
        </button>
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
