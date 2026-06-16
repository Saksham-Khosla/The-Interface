export interface Issue {
  slug: string;
  title: string;
  date: string;
  description: string;
  category: string;
  readingTime: number;
  featured?: boolean;
}

export const issues: Issue[] = [
  {
    slug: "ai-agents-are-coming",
    title: "The AI Agents Are Coming",
    date: "June 10, 2026",
    description:
      "Autonomous AI agents are moving from research demos to production pipelines. We break down what agentic AI actually means, which frameworks are winning, and what it signals for how software gets built next.",
    category: "Agents",
    readingTime: 6,
    featured: true,
  },
  {
    slug: "open-source-vs-big-tech",
    title: "Open Source AI vs Big Tech",
    date: "June 3, 2026",
    description:
      "Meta's Llama releases ignited the open-weights movement. But is open source actually winning — or is it just the best marketing story in tech right now? We look at the numbers and the nuance.",
    category: "Industry",
    readingTime: 7,
    featured: true,
  },
  {
    slug: "what-gpt5-means-for-builders",
    title: "What GPT-5 Means for Builders",
    date: "May 27, 2026",
    description:
      "The next frontier model isn't just smarter — it changes what's worth building. Here's what founders and engineers should actually pay attention to, and what you can safely ignore.",
    category: "Models",
    readingTime: 5,
    featured: true,
  },
  {
    slug: "future-of-ai-search",
    title: "The Future of AI Search",
    date: "May 20, 2026",
    description:
      "Perplexity, ChatGPT Search, Google AI Overviews — the search wars are heating up. We examine who's winning the UX game, what the business model actually looks like, and where this goes.",
    category: "Products",
    readingTime: 6,
  },
  {
    slug: "how-startups-use-ai-internally",
    title: "How Startups Are Using AI Internally",
    date: "May 13, 2026",
    description:
      "Beyond the product layer: we surveyed 40+ founders on how their teams use AI in day-to-day operations. The answers range from obvious to genuinely surprising.",
    category: "Operations",
    readingTime: 8,
  },
  {
    slug: "reasoning-models-explained",
    title: "Reasoning Models, Explained",
    date: "May 6, 2026",
    description:
      "Chain-of-thought, o1, extended thinking — what's actually happening inside a reasoning model, and when does it matter vs. when is it overkill? A clear-eyed breakdown.",
    category: "Models",
    readingTime: 7,
  },
];

export function getIssueBySlug(slug: string): Issue | undefined {
  return issues.find((i) => i.slug === slug);
}

export function getFeaturedIssues(): Issue[] {
  return issues.filter((i) => i.featured);
}

export const categoryColors: Record<string, string> = {
  Agents: "bg-blue-500/10 text-blue-400 border border-blue-500/20",
  Industry: "bg-purple-500/10 text-purple-400 border border-purple-500/20",
  Models: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
  Products: "bg-amber-500/10 text-amber-400 border border-amber-500/20",
  Operations: "bg-rose-500/10 text-rose-400 border border-rose-500/20",
};
