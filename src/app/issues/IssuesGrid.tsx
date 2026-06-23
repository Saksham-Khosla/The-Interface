"use client";

import { useState } from "react";
import IssueCard from "@/components/IssueCard";
import { issues } from "@/lib/issues";

const categories = ["All", "Finance", "Education", "Law", "Healthcare", "Work", "Startups", "Media"];

export default function IssuesGrid() {
  const [active, setActive] = useState("All");

  const filtered = active === "All" ? issues : issues.filter((i) => i.category === active);

  return (
    <div>
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <p className="text-sm text-slate-500">
          {filtered.length} {filtered.length === 1 ? "briefing" : "briefings"}
          {active !== "All" ? ` in ${active}` : " published"}
        </p>
        <div className="flex gap-2 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                cat === active
                  ? "border-blue-500/40 bg-blue-500/10 text-blue-300"
                  : "border-white/8 text-slate-500 hover:border-white/15 hover:text-slate-300"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((issue) => (
            <IssueCard key={issue.slug} issue={issue} />
          ))}
        </div>
      ) : (
        <div className="py-24 text-center">
          <div className="mb-4 text-4xl">📬</div>
          <h3 className="text-lg font-semibold text-white mb-2">No briefings yet in {active}</h3>
          <p className="text-sm text-slate-400">Check back soon, or subscribe to get notified when one drops.</p>
        </div>
      )}
    </div>
  );
}
