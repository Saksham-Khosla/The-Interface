import type { Metadata } from "next";
import EmailSignup from "@/components/EmailSignup";
import IssueCard from "@/components/IssueCard";
import SectionHeading from "@/components/SectionHeading";
import CTABlock from "@/components/CTABlock";
import AuthorCard from "@/components/AuthorCard";
import { getFeaturedIssues } from "@/lib/issues";

export const metadata: Metadata = {
  title: "The Inference — Understand AI Before Everyone Else Does",
};

const benefits = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M10 2a8 8 0 100 16A8 8 0 0010 2z" stroke="#60a5fa" strokeWidth="1.5"/>
        <path d="M7 10l2 2 4-4" stroke="#60a5fa" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: "Zero noise",
    description:
      "We do the reading for you. Every issue surfaces only what actually matters — no AI hype, no filler content.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M3 10h14M10 3v14" stroke="#60a5fa" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    title: "Deep signal",
    description:
      "Tools, research papers, startup moves, model releases — analyzed with context, not just a link dump.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M2 6l8 6 8-6M2 6v10h16V6" stroke="#60a5fa" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: "One email a week",
    description:
      "Every Tuesday. Short enough to finish with your coffee, dense enough to carry you through the week.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M10 2l2.09 6.26H18l-5 3.64 1.91 6.1L10 14.27l-4.91 3.73L7 11.9 2 8.26h5.91L10 2z" stroke="#60a5fa" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: "Built for builders",
    description:
      "Written for founders, engineers, operators, and students — not investors or journalists.",
  },
];

const whatYouGet = [
  "Weekly breakdown of the most important AI story",
  "Tool recommendations with real use cases",
  "Startup and funding moves that matter",
  "Research papers explained in plain English",
  "Practical takeaways you can use this week",
];

export default function HomePage() {
  const featuredIssues = getFeaturedIssues();

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
                Weekly · Free · 12,000+ readers
              </span>
            </div>

            <h1 className="text-5xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl leading-[1.06] mb-6">
              Understand AI{" "}
              <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                before everyone
              </span>{" "}
              else does.
            </h1>

            <p className="text-lg text-slate-400 leading-relaxed mb-10 max-w-xl">
              A weekly newsletter breaking down the most important AI tools,
              trends, startups, and research — without the hype.
            </p>

            <div className="max-w-md">
              <EmailSignup variant="hero" />
            </div>

            {/* Social proof avatars */}
            <div className="mt-10 flex items-center gap-3">
              <div className="flex -space-x-2">
                {["#3b82f6", "#6366f1", "#8b5cf6", "#ec4899", "#f59e0b"].map(
                  (color, i) => (
                    <div
                      key={i}
                      className="h-8 w-8 rounded-full border-2 border-[#050914]"
                      style={{ backgroundColor: color, opacity: 0.8 }}
                    />
                  )
                )}
              </div>
              <p className="text-sm text-slate-400">
                Joined by{" "}
                <span className="text-white font-medium">12,000+ builders</span>{" "}
                this year
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            eyebrow="Why subscribe"
            title="Intelligence, not noise."
            subtitle="There's no shortage of AI content. The Inference cuts through it — so you spend 10 minutes a week instead of 10 hours."
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

      {/* Featured Issues */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 border-t border-white/5">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-end justify-between mb-12">
            <SectionHeading
              eyebrow="Latest issues"
              title="Recent deep dives."
            />
            <a
              href="/issues"
              className="hidden sm:inline-flex text-sm text-blue-400 hover:text-blue-300 transition-colors font-medium"
            >
              Browse all issues →
            </a>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featuredIssues.map((issue) => (
              <IssueCard key={issue.slug} issue={issue} variant="featured" />
            ))}
          </div>
          <div className="mt-8 sm:hidden">
            <a href="/issues" className="text-sm text-blue-400 font-medium">
              Browse all issues →
            </a>
          </div>
        </div>
      </section>

      {/* What readers get */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 border-t border-white/5">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 items-center">
            <div>
              <SectionHeading
                eyebrow="Every issue"
                title="What you'll get each week."
                subtitle="The Inference is one focused email per week. Not a content farm. Not a link roundup. An actual analysis you'll want to read."
              />
              <ul className="space-y-4">
                {whatYouGet.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-blue-500/15 border border-blue-500/20">
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M2 5l2 2 4-4" stroke="#60a5fa" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <span className="text-sm text-slate-300 leading-snug">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            {/* Sample email mockup */}
            <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-6 space-y-4">
              <div className="flex items-center gap-3 pb-4 border-b border-white/5">
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-700 flex items-center justify-center text-xs font-bold text-white">TI</div>
                <div>
                  <p className="text-xs font-medium text-white">The Inference</p>
                  <p className="text-xs text-slate-500">hello@theinference.co</p>
                </div>
                <div className="ml-auto">
                  <span className="text-xs text-slate-500">Tues 7:00 AM</span>
                </div>
              </div>
              <p className="text-sm font-semibold text-white">Issue #42 — The AI Agents Are Coming</p>
              <div className="space-y-2">
                <div className="h-2 rounded bg-white/5 w-full" />
                <div className="h-2 rounded bg-white/5 w-5/6" />
                <div className="h-2 rounded bg-white/5 w-4/6" />
              </div>
              <div className="rounded-lg border border-blue-500/20 bg-blue-500/5 p-3">
                <p className="text-xs text-blue-300 font-medium mb-1">🔑 Key takeaway</p>
                <div className="space-y-1.5">
                  <div className="h-1.5 rounded bg-blue-500/20 w-full" />
                  <div className="h-1.5 rounded bg-blue-500/20 w-4/5" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-2 rounded bg-white/5 w-full" />
                <div className="h-2 rounded bg-white/5 w-3/4" />
              </div>
              <div className="pt-2 border-t border-white/5 flex items-center justify-between">
                <span className="text-xs text-slate-500">6 min read</span>
                <span className="text-xs text-blue-400">Read in browser →</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Author section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 border-t border-white/5">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            eyebrow="The author"
            title="Written by someone in the trenches."
            subtitle="The Inference is written by one person — not a team of content writers. That means every issue has a consistent voice and a clear point of view."
          />
          <AuthorCard />
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
