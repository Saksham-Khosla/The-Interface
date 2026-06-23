import { categoryDotColors } from "@/lib/issues";

interface CategoryTagProps {
  category: string;
  className?: string;
}

export default function CategoryTag({ category, className = "" }: CategoryTagProps) {
  const dotClass = categoryDotColors[category] ?? "bg-slate-400";

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border border-white/8 bg-white/[0.03] px-2.5 py-0.5 text-xs font-medium text-slate-300 ${className}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${dotClass}`} />
      {category}
    </span>
  );
}
