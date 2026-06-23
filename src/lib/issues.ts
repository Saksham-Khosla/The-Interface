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
    slug: "ai-agents-entering-finance",
    title: "How AI Agents Are Entering Finance",
    date: "June 10, 2026",
    description:
      "Autonomous agents are starting to handle reconciliation, reporting, and first-pass analysis inside banks and funds. We break down where they're actually being trusted with real workflows — and where humans still have the final say.",
    category: "Finance",
    readingTime: 7,
    featured: true,
  },
  {
    slug: "future-of-ai-tutors",
    title: "The Future of AI Tutors",
    date: "June 3, 2026",
    description:
      "Personalised AI tutoring tools are moving from novelty to classroom staple. We look at what's actually working, what teachers are pushing back on, and what it means for the next decade of education.",
    category: "Education",
    readingTime: 6,
    featured: true,
  },
  {
    slug: "can-ai-replace-junior-lawyers",
    title: "Can AI Replace Junior Lawyers?",
    date: "May 27, 2026",
    description:
      "Contract review and legal research tools are eating into the work that used to train first-year associates. We examine what that means for the legal profession's talent pipeline.",
    category: "Law",
    readingTime: 8,
    featured: true,
  },
  {
    slug: "healthcare-ai-moving-slowly",
    title: "Why Healthcare AI Is Moving Slower Than Expected",
    date: "May 20, 2026",
    description:
      "Despite huge investment, AI adoption in hospitals lags other industries. We unpack the regulatory, liability, and workflow reasons healthcare is the hardest industry to transform.",
    category: "Healthcare",
    readingTime: 7,
  },
  {
    slug: "ai-tools-changing-office-work",
    title: "The AI Tools Quietly Changing Office Work",
    date: "May 13, 2026",
    description:
      "Beyond the headlines: a look at the unglamorous AI tools — meeting notes, inbox triage, internal search — that are quietly reshaping how knowledge workers spend their day.",
    category: "Work",
    readingTime: 6,
  },
  {
    slug: "ai-native-startups-building-next",
    title: "What AI-Native Startups Are Building Next",
    date: "May 6, 2026",
    description:
      "We surveyed 40+ AI-native founders on what they're building after the first wave of wrapper products. The answers point to a more vertical, infrastructure-heavy second wave.",
    category: "Startups",
    readingTime: 7,
  },
  {
    slug: "ai-video-getting-good",
    title: "AI Video Is Getting Good Enough to Worry About",
    date: "April 29, 2026",
    description:
      "Generative video tools crossed a quality threshold this year. We look at what it means for advertising, entertainment, and the fight against synthetic media.",
    category: "Media",
    readingTime: 6,
  },
  {
    slug: "ai-fraud-detection-banks",
    title: "Inside the AI Models Banks Use to Catch Fraud",
    date: "April 22, 2026",
    description:
      "Fraud detection was one of the first real-world AI success stories in finance. A look at how the models work, where they fail, and what's next.",
    category: "Finance",
    readingTime: 6,
  },
];

export function getIssueBySlug(slug: string): Issue | undefined {
  return issues.find((i) => i.slug === slug);
}

export function getFeaturedIssues(): Issue[] {
  return issues.filter((i) => i.featured);
}

// Subtle dot color per category — used with the neutral CategoryTag pill
// instead of loud, fully-saturated colored badges.
export const categoryDotColors: Record<string, string> = {
  Finance: "bg-emerald-400",
  Education: "bg-amber-400",
  Law: "bg-violet-400",
  Healthcare: "bg-rose-400",
  Work: "bg-sky-400",
  Startups: "bg-teal-400",
  Media: "bg-indigo-400",
};
