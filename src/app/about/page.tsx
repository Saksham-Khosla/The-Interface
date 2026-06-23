import type { Metadata } from "next";
import CTABlock from "@/components/CTABlock";
import AuthorCard from "@/components/AuthorCard";
import { industries } from "@/lib/industries";

export const metadata: Metadata = {
  title: "About",
  description:
    "The Inference is a weekly intelligence briefing on how AI is changing every industry — finance, education, law, healthcare, work, startups, and media.",
};

const forWho = [
  {
    label: "Founders & operators",
    description: "Decide where AI fits in your product, team, or process — and where it doesn't yet.",
  },
  {
    label: "Investors & analysts",
    description: "Track which industries are seeing real AI adoption versus pilot fatigue.",
  },
  {
    label: "Lawyers, educators, clinicians",
    description: "Understand how AI is reshaping your specific profession, not just tech broadly.",
  },
  {
    label: "Students & builders",
    description: "Build a sharp, sector-aware mental model of where AI is headed.",
  },
];

export default function AboutPage() {
  return (
    <div>
      {/* Header */}
      <section className="relative overflow-hidden border-b border-white/5 py-24 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgba(59,130,246,0.1),transparent)] pointer-events-none" />
        <div className="mx-auto max-w-3xl relative z-10">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-blue-400">About</p>
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl mb-5 leading-tight">
            What The Inference is — and why it exists.
          </h1>
          <p className="text-base text-slate-400 leading-relaxed">
            AI is no longer just a tech story. It's a finance story, an education story, a law story, a healthcare story, and a work story. That's why we exist — to make those changes easier to understand, one industry at a time.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-b border-white/5">
        <div className="mx-auto max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-blue-400 mb-4">Mission</p>
          <h2 className="text-2xl font-bold text-white mb-6">
            Understand AI through the industry you actually work in.
          </h2>
          <div className="space-y-4 text-base text-slate-400 leading-relaxed">
            <p>
              Most AI coverage treats every industry the same — as if a hospital, a hedge fund, and a high school are all adopting the same tools at the same pace. They're not. AI is moving through finance, law, healthcare, education, work, startups, and media in completely different ways, at completely different speeds, for completely different reasons.
            </p>
            <p>
              We take a different approach. Every briefing asks: <em className="text-slate-300">what does this actually mean for people working in this specific field?</em> We skip the generic "AI is changing everything" framing and go straight to the industry-specific implications.
            </p>
            <p>
              The goal is that 10 minutes with us each week leaves you sharper — not just more informed — about how AI is reshaping the part of the world you actually operate in.
            </p>
          </div>
        </div>
      </section>

      {/* Industries we cover */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-b border-white/5">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 items-start">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-blue-400 mb-4">Coverage</p>
              <h2 className="text-2xl font-bold text-white mb-4">Industries we cover.</h2>
              <p className="text-sm text-slate-400 leading-relaxed mb-8">
                We don't cover everything — we cover where AI is having the most real-world impact:
              </p>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {industries.map((ind) => (
                  <div key={ind.slug} className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] px-4 py-3">
                    <span className="text-lg">{ind.icon}</span>
                    <span className="text-sm font-medium text-slate-300">{ind.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* For who */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-blue-400 mb-4">Audience</p>
              <h2 className="text-2xl font-bold text-white mb-4">Who we're for.</h2>
              <p className="text-sm text-slate-400 leading-relaxed mb-8">
                Not for everyone. For people whose work is being reshaped by AI right now, in a specific field.
              </p>
              <div className="space-y-3">
                {forWho.map((w) => (
                  <div key={w.label} className="rounded-xl border border-white/5 bg-white/[0.02] p-4">
                    <p className="text-sm font-semibold text-white mb-1">{w.label}</p>
                    <p className="text-sm text-slate-400">{w.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Author */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-b border-white/5">
        <div className="mx-auto max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-blue-400 mb-4">Who writes this</p>
          <h2 className="text-2xl font-bold text-white mb-8">The people behind it.</h2>
          <AuthorCard />
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <CTABlock />
        </div>
      </section>
    </div>
  );
}
