import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import CTABlock from "@/components/CTABlock";
import IssueCard from "@/components/IssueCard";
import CategoryTag from "@/components/CategoryTag";
import { issues, getIssueBySlug } from "@/lib/issues";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return issues.map((issue) => ({ slug: issue.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const issue = getIssueBySlug(params.slug);
  if (!issue) return {};
  return {
    title: issue.title,
    description: issue.description,
  };
}

// Full article content for the featured slug
const articleContent: Record<string, React.ReactNode> = {
  "ai-agents-entering-finance": (
    <div className="prose-custom">
      <p>
        Something shifted inside financial institutions this year. Autonomous AI agents stopped being a slide in an innovation-team deck and started showing up in actual reconciliation queues, first-pass credit memos, and trading desk research workflows. No one is announcing this loudly — in finance, a quiet edge is a real edge — but the hiring patterns and vendor contracts tell the story clearly enough.
      </p>
      <h2>Where agents are actually being trusted</h2>
      <p>
        Strip away the marketing and an "agent" in a financial context is an LLM wired into a loop: it pulls data, drafts an output, checks it against a rule set, and flags exceptions for a human. The places this is working best share one trait — <strong>the cost of a wrong answer is recoverable</strong>.
      </p>
      <p>
        Reconciliation, document summarization, and first-draft client reporting are the early winners. A junior analyst's job hasn't disappeared, but the first 60% of the task — gathering, formatting, flagging anomalies — increasingly happens before a human ever opens the file.
      </p>
      <h2>Where firms are still holding the line</h2>
      <p>
        Trading execution, credit decisions, and anything client-facing with regulatory exposure remain firmly human-gated. Compliance teams have made clear that an agent acting autonomously on capital is a different risk category entirely from an agent drafting a memo a human signs off on.
      </p>
      <p>
        That distinction — <em>agent drafts, human decides</em> — is the operating model most institutions have quietly settled on for now. It's less exciting than full autonomy, but it's the version that's actually shipping.
      </p>
      <h2>What this means for talent</h2>
      <p>
        The honest tension: the tasks agents are absorbing are exactly the tasks junior analysts used to learn the business through. Some firms are restructuring early-career roles around <strong>reviewing and correcting agent output</strong> rather than producing it from scratch — a real shift in how financial literacy gets built on the job.
      </p>
      <h2>The honest caveats</h2>
      <ul>
        <li>Model outputs still need to be auditable — a black-box recommendation doesn't satisfy most compliance frameworks.</li>
        <li>Data access is the real bottleneck, not model capability. Most firms' internal data isn't agent-ready yet.</li>
        <li>Vendor claims of "full automation" are almost always describing a narrow, well-scoped workflow.</li>
        <li>Regulatory guidance is still catching up — expect more formal rules within 12–18 months.</li>
      </ul>
      <p>
        None of this makes agentic finance less significant. It makes it a slower, more deliberate transformation than the headlines suggest — which, for an industry built on managing risk, might be exactly the right pace.
      </p>
    </div>
  ),
};

export default function IssuePage({ params }: Props) {
  const issue = getIssueBySlug(params.slug);
  if (!issue) notFound();

  const content = articleContent[params.slug];
  const relatedIssues = issues
    .filter((i) => i.slug !== params.slug && i.category !== issue.category)
    .slice(0, 3);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/5 py-20 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_-10%,rgba(59,130,246,0.1),transparent)] pointer-events-none" />
        <div className="mx-auto max-w-3xl relative z-10">
          <div className="mb-6">
            <Link href="/issues" className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 transition-colors">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M9 3L5 7l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              All briefings
            </Link>
          </div>
          <div className="flex flex-wrap items-center gap-3 mb-5">
            <CategoryTag category={issue.category} />
            <span className="text-xs text-slate-500">{issue.readingTime} min read</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl leading-tight mb-5">
            {issue.title}
          </h1>
          <p className="text-base text-slate-400 leading-relaxed mb-8">
            {issue.description}
          </p>
          {/* Byline */}
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-gradient-to-br from-blue-500 to-indigo-700 flex items-center justify-center text-xs font-bold text-white">
              AI
            </div>
            <div>
              <p className="text-sm font-medium text-white">Our Editorial Team</p>
              <time className="text-xs text-slate-500">{issue.date}</time>
            </div>
          </div>
        </div>
      </section>

      {/* Article content */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          {content ? (
            content
          ) : (
            <div className="prose-custom">
              <p>
                This is a placeholder for the full briefing on <strong>{issue.title}</strong>. Replace this content with your actual reporting and analysis.
              </p>
              <p>
                Each briefing we publish is written to give readers a clear-eyed, practical understanding of how AI is playing out in {issue.category.toLowerCase()} — without the noise, the hype, or the generic "AI is changing everything" framing.
              </p>
              <h2>What you'll find in this briefing</h2>
              <p>
                A focused analysis of {issue.title.toLowerCase()}, what it means for people working in {issue.category.toLowerCase()}, and what to watch next. Written with industry context, not just a hot take.
              </p>
              <p>
                This is where the full briefing goes. Each issue typically runs 1,200–2,000 words — long enough to be substantive, short enough to finish in one sitting.
              </p>
            </div>
          )}

          {/* Pull quote */}
          <blockquote className="my-12 rounded-2xl border border-blue-500/15 bg-blue-500/5 p-6">
            <p className="text-lg font-medium text-white leading-snug italic mb-3">
              "Agent drafts, human decides — it's less exciting than full autonomy, but it's the version that's actually shipping."
            </p>
            <cite className="text-sm text-slate-400 not-italic">— Our {issue.category} briefing</cite>
          </blockquote>
        </div>
      </section>

      {/* Related briefings */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-white/5">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-xl font-semibold text-white mb-2">Related briefings</h2>
          <p className="text-sm text-slate-500 mb-8">From other industries we cover</p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {relatedIssues.map((rel) => (
              <IssueCard key={rel.slug} issue={rel} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-white/5">
        <div className="mx-auto max-w-6xl">
          <CTABlock
            title="Enjoyed this briefing?"
            subtitle="Subscribe free and get our briefings delivered to your inbox every Tuesday. It takes 10 seconds to sign up."
          />
        </div>
      </section>
    </div>
  );
}
