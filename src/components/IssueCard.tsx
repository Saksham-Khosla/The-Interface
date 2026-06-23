import Link from "next/link";
import { Issue } from "@/lib/issues";
import CategoryTag from "./CategoryTag";

interface IssueCardProps {
  issue: Issue;
  variant?: "default" | "featured";
}

export default function IssueCard({ issue, variant = "default" }: IssueCardProps) {
  return (
    <Link href={`/issues/${issue.slug}`} className="group block">
      <article className={`h-full rounded-2xl border border-white/5 bg-white/[0.02] p-6 transition-all duration-300 hover:border-blue-500/20 hover:bg-white/[0.04] hover:shadow-xl hover:shadow-blue-500/5 ${variant === "featured" ? "flex flex-col" : ""}`}>
        {/* Top row */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <CategoryTag category={issue.category} />
          <div className="flex items-center gap-1.5 text-xs text-slate-500 flex-shrink-0">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.2"/>
              <path d="M6 3.5v2.5l1.5 1.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
            </svg>
            {issue.readingTime} min read
          </div>
        </div>

        {/* Title */}
        <h3 className="text-base font-semibold text-white group-hover:text-blue-300 transition-colors duration-200 leading-snug mb-3">
          {issue.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-slate-400 leading-relaxed flex-1 mb-4">
          {issue.description}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between mt-auto">
          <time className="text-xs text-slate-500">{issue.date}</time>
          <span className="text-xs text-blue-400 font-medium group-hover:text-blue-300 transition-colors">
            Read issue →
          </span>
        </div>
      </article>
    </Link>
  );
}
