export interface ArticleSection {
  h: string | null;
  p: string;
}

export interface ArticleData {
  sections: ArticleSection[];
}

export const articles: Record<string, ArticleData> = {
  finance: {
    sections: [
      {
        h: null,
        p: `Last quarter, JPMorgan's internal AI system processed 360,000 hours of legal document review in seconds. Not an experiment. Not a pilot. Standard workflow. The bank has been quietly deploying AI across its contract intelligence, compliance monitoring, and trade execution layers for two years. Most of it never made the press.`,
      },
      {
        h: "Where agents are already running",
        p: `The clearest use cases are in the back office: reconciliation, regulatory reporting, fraud pattern detection, and trade settlement. These are high-volume, rules-heavy, low-ambiguity tasks — exactly where AI agents perform without needing supervision. Firms like Citadel and Two Sigma have been running algorithmic systems for years, but the new generation is different. These agents do not just execute — they adapt.`,
      },
      {
        h: "What is actually changing",
        p: `The shift is not about replacing traders or analysts wholesale. It is about compressing the ratio of humans to decisions. A compliance team that once needed 40 people to review transactions now needs 8 — and the 8 are focused entirely on edge cases the AI flags as uncertain. The work is harder, but there is less of it.`,
      },
      {
        h: "Where the line still holds",
        p: `Portfolio management at the macro level, client relationships, and anything requiring genuine judgement under novel conditions — these remain human. Not because AI could not attempt them, but because the cost of a wrong call is reputational, not just financial. No fund is ready to explain to LPs that a model made the call that lost 12% in a week.`,
      },
    ],
  },
  education: {
    sections: [
      {
        h: null,
        p: `In a trial run across 14 schools in Arizona, students using an AI tutoring tool for maths scored 32% higher on standardised tests than the control group — in eight weeks. The teachers were not replaced. They were reassigned. Instead of delivering lessons, they spent their time on the students the AI flagged as stuck.`,
      },
      {
        h: "Why this is different",
        p: `The new generation actually models how you think. They track where you hesitate, what kinds of errors you make, what framing clicks for you versus what causes confusion. The tutoring is genuinely personalised in a way that a classroom of 30 students makes structurally impossible.`,
      },
      {
        h: "The university panic",
        p: `Higher education is in a strange position. AI tutors threaten the value proposition of expensive degree programmes. The institutions getting it right are reframing the degree around what AI cannot replicate: credentialing, peer learning, access to networks, and structured accountability.`,
      },
      {
        h: "What this means for teachers",
        p: `The optimistic read is that AI handles instruction and teachers handle everything else — motivation, pastoral care, mentorship. The pessimistic read is that a school system under budget pressure will use AI tutors to cut teaching staff and never reinvest the savings. Both are already happening.`,
      },
    ],
  },
  law: {
    sections: [
      {
        h: null,
        p: `A partner at a Magic Circle firm said something last month that stuck: "We used to bill 200 hours of associate time on a mid-sized M&A deal for document review. Now it is 40. The client knows." The AI did not eliminate the work — it exposed that the work was always priced at a premium nobody could justify.`,
      },
      {
        h: "What contract review AI actually does",
        p: `Tools like Harvey, Kira, and ContractPodAi can ingest thousands of documents and surface anomalies, missing clauses, and risk flags in minutes. They are not making legal judgements — they are pattern-matching at a scale and speed no human can replicate.`,
      },
      {
        h: "The junior associate problem",
        p: `Law firms have always trained their best lawyers through the grind of document review. It was low-value work, but it built familiarity with real transaction structures. If AI removes that training ground, where do the next generation of senior lawyers come from?`,
      },
      {
        h: "What remains human",
        p: `Negotiation. Strategy. Client judgement. The ability to look at a deal structure and tell a client "this is technically fine but it will create problems with your investor in three years" — that is not pattern-matching. AI can surface the clause. Only an experienced lawyer can explain what it means for this client, at this moment.`,
      },
    ],
  },
  healthcare: {
    sections: [
      {
        h: null,
        p: `The radiology department at Mass General runs an AI tool that screens every chest X-ray before a radiologist sees it. Findings are pre-annotated: probable pneumonia, possible nodule, clear. The radiologist still reads every scan. But their attention is directed before they look. In a department handling 400 scans a day, that triage layer has reduced the time from scan to diagnosis for urgent findings by hours.`,
      },
      {
        h: "Where AI is actually deployed",
        p: `The honest answer is: narrow tasks, at scale. Diabetic retinopathy screening. Sepsis early warning systems. Clinical documentation — the AI listens to patient consultations and writes the note so the doctor does not have to. Not glamorous, but live, in real hospitals, every day.`,
      },
      {
        h: "Why it is moving slower",
        p: `The deeper issue is liability. If an AI-assisted diagnosis is wrong and a patient is harmed, who is responsible? Until that question has clear legal answers, every institution's legal team will counsel caution. The FDA has approved over 700 AI medical devices — but most clinicians are not using half of them.`,
      },
      {
        h: "The administrative opportunity nobody talks about",
        p: `While everyone debates clinical AI, the administrative side has already been transformed. Prior authorisation, insurance coding, appointment scheduling — being automated at speed, because the stakes are lower and the ROI is immediate.`,
      },
    ],
  },
  work: {
    sections: [
      {
        h: null,
        p: `A marketing manager at a mid-sized SaaS company described her week last month. Monday: AI drafted the weekly performance report. Tuesday: AI summarised 40 sales calls. Wednesday: AI wrote the first draft of the Q3 campaign brief. Thursday: she reviewed all of it. Friday: she did the parts that required her — stakeholder conversations, creative direction, political navigation.`,
      },
      {
        h: "The task compression effect",
        p: `The most significant thing AI is doing to office work is not eliminating roles — it is compressing how long tasks take. A task that took 4 hours now takes 45 minutes. Which means either you do 5x as much, or the headcount justification for that role gets harder.`,
      },
      {
        h: "What agents are doing now",
        p: `Beyond writing assistance, the more significant shift is in agentic workflows — AI that takes actions. Scheduling across time zones. Pulling data from multiple systems. Managing email triage. Booking travel. That layer of work is disappearing without any announcement.`,
      },
      {
        h: "The jobs that turned out to be harder",
        p: `Anything requiring sustained interpersonal trust. Anything requiring institutional memory that is not written down. The parts that actually matter — judgement, relationships, context — remain stubbornly human. For now.`,
      },
    ],
  },
  startups: {
    sections: [
      {
        h: null,
        p: `There is a pattern playing out in almost every industry. A two-person team with deep domain expertise picks up a foundation model and builds a tool that does in 10 seconds what their former employer took a week to do. They charge $500 a month. They get 200 customers in three months without a single sales hire. The incumbents do not notice for 18 months.`,
      },
      {
        h: "Why vertical beats horizontal",
        p: `The horizontal AI tools are remarkable and general. But general means they are not optimised for your specific workflow, your specific data format, your specific regulatory environment. A legal AI tool built by lawyers is categorically more useful to a law firm than a general assistant.`,
      },
      {
        h: "The funding reality",
        p: `Sequoia, a16z, and Lightspeed have all explicitly backed vertical AI as a category. The thesis: the enabling technology is now cheap and commoditised; the value is in distribution, data moats, and switching costs. A vertical AI tool that integrates deeply into a firm's workflow becomes infrastructure.`,
      },
      {
        h: "How to spot them early",
        p: `The early signals: a founding team with 5 to 10 years of domain experience, a product with a specific measurable outcome, and a customer base that would look laughable for a consumer app but makes perfect sense for enterprise pricing.`,
      },
    ],
  },
  media: {
    sections: [
      {
        h: null,
        p: `In February, a short film generated entirely by Sora won a jury award at a European film festival. The jury knew it was AI-generated. They awarded it anyway. The director was a 22-year-old with no film training. The professional cinematographers in the same competition had combined decades of experience and lost.`,
      },
      {
        h: "What the tools can do now",
        p: `Sora, Kling, Runway, and Pika can generate consistent characters, realistic motion, and coherent scenes from text prompts. Twelve months ago these tools generated three-second clips that looked like fever dreams. Today they produce two-minute scenes that require close inspection to identify as artificial.`,
      },
      {
        h: "The creative industry response",
        p: `Splits are emerging. Some creators are integrating AI tools and producing more, faster, for less money. Others are positioning authenticity as a premium differentiator. Studios are using AI for pre-visualisation while keeping principal photography human.`,
      },
      {
        h: "The advertising industry is already gone",
        p: `A 30-second brand ad that cost £200,000 to shoot in 2022 can now be produced for £8,000 using AI video, with results most consumers cannot distinguish from live action. Advertising production companies are in freefall.`,
      },
    ],
  },
};
