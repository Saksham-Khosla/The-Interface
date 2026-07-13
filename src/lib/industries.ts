export interface Industry {
  slug: string;
  name: string;
  description: string;
  shortDesc: string;
  headline: string;
  excerpt: string;
  readTime: string;
  block: string;
  tint: string;
  accent: string;
  dot: string;
  titleClr: string;
  excerptClr: string;
  topics: string[];
  exampleArticles: string[];
  icon: string;
}

export const industries: Industry[] = [
  {
    slug: "finance",
    name: "Finance",
    icon: "📈",
    block: "#8A87CE",
    dot: "#C4C2E8",
    titleClr: "#2A2870",
    excerptClr: "rgba(42,40,112,0.45)",
    tint: "#F0EFFA",
    accent: "#3A37A0",
    headline: "How AI Agents Are Entering Finance",
    excerpt:
      "Where banks and funds are trusting autonomous agents with real workflows.",
    readTime: "7 min read",
    description:
      "What AI is actually doing to money, markets, and the people who move both.",
    shortDesc: "Banking, markets, fintech and investing.",
    topics: [
      "Algorithmic trading",
      "Risk management",
      "Regulatory compliance",
      "Fraud detection",
      "Wealth management",
    ],
    exampleArticles: [
      "How JPMorgan's AI Processes More Contracts Than 360 Lawyers",
      "The Hedge Fund That Replaced Its Analysts with Agents",
      "Why Every Bank's Compliance Team Is Half the Size It Was",
    ],
  },
  {
    slug: "education",
    name: "Education",
    icon: "🎓",
    block: "#B8CC3C",
    dot: "#88A010",
    titleClr: "#2C3400",
    excerptClr: "rgba(44,52,0,0.45)",
    tint: "#F4F8DC",
    accent: "#3C4800",
    headline: "AI Tutors Are Getting Disturbingly Good",
    excerpt:
      "Personalised AI tutors are outperforming human teachers in early trials.",
    readTime: "6 min read",
    description:
      "How AI is reshaping classrooms, curricula, and the future of learning.",
    shortDesc: "Classrooms, curricula and the future of learning.",
    topics: [
      "Personalised learning",
      "AI tutoring systems",
      "Credential disruption",
      "EdTech investment",
      "Teacher augmentation",
    ],
    exampleArticles: [
      "The Arizona Trial That Rattled Every School Administrator",
      "What Happens When AI Tutors Are Better Than Human Teachers",
      "Why Universities Are Quietly Terrified of Khan Academy's AI",
    ],
  },
  {
    slug: "law",
    name: "Law",
    icon: "⚖️",
    block: "#C4A83C",
    dot: "#9C7C10",
    titleClr: "#281C00",
    excerptClr: "rgba(40,28,0,0.45)",
    tint: "#FAF4DC",
    accent: "#302000",
    headline: "Can AI Replace Junior Lawyers?",
    excerpt:
      "Contract review tools are reshaping BigLaw billing and the associate pipeline.",
    readTime: "8 min read",
    description:
      "The slow, careful transformation of one of the last human-intensive professions.",
    shortDesc: "BigLaw, contracts and the associate pipeline.",
    topics: [
      "Contract review",
      "Legal research",
      "Associate pipeline",
      "Billing models",
      "Regulatory AI",
    ],
    exampleArticles: [
      "Harvey's $300m Raise and What It Means for Big Law",
      "Document Review Is Over. What Comes Next for Junior Associates?",
      "The M&A Deal That Took 40 Hours Instead of 200",
    ],
  },
  {
    slug: "healthcare",
    name: "Healthcare",
    icon: "🩺",
    block: "#CC8A7A",
    dot: "#E8B8A8",
    titleClr: "#3C1008",
    excerptClr: "rgba(60,16,8,0.45)",
    tint: "#FBEEE8",
    accent: "#681808",
    headline: "The AI Tools Quietly Entering Clinical Care",
    excerpt:
      "In specific workflows, AI is already trusted with real patient decisions.",
    readTime: "7 min read",
    description:
      "A clear-eyed look at where AI is actually working in medicine.",
    shortDesc: "Clinical care, radiology and medical systems.",
    topics: [
      "Diagnostic AI",
      "Clinical documentation",
      "Drug discovery",
      "Hospital operations",
      "FDA approvals",
    ],
    exampleArticles: [
      "Mass General's Radiology AI Is Not a Pilot Anymore",
      "The Real Story Behind 700 FDA-Approved AI Medical Devices",
      "Administrative AI Is Already Transforming Healthcare",
    ],
  },
  {
    slug: "work",
    name: "Work",
    icon: "💼",
    block: "#7A90DC",
    dot: "#B0BEF0",
    titleClr: "#18246A",
    excerptClr: "rgba(24,36,106,0.45)",
    tint: "#EEF1FB",
    accent: "#1E2C80",
    headline: "What Happens When AI Agents Do Your Busywork",
    excerpt:
      "What actually changes when your calendar has an AI assistant in it.",
    readTime: "6 min read",
    description:
      "The changing nature of the office, the meeting, the email, and the career.",
    shortDesc: "The office, the meeting, the email and the career.",
    topics: [
      "AI assistants",
      "Agentic workflows",
      "Headcount decisions",
      "Remote work",
      "Career disruption",
    ],
    exampleArticles: [
      "Microsoft Copilot Hit 300 Million Users. What Does That Mean?",
      "The Five-Hour Workday Is Coming — Whether You're Ready or Not",
      "What AI Agents Are Actually Doing to the Middle Manager",
    ],
  },
  {
    slug: "startups",
    name: "Startups",
    icon: "🚀",
    block: "#C89040",
    dot: "#E8B870",
    titleClr: "#241400",
    excerptClr: "rgba(36,20,0,0.45)",
    tint: "#FAF0DC",
    accent: "#281400",
    headline: "The Vertical AI Land Grab Is Just Getting Started",
    excerpt:
      "The most important AI companies are building where the big labs cannot be bothered.",
    readTime: "7 min read",
    description:
      "Where the funding is going and why domain expertise is the new moat.",
    shortDesc: "Funding, founders and vertical AI bets.",
    topics: [
      "Vertical AI",
      "Seed funding",
      "Domain moats",
      "Go-to-market",
      "Founder archetypes",
    ],
    exampleArticles: [
      "The Two-Person Team That Replaced an Entire Department",
      "Why Sequoia Is Betting on Vertical AI Over Foundation Models",
      "The New Startup Playbook: Domain First, AI Second",
    ],
  },
  {
    slug: "media",
    name: "Media",
    icon: "🎬",
    block: "#B86898",
    dot: "#D8A0C4",
    titleClr: "#380028",
    excerptClr: "rgba(56,0,40,0.45)",
    tint: "#F8EEFF",
    accent: "#5A0040",
    headline: "AI Video Is Getting Good Enough to Worry About",
    excerpt: "The tools reshaping how content is made have crossed a threshold.",
    readTime: "6 min read",
    description:
      "How AI is rewriting the economics of publishing, broadcasting, and creative work.",
    shortDesc: "Publishing, broadcasting and creative work.",
    topics: [
      "AI video generation",
      "Publishing economics",
      "Creator tools",
      "Synthetic media",
      "Advertising production",
    ],
    exampleArticles: [
      "The $8,000 AI Ad That Beat the $200,000 Version",
      "Sora Won a Film Festival. The Judges Knew It Was AI.",
      "Why Every Publisher Is Quietly Rebuilding Around AI Content",
    ],
  },
];

export function getIndustryBySlug(slug: string): Industry | undefined {
  return industries.find((i) => i.slug === slug);
}
