import type { Metadata } from "next";
import IssueCard from "@/components/IssueCard";
import SectionHeading from "@/components/SectionHeading";
import CTABlock from "@/components/CTABlock";
import { issues } from "@/lib/issues";

export const metadata: Metadata = {
  title: "All Issues",
  description:
    "Browse every issue of The Inference — weekly AI intelligence covering tools, research, startups, and models.",
};

export default function IssuesPage() {
  return (
    <div>
      {/* Header */}
      <section className="relative overflow-hidden border-b border-white/5 py-24 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgba(59,130,246,0.1),transparent)] pointer-events-none" />
        <div className="mx-auto max-w-6xl relative z-10">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-blue-400">
            Archive
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl mb-4">
            All issues.
          </h1>
          <p className="text-base text-slate-400 max-w-xl leading-relaxed">
            Every issue of The Inference, from the latest deep dive to the full back catalog. Pick any topic and dive in.
          </p>
        </div>
      </section>

      {/* Issues grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 flex items-center justify-between">
            <p className="text-sm text-slate-500">
              {issues.length} issues published
            </p>
            {/* Category filter placeholder */}
            <div className="flex gap-2 flex-wrap">
              {["All", "Agents", "Models", "Industry", "Products", "Operations"].map((cat) => (
                <button
                  key={cat}
                  className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                    cat === "All"
                      ? "border-blue-500/40 bg-blue-500/10 text-blue-300"
                      : "border-white/8 text-slate-500 hover:border-white/15 hover:text-slate-300"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {issues.map((issue) => (
              <IssueCard key={issue.slug} issue={issue} />
            ))}
          </div>

          {/* Empty state (hidden when issues exist) */}
          {issues.length === 0 && (
            <div className="py-24 text-center">
              <div className="mb-4 text-4xl">📬</div>
              <h3 className="text-lg font-semibold text-white mb-2">No issues yet</h3>
              <p className="text-sm text-slate-400">The first issue drops soon. Subscribe to get it.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-white/5">
        <div className="mx-auto max-w-6xl">
          <CTABlock
            title="Get the next issue in your inbox."
            subtitle="Subscribe free and receive every new issue of The Inference the moment it drops — every Tuesday."
          />
        </div>
      </section>
    </div>
  );
}
