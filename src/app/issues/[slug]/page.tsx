import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import CTABlock from "@/components/CTABlock";
import IssueCard from "@/components/IssueCard";
import { issues, getIssueBySlug, categoryColors } from "@/lib/issues";

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
  "ai-agents-are-coming": (
    <div className="prose-custom">
      <p>
        Something shifted in Q1 2026. Autonomous AI agents stopped being a research demo and started appearing in production pipelines. The companies deploying them aren't talking about it loudly — competitive advantage and all that — but if you look at the job postings, the GitHub repos, and the tool usage numbers, the picture is clear.
      </p>
      <h2>What agentic AI actually means</h2>
      <p>
        Strip away the hype and an "agent" is just an LLM that can take actions in a loop. It gets a goal, generates a plan, executes steps, observes results, and iterates. The thing that makes this different from a chatbot isn't the model — it's the <strong>feedback loop</strong>.
      </p>
      <p>
        When a model can see the results of its own actions and course-correct, you unlock a completely different class of tasks. Tasks that previously required continuous human attention can now run unattended. Not perfectly — but well enough to be useful.
      </p>
      <h2>Which frameworks are winning</h2>
      <p>
        Three names keep coming up in serious engineering conversations: <strong>LangGraph</strong> for stateful multi-agent workflows, <strong>CrewAI</strong> for teams of specialized agents, and increasingly <strong>raw OpenAI/Anthropic function calling</strong> for teams that want full control and minimal abstraction.
      </p>
      <p>
        The pattern I'm seeing: startups start with LangGraph or CrewAI, hit edge cases, and then either go deeper into the framework or strip back to first principles. Neither is wrong. The frameworks are maturing quickly.
      </p>
      <h2>What it signals for how software gets built</h2>
      <p>
        The most underrated shift isn't task automation — it's <strong>what gets worth building</strong>. When agents can handle implementation given a spec, the bottleneck moves upstream to product thinking and downstream to evaluation/testing. Engineers who understand both ends of that spectrum will be most valuable.
      </p>
      <p>
        It also changes the unit economics of software. Workflows that were too expensive to build (because human hours cost too much) suddenly become viable when an agent can handle 80% of the execution. Expect a wave of "previously impossible" products in 2026.
      </p>
      <h2>The honest caveats</h2>
      <ul>
        <li>Agents fail in weird ways. Evaluation is hard and mostly unsolved.</li>
        <li>Context windows still matter. Long-running agents hit limits.</li>
        <li>Trust and permissions are a genuine security surface.</li>
        <li>Most "agentic" demos are cherry-picked. Production reality is messier.</li>
      </ul>
      <p>
        None of this makes agents less interesting. It makes them <em>actually</em> interesting — because the hard parts are exactly where leverage lives for builders paying attention.
      </p>
    </div>
  ),
};

export default function IssuePage({ params }: Props) {
  const issue = getIssueBySlug(params.slug);
  if (!issue) notFound();

  const tagClass = categoryColors[issue.category] ?? "bg-slate-500/10 text-slate-400 border border-slate-500/20";
  const content = articleContent[params.slug];
  const relatedIssues = issues.filter((i) => i.slug !== params.slug).slice(0, 3);

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
              All issues
            </Link>
          </div>
          <div className="flex flex-wrap items-center gap-3 mb-5">
            <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${tagClass}`}>
              {issue.category}
            </span>
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
              TI
            </div>
            <div>
              <p className="text-sm font-medium text-white">The Inference</p>
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
                This is a placeholder for the full article on <strong>{issue.title}</strong>. Replace this content with your actual newsletter copy.
              </p>
              <p>
                Each issue of The Inference is written to give readers a clear-eyed, practical understanding of what's happening in AI — without the noise, the hype, or the endless link roundups.
              </p>
              <h2>What you'll find in this issue</h2>
              <p>
                A deep analysis of {issue.title.toLowerCase()}, what it means for builders, and what you should do with this information. Written with context, not just a hot take.
              </p>
              <p>
                This is where the actual newsletter content goes. Each issue is typically 1,200–2,000 words — long enough to be substantive, short enough to finish in one sitting.
              </p>
            </div>
          )}

          {/* Pull quote */}
          <blockquote className="my-12 rounded-2xl border border-blue-500/15 bg-blue-500/5 p-6">
            <p className="text-lg font-medium text-white leading-snug italic mb-3">
              "The most underrated shift isn't task automation — it's what gets worth building."
            </p>
            <cite className="text-sm text-slate-400 not-italic">— The Inference, Issue #{issues.findIndex(i => i.slug === params.slug) + 37}</cite>
          </blockquote>
        </div>
      </section>

      {/* Related issues */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-white/5">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-xl font-semibold text-white mb-8">More issues</h2>
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
            title="Enjoyed this issue?"
            subtitle="Subscribe free and get The Inference delivered to your inbox every Tuesday. It takes 10 seconds to sign up."
          />
        </div>
      </section>
    </div>
  );
}
