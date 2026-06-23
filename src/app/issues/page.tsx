import type { Metadata } from "next";
import CTABlock from "@/components/CTABlock";
import IssuesGrid from "./IssuesGrid";

export const metadata: Metadata = {
  title: "Issues",
  description:
    "Browse every briefing from The Inference — filterable by industry, from finance and law to healthcare, work, and media.",
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
            All briefings.
          </h1>
          <p className="text-base text-slate-400 max-w-xl leading-relaxed">
            Every briefing we've published, organised by industry. Filter by sector or browse the full archive.
          </p>
        </div>
      </section>

      {/* Issues grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <IssuesGrid />
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-white/5">
        <div className="mx-auto max-w-6xl">
          <CTABlock
            title="Get the next briefing in your inbox."
            subtitle="Subscribe free and receive every new briefing the moment it drops — every Tuesday."
          />
        </div>
      </section>
    </div>
  );
}
