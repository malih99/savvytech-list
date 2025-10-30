import React from "react";
import type { Item } from "../model/types";
import { formatDate } from "../model/utils";
import { Edit2, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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
  const [expanded, setExpanded] = React.useState(false);

  // helper: trim long subtitle for collapsed state
  const collapsedLimit = 120;
  const needsCollapse = (item.subtitle || "").length > collapsedLimit;
  const subtitlePreview =
    !item.subtitle || !needsCollapse
      ? item.subtitle
      : (item.subtitle || "").slice(0, collapsedLimit).trim() + "…";

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{
        translateY: -6,
        boxShadow: "0 10px 30px rgba(2,6,23,0.08)",
      }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className="card cursor-pointer relative p-4"
      onClick={() => onOpenDetails?.(item)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onOpenDetails?.(item);
      }}
      aria-label={`Open details for ${item.title}`}
    >
      {/* top-right actions */}
      <div className="card-actions top-3 right-3 z-10 flex items-center gap-2">
        <motion.button
          onClick={(e) => {
            e.stopPropagation();
            onEdit(item);
          }}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.96 }}
          aria-label="Edit item"
          className="p-2 rounded-md inline-flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2"
        >
          <Edit2 size={16} className="text-slate-700" />
        </motion.button>

        <motion.button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(item.id);
          }}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.96 }}
          aria-label="Delete item"
          className="p-2 rounded-md inline-flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2"
        >
          <Trash2 size={16} className="text-rose-600" />
        </motion.button>
      </div>

      {/* image */}
      {item.image ? (
        <div className="w-full h-40 overflow-hidden rounded-md mb-3">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover transition-transform duration-300 ease-out transform hover:scale-105"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      ) : null}

      {/* content */}
      <div className="flex flex-col gap-2">
        <div className="flex items-start justify-between gap-3">
          <h3 className="title text-lg leading-tight">{item.title}</h3>
        </div>

        {/* category and meta row */}
        <div className="flex items-center gap-3 flex-wrap">
          {item.category && (
            <span className="text-xs font-medium inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full border bg-slate-50 text-slate-700">
              {item.category}
            </span>
          )}
          <span className="text-xs text-slate-400">
            {formatDate(item.createdAt)}
          </span>
          {item.updatedAt && (
            <span className="text-xs text-slate-300">• updated</span>
          )}
        </div>

        {/* subtitle with collapse/expand */}
        <div className="mt-1">
          <AnimatePresence initial={false}>
            <motion.p
              key={expanded ? "expanded" : "collapsed"}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.18 }}
              className="text-sm text-slate-600 overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {expanded || !needsCollapse ? item.subtitle : subtitlePreview}
            </motion.p>
          </AnimatePresence>

          {needsCollapse && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setExpanded((s) => !s);
              }}
              className="mt-2 inline-flex items-center gap-2 text-sm text-brand-500 font-medium"
              aria-expanded={expanded}
            >
              <motion.span
                initial={{ rotate: 0 }}
                animate={{ rotate: expanded ? 180 : 0 }}
                transition={{ duration: 0.18 }}
                className="inline-block"
              >
                ▼
              </motion.span>
              {expanded ? "Show less" : "Show more"}
            </button>
          )}
        </div>
      </div>
    </motion.article>
  );
}
