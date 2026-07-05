import type { Metadata } from "next";
import Link from "next/link";
import EmailSignup from "@/components/EmailSignup";
import IndustryCard from "@/components/IndustryCard";
import SectionHeading from "@/components/SectionHeading";
import CTABlock from "@/components/CTABlock";
import { industries } from "@/lib/industries";

export const metadata: Metadata = {
  title: "The Inference — AI Is Changing Every Industry. We Help You Keep Up.",
};

const benefits = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <rect x="3" y="3" width="6" height="6" rx="1.5" stroke="#60a5fa" strokeWidth="1.5"/>
        <rect x="11" y="3" width="6" height="6" rx="1.5" stroke="#60a5fa" strokeWidth="1.5"/>
        <rect x="3" y="11" width="6" height="6" rx="1.5" stroke="#60a5fa" strokeWidth="1.5"/>
        <rect x="11" y="11" width="6" height="6" rx="1.5" stroke="#60a5fa" strokeWidth="1.5"/>
      </svg>
    ),
    title: "Industry-by-industry analysis",
    description:
      "Understand where AI is actually being used, not just what is trending.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M10 2a8 8 0 100 16A8 8 0 0010 2z" stroke="#60a5fa" strokeWidth="1.5"/>
        <path d="M7 10l2 2 4-4" stroke="#60a5fa" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: "No hype, just signal",
    description:
      "Clear explanations of tools, companies, regulation, and market shifts.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="6" cy="6" r="2.5" stroke="#60a5fa" strokeWidth="1.5"/>
        <circle cx="14" cy="6" r="2.5" stroke="#60a5fa" strokeWidth="1.5"/>
        <circle cx="10" cy="14" r="2.5" stroke="#60a5fa" strokeWidth="1.5"/>
      </svg>
    ),
    title: "Built for curious professionals",
    description:
      "Useful for students, founders, investors, operators, lawyers, educators, and builders.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M2 6l8 6 8-6M2 6v10h16V6" stroke="#60a5fa" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: "Weekly and readable",
    description:
      "A concise briefing that makes complicated AI shifts easy to understand.",
  },
];

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[88vh] flex items-center overflow-hidden">
        {/* Background grid */}
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "linear-gradient(rgba(59,130,246,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.04) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        {/* Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(59,130,246,0.18),transparent)] pointer-events-none" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 h-[500px] w-[500px] rounded-full bg-blue-600/5 blur-[120px] pointer-events-none" />

        <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-24">
          <div className="max-w-3xl">
            {/* Eyebrow badge */}
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/8 px-4 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-400 animate-pulse" />
              <span className="text-xs font-medium text-blue-300">
                Weekly · Free · Industry-by-industry
              </span>
            </div>

            <h1 className="text-5xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl leading-[1.06] mb-6">
              AI is changing{" "}
              <span className="bg-gradient-to-r from-sky-300 to-blue-500 bg-clip-text text-transparent">
                every industry.
              </span>{" "}
              We help you keep up.
            </h1>

            <p className="text-lg text-slate-400 leading-relaxed mb-10 max-w-xl">
              We publish a weekly briefing breaking down how artificial intelligence is reshaping finance, education, law, healthcare, startups, media, and the future of work.
            </p>

            <div className="max-w-md mb-6">
              <EmailSignup variant="hero" />
            </div>

            <Link
              href="/industries"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-300 hover:text-white transition-colors group"
            >
              Explore industries
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="transition-transform group-hover:translate-x-0.5">
                <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Explore AI by Industry */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 border-t border-white/5">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            eyebrow="By sector"
            title="Explore AI by Industry."
            subtitle="AI doesn't move the same way in every field. Pick a sector to see how it's actually playing out."
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {industries.map((industry) => (
              <IndustryCard key={industry.slug} industry={industry} />
            ))}
          </div>
        </div>
      </section>

      {/* Coming Soon */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 border-t border-white/5">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            eyebrow="Briefings"
            title="First issue dropping soon."
          />
          <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-12 text-center">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-500/10 border border-blue-500/10 mx-auto">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M2 6l8 6 8-6M2 6v10h16V6" stroke="#60a5fa" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">We are working on our first briefing.</h3>
            <p className="text-sm text-slate-400 max-w-sm mx-auto">
              Subscribe below and you will be the first to know when it drops.
            </p>
          </div>
        </div>
      </section>

      {/* Why Subscribe */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 border-t border-white/5">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            eyebrow="Why subscribe"
            title="Practical analysis, not noise."
            subtitle="There's no shortage of generic AI content. We cut through it with real industry context."
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((b) => (
              <div
                key={b.title}
                className="rounded-2xl border border-white/5 bg-white/[0.02] p-6 transition-all duration-300 hover:border-blue-500/15 hover:bg-white/[0.04]"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 border border-blue-500/10">
                  {b.icon}
                </div>
                <h3 className="mb-2 text-base font-semibold text-white">{b.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{b.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 border-t border-white/5">
        <div className="mx-auto max-w-6xl">
          <div className="rounded-3xl border border-white/5 bg-gradient-to-br from-navy-800/60 via-navy-900/40 to-transparent p-8 sm:p-12">
            <p className="text-xs font-semibold uppercase tracking-widest text-blue-400 mb-4">Our mission</p>
            <p className="text-2xl sm:text-3xl font-semibold text-white leading-snug max-w-3xl">
              AI is no longer just a tech story. It is a finance story, an education story, a law story, a healthcare story, and a work story.{" "}
              <span className="text-slate-400">That's why we exist — to make those changes easier to understand.</span>
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 border-t border-white/5">
        <div className="mx-auto max-w-6xl">
          <CTABlock />
        </div>
      </section>
    </div>
  );
}
