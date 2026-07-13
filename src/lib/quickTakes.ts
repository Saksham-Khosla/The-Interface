export interface QuickTake {
  tag: string;
  text: string;
  body: string;
}

export const quickTakes: QuickTake[] = [
  {
    tag: "Finance",
    text: "Goldman Sachs reports 22% of analyst workflows now handled by AI",
    body: "The first full fiscal year with autonomous agents in production. Junior headcount is down 14% year-on-year.",
  },
  {
    tag: "Policy",
    text: "The EU AI Act's first compliance deadline passes",
    body: "Enforcement notices issued to three large-language-model providers operating in Germany and France.",
  },
  {
    tag: "Startups",
    text: "Harvey raises $300m at a $3bn valuation",
    body: "The first legal AI company to cross the unicorn threshold twice in 18 months. Led by Sequoia and General Catalyst.",
  },
  {
    tag: "Work",
    text: "Microsoft Copilot crosses 300 million monthly active users",
    body: "Up from 40m a year ago. Most engagement is in Teams meeting summaries and email drafting.",
  },
];
