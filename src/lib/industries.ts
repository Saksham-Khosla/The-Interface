export interface Industry {
  slug: string;
  name: string;
  description: string;
  topics: string[];
  exampleArticles: string[];
  icon: string;
}

export const industries: Industry[] = [
  {
    slug: "finance",
    name: "Finance",
    description:
      "How AI is changing investing, banking, fintech, markets, fraud detection, and financial analysis.",
    topics: [
      "AI analysts",
      "Fraud detection",
      "Algorithmic trading",
      "Personal finance tools",
      "Banking automation",
    ],
    exampleArticles: [
      "How AI Agents Are Entering Finance",
      "The Rise of AI-Native Hedge Funds",
      "Can AI Catch Fraud Before It Happens?",
    ],
    icon: "📈",
  },
  {
    slug: "education",
    name: "Education",
    description:
      "AI tutors, personalised learning, school policy, student workflows, and the future of universities.",
    topics: [
      "AI tutors",
      "Homework and assessment",
      "Personalised learning",
      "University disruption",
      "Classroom policy",
    ],
    exampleArticles: [
      "The Future of AI Tutors",
      "How Universities Are Rewriting Their Cheating Policies",
      "What Personalised Learning Actually Looks Like",
    ],
    icon: "🎓",
  },
  {
    slug: "law",
    name: "Law",
    description:
      "Legal research, contract review, compliance, regulation, and how law firms are using AI.",
    topics: [
      "Contract review",
      "Legal research",
      "Compliance",
      "AI regulation",
      "Law firm automation",
    ],
    exampleArticles: [
      "Can AI Replace Junior Lawyers?",
      "Inside the AI Tools Reshaping Contract Review",
      "What the New Wave of AI Regulation Means for Firms",
    ],
    icon: "⚖️",
  },
  {
    slug: "healthcare",
    name: "Healthcare",
    description:
      "Diagnostics, drug discovery, clinical workflows, admin automation, and patient care.",
    topics: [
      "Diagnostics",
      "Drug discovery",
      "Patient data",
      "Clinical documentation",
      "Hospital operations",
    ],
    exampleArticles: [
      "Why Healthcare AI Is Moving Slower Than Expected",
      "Inside the AI Models Speeding Up Drug Discovery",
      "The Quiet Rise of AI Medical Scribes",
    ],
    icon: "🩺",
  },
  {
    slug: "work",
    name: "Work",
    description:
      "AI agents, productivity tools, workplace automation, hiring, and the future of jobs.",
    topics: [
      "AI agents",
      "Productivity tools",
      "Automation",
      "Hiring",
      "Future of jobs",
    ],
    exampleArticles: [
      "The AI Tools Quietly Changing Office Work",
      "How Hiring Is Being Reshaped by AI Screening",
      "What Happens When Agents Do Your Busywork",
    ],
    icon: "💼",
  },
  {
    slug: "startups",
    name: "Startups",
    description:
      "AI-native companies, funding trends, product ideas, founder workflows, and new business models.",
    topics: [
      "AI-native products",
      "Funding trends",
      "Founder tools",
      "Vertical AI",
      "New business models",
    ],
    exampleArticles: [
      "What AI-Native Startups Are Building Next",
      "The Vertical AI Land Grab, Explained",
      "How Founders Are Using AI to Run Lean Teams",
    ],
    icon: "🚀",
  },
  {
    slug: "media",
    name: "Media",
    description:
      "AI in journalism, content creation, entertainment, advertising, deepfakes, and creator tools.",
    topics: [
      "AI video",
      "Journalism",
      "Creator tools",
      "Advertising",
      "Deepfakes",
    ],
    exampleArticles: [
      "AI Video Is Getting Good Enough to Worry About",
      "How Newsrooms Are Quietly Adopting AI",
      "The Creator Economy's New AI Toolkit",
    ],
    icon: "🎬",
  },
];

export function getIndustryBySlug(slug: string): Industry | undefined {
  return industries.find((i) => i.slug === slug);
}
