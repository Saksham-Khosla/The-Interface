import type { Metadata } from "next";
import Link from "next/link";
import CTABlock from "@/components/CTABlock";
import { industries } from "@/lib/industries";
import { issues, categoryDotColors } from "@/lib/issues";

export const metadata: Metadata = {
  title: "Industries",
  description:
    "Explore how AI is reshaping finance, education, law, healthcare, work, startups, and media — sector by sector.",
};

export default function IndustriesPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/5 py-24 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgba(59,130,246,0.1),transparent)] pointer-events-none" />
        <div className="mx-auto max-w-3xl relative z-10">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-blue-400">
            Industries
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl mb-5 leading-tight">
            AI doesn't move the same way everywhere.
          </h1>
          <p className="text-base text-slate-400 leading-relaxed max-w-xl">
            Pick a sector below to see how AI is actually being used — the tools, the regulation, the resistance, and the real shifts in how work gets done.
          </p>
        </div>
      </section>

      {/* Industry sections */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl space-y-6">
          {industries.map((industry) => {
            const relatedIssues = issues.filter((i) => i.category === industry.name).slice(0, 3);
            const dotClass = categoryDotColors[industry.name] ?? "bg-slate-400";

            return (
              <div
                key={industry.slug}
                id={industry.slug}
                className="rounded-3xl border border-white/5 bg-white/[0.02] p-6 sm:p-10 scroll-mt-24"
              >
                <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.1fr_1fr]">
                  {/* Left: description + topics */}
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10 border border-blue-500/10 text-xl">
                        {industry.icon}
                      </div>
                      <h2 className="text-2xl font-bold text-white">{industry.name}</h2>
                    </div>
                    <p className="text-sm text-slate-400 leading-relaxed mb-6">
                      {industry.description}
                    </p>
                    <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-3">
                      Topics we cover
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {industry.topics.map((topic) => (
                        <span
                          key={topic}
                          className="inline-flex items-center gap-1.5 rounded-full border border-white/8 bg-white/[0.03] px-3 py-1 text-xs font-medium text-slate-300"
                        >
                          <span className={`h-1.5 w-1.5 rounded-full ${dotClass}`} />
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Right: example articles */}
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-3">
                      Example briefings
                    </p>
                    <div className="space-y-2">
                      {industry.exampleArticles.map((title) => {
                        const matched = relatedIssues.find((i) => i.title === title);
                        const content = (
                          <div className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] px-4 py-3 hover:border-blue-500/20 hover:bg-white/[0.04] transition-all duration-200 group">
                            <span className="text-sm text-slate-300 group-hover:text-white transition-colors flex-1">
                              {title}
                            </span>
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-slate-600 group-hover:text-blue-400 transition-colors flex-shrink-0">
                              <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </div>
                        );
                        return matched ? (
                          <Link key={title} href={`/issues/${matched.slug}`}>
                            {content}
                          </Link>
                        ) : (
                          <div key={title} className="opacity-60">
                            {content}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-white/5">
        <div className="mx-auto max-w-6xl">
          <CTABlock
            title="Pick your industry. We'll handle the briefing."
            subtitle="Subscribe free and get weekly analysis on how AI is reshaping the sectors you care about most."
          />
        </div>
      </section>
    </div>
  );
}
