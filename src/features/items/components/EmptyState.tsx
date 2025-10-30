import Button from "../../../components/ui/Button";
import { LucideInbox } from "lucide-react";

export default function EmptyState({ onCreate }: { onCreate: () => void }) {
  return (
    <div className="w-full rounded-2xl border border-dashed border-slate-200 bg-white py-16 flex flex-col items-center justify-center gap-4">
      <LucideInbox size={64} className="text-slate-300" />
      <h3 className="text-lg font-semibold">No items yet</h3>
      <p className="text-sm text-slate-500">
        Create your first item to get started.
      </p>
      <Button onClick={onCreate}>Create</Button>
    </div>
  );
}
