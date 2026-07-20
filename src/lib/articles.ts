export interface ArticleSection {
  h: string | null;
  p: string;
}

export interface ArticleData {
  author: string;
  sections: ArticleSection[];
}

// Add real articles here when published.
// Key = industry slug (e.g. "finance", "healthcare").
// Leave empty until the first real issue goes live.
export const articles: Record<string, ArticleData> = {};
