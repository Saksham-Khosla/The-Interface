import type { Metadata } from "next";
import CTABlock from "@/components/CTABlock";
import AuthorCard from "@/components/AuthorCard";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about The Inference — a weekly AI newsletter written for founders, builders, and operators who want to understand AI without the noise.",
};

const topics = [
  { label: "AI models & research", icon: "🧠" },
  { label: "Developer tools & frameworks", icon: "🛠️" },
  { label: "Startups & funding", icon: "🚀" },
  { label: "Agents & automation", icon: "🤖" },
  { label: "AI policy & safety", icon: "🔐" },
  { label: "Practical how-tos", icon: "📋" },
];

const forWho = [
  {
    label: "Founders",
    description: "Decide where AI fits in your product and where it doesn't.",
  },
  {
    label: "Engineers",
    description: "Stay current on models, tools, and emerging best practices.",
  },
  {
    label: "Operators",
    description: "Find real ways to use AI to do more with less.",
  },
  {
    label: "Students",
    description: "Build a sharp mental model of a fast-moving field.",
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
            There is more AI content being published today than any one person can read. The Inference exists to solve exactly that problem — by doing the reading, synthesizing the signal, and delivering only what matters.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-b border-white/5">
        <div className="mx-auto max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-blue-400 mb-4">Mission</p>
          <h2 className="text-2xl font-bold text-white mb-6">
            Clarity over cleverness.
          </h2>
          <div className="space-y-4 text-base text-slate-400 leading-relaxed">
            <p>
              The AI space moves fast, and most coverage moves even faster — chasing announcements, parroting press releases, and adding noise without adding understanding.
            </p>
            <p>
              The Inference takes a different approach. Every issue asks: <em className="text-slate-300">what does this actually mean for people building things?</em> We skip the hype cycle and go straight to the implications.
            </p>
            <p>
              The goal is that 10 minutes with The Inference each week leaves you smarter — not just more informed — about the most consequential technology shift of our time.
            </p>
          </div>
        </div>
      </section>

      {/* Topics */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-b border-white/5">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 items-start">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-blue-400 mb-4">Coverage</p>
              <h2 className="text-2xl font-bold text-white mb-4">What topics we cover.</h2>
              <p className="text-sm text-slate-400 leading-relaxed mb-8">
                We don't cover everything — we cover what matters. Here's where The Inference focuses its attention:
              </p>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {topics.map((t) => (
                  <div key={t.label} className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] px-4 py-3">
                    <span className="text-lg">{t.icon}</span>
                    <span className="text-sm font-medium text-slate-300">{t.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* For who */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-blue-400 mb-4">Audience</p>
              <h2 className="text-2xl font-bold text-white mb-4">Who The Inference is for.</h2>
              <p className="text-sm text-slate-400 leading-relaxed mb-8">
                Not for everyone. For people who are building things and need to stay sharp on AI.
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
          <p className="text-xs font-semibold uppercase tracking-widest text-blue-400 mb-4">The author</p>
          <h2 className="text-2xl font-bold text-white mb-8">Written by one person.</h2>
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
