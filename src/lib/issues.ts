export interface Issue {
  slug: string;
  title: string;
  date: string;
  description: string;
  category: string;
  readingTime: number;
  issueNumber?: number;
  publishedAt?: string;
  featured?: boolean;
}

// ─── Active publication metadata ────────────────────────────────────────────
// Update `publishedAt` when a new issue goes live.
// Set `issueNumber` when you assign real numbers (1, 2, 3 …).
// Leave issueNumber as null until you decide on numbering.
export const currentIssue = {
  publishedAt: "20 July 2026",
  issueNumber: null as number | null,
};

export const issues: Issue[] = [];

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
