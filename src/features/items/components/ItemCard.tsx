import React from "react";
import type { Item } from "../model/types";
import { formatDate } from "../model/utils";
import { Edit2, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ItemCard({
  item,
  onEdit,
  onRequestDelete,
  onOpenDetails,
}: {
  item: Item;
  onEdit: (item: Item) => void;
  onDelete?: (id: string) => void;
  onRequestDelete?: () => void;
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
      className="card cursor-pointer p-4"
      onClick={() => onOpenDetails?.(item)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onOpenDetails?.(item);
      }}
      aria-label={`Open details for ${item.title}`}
    >
      {/* image */}
      {item.image && (
        <div className="w-full h-40 overflow-hidden rounded-md mb-3">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover transition-transform duration-300 ease-out transform hover:scale-105"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      {/* content */}
      <div className="flex flex-col gap-2">
        <h3 className="title text-lg leading-tight">{item.title}</h3>

        <div className="flex items-center gap-3 flex-wrap text-xs text-slate-400">
          {item.category && (
            <span className="font-medium px-2.5 py-0.5 rounded-full border bg-slate-50 text-slate-700">
              {item.category}
            </span>
          )}
          <span>{formatDate(item.createdAt)}</span>
          {item.updatedAt && <span>• updated</span>}
        </div>

        {item.subtitle && (
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
                {expanded || item.subtitle.length <= 120
                  ? item.subtitle
                  : item.subtitle.slice(0, 120) + "…"}
              </motion.p>
            </AnimatePresence>

            {item.subtitle.length > 120 && (
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
        )}

        {/* دکمه‌های Edit & Delete در پایین کارت */}
        <div className="flex gap-3 mt-3 justify-end">
          <motion.button
            onClick={(e) => {
              e.stopPropagation();
              onEdit(item);
            }}
            className="icon-btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Edit item"
          >
            <Edit2 size={24} />
          </motion.button>

          <motion.button
            onClick={(e) => {
              e.stopPropagation();
              onRequestDelete?.();
            }}
            className="icon-btn destructive"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Delete item"
          >
            <Trash2 size={24} />
          </motion.button>
        </div>
      </div>
    </motion.article>
  );
}
