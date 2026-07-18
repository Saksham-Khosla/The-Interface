"use client";

import { useState, useEffect, useRef } from "react";
import { Industry } from "@/lib/industries";
import { articles } from "@/lib/articles";
import { ArtPanel } from "./ArtPanel";

interface Comment {
  name: string;
  text: string;
  time: number;
}

interface ArticlePageProps {
  industry: Industry;
  from: "brief" | "explore";
  initialComments: Comment[];
  scrollToDisc: boolean;
  onBack: () => void;
  onCommentsChange: (slug: string, comments: Comment[]) => void;
}

function timeAgo(ms: number) {
  const diff = Date.now() - ms;
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

export default function ArticlePage({
  industry,
  from,
  initialComments,
  scrollToDisc,
  onBack,
  onCommentsChange,
}: ArticlePageProps) {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [draft, setDraft] = useState("");
  const discRef = useRef<HTMLDivElement>(null);

  const articleData = articles[industry.slug];

  useEffect(() => {
    if (scrollToDisc && discRef.current) {
      setTimeout(() => {
        discRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, [scrollToDisc]);

  const postComment = () => {
    if (!draft.trim()) return;
    const next = [...comments, { name: "You", text: draft.trim(), time: Date.now() }];
    setComments(next);
    onCommentsChange(industry.slug, next);
    setDraft("");
  };

  const deleteComment = (i: number) => {
    const next = comments.filter((_, idx) => idx !== i);
    setComments(next);
    onCommentsChange(industry.slug, next);
  };

  return (
    <div>
      {/* Article header */}
      <div style={{ borderBottom: "1px solid var(--ink)", padding: "clamp(28px,4vw,52px) 0 clamp(24px,3.5vw,48px)", background: industry.tint }}>
        <div style={{ maxWidth: 780, margin: "0 auto", padding: "0 var(--pad)" }}>
          <button
            onClick={onBack}
            style={{
              background: "none", border: "none", cursor: "pointer",
              fontFamily: "var(--font-jakarta)", fontSize: 13, fontWeight: 600,
              color: industry.titleClr, padding: 0, marginBottom: 36,
              display: "inline-flex", alignItems: "center", gap: 6,
              opacity: 0.7, transition: "opacity 0.12s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.7")}
          >
            ← Back to {from === "brief" ? "Brief" : "Explore"}
          </button>

          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
            <div style={{ height: 3, width: 22, borderRadius: 2, background: "var(--accent)" }} />
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: industry.titleClr, opacity: 0.7 }}>
              {industry.name}
            </span>
          </div>

          <h1 style={{ fontSize: "clamp(28px,3.6vw,44px)", fontWeight: 800, letterSpacing: "-0.035em", lineHeight: 1.1, color: industry.titleClr, marginBottom: 16 }}>
            {industry.headline}
          </h1>
          <p style={{ fontSize: 19, lineHeight: 1.6, color: industry.excerptClr, fontStyle: "italic", marginBottom: 22 }}>
            {industry.excerpt}
          </p>
          <div style={{ fontSize: 12, color: industry.titleClr, opacity: 0.5, display: "flex", alignItems: "center", gap: 12 }}>
            <span>The Inference</span>
            <span style={{ width: 3, height: 3, borderRadius: "50%", background: industry.accent, opacity: 0.4, display: "inline-block" }} />
            <span>{industry.readTime}</span>
            <span style={{ width: 3, height: 3, borderRadius: "50%", background: industry.accent, opacity: 0.4, display: "inline-block" }} />
            <span>Issue #98</span>
          </div>
        </div>
      </div>

      {/* Art panel */}
      <div style={{ maxWidth: 780, margin: "0 auto", padding: "28px var(--pad) 0" }}>
        <div className="ti-article-art">
          <ArtPanel id={industry.slug} />
        </div>
      </div>

      {/* Article body */}
      <div style={{ maxWidth: 780, margin: "0 auto", padding: "clamp(32px,4vw,52px) var(--pad) clamp(40px,5vw,64px)" }}>
        {articleData?.sections.map((section, i) => (
          <div key={i}>
            {section.h && (
              <h2 style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-0.025em", margin: "54px 0 16px", color: "var(--ink)" }}>
                {section.h}
              </h2>
            )}
            <p style={{ fontSize: 18, lineHeight: 1.8, color: "#1C1A15", marginBottom: 30 }}>
              {section.p}
            </p>
          </div>
        ))}
      </div>

      {/* Article footer */}
      <div style={{ borderTop: "1px solid var(--ink)" }}>
        <div style={{ maxWidth: 780, margin: "0 auto", padding: "20px var(--pad)", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
          <span style={{ fontSize: 13, color: "var(--ink-3)" }}>Issue #98 · {industry.name}</span>
          <button
            onClick={() => discRef.current?.scrollIntoView({ behavior: "smooth" })}
            style={{
              fontSize: 12, color: "var(--ink-3)", background: "none", border: "none",
              cursor: "pointer", fontFamily: "var(--font-jakarta)", padding: 0,
              transition: "color 150ms ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--ink-3)")}
          >
            {comments.length === 0 ? "Leave a comment" : `${comments.length} comment${comments.length !== 1 ? "s" : ""}`} ↓
          </button>
        </div>
      </div>

      {/* Discussion */}
      <div ref={discRef} style={{ maxWidth: 780, margin: "0 auto", padding: "44px var(--pad) 80px" }} id="article-disc">
        <div style={{ display: "flex", alignItems: "baseline", gap: 14, marginBottom: 28, paddingBottom: 18, borderBottom: "1px solid var(--rule)" }}>
          <span style={{ fontSize: 16, fontWeight: 800, letterSpacing: "-0.02em", color: "var(--ink)" }}>Discussion</span>
          <span style={{ fontSize: 12, color: "var(--ink-3)" }}>{comments.length} comment{comments.length !== 1 ? "s" : ""}</span>
        </div>

        {/* Comment list */}
        {comments.length === 0 && (
          <p style={{ padding: "24px 0 28px", fontSize: 14, color: "var(--ink-3)" }}>
            No comments yet. Be the first.
          </p>
        )}
        {comments.length > 0 && (
          <div style={{ marginBottom: 24 }}>
            {comments.map((c, i) => (
              <div key={i} style={{ padding: "18px 0", borderBottom: "1px solid var(--rule-lt)", borderTop: i === 0 ? "1px solid var(--rule-lt)" : "none" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: "var(--ink)" }}>{c.name}</span>
                  <span style={{ fontSize: 11, color: "var(--ink-3)" }}>{timeAgo(c.time)}</span>
                </div>
                <p style={{ fontSize: 14, lineHeight: 1.65, color: "var(--ink-2)", marginBottom: 10 }}>
                  {c.text}
                </p>
                <div style={{ display: "flex", gap: 16 }}>
                  <button
                    onClick={() => deleteComment(i)}
                    style={{ fontSize: 12, color: "var(--ink-3)", background: "none", border: "none", cursor: "pointer", fontFamily: "var(--font-jakarta)", padding: 0, transition: "color 150ms ease" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--ink)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "var(--ink-3)")}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Comment form */}
        <label style={{ display: "block", fontSize: 11, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--ink-3)", marginBottom: 8 }}>
          Add a comment
        </label>
        <div className="ti-comment-form">
          <input
            type="text"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); postComment(); } }}
            placeholder="Share a thought…"
            style={{
              flex: 1, height: 44, border: "1px solid var(--rule)", borderRadius: 8,
              padding: "0 14px", fontFamily: "var(--font-jakarta)",
              fontSize: 16, /* 16px prevents iOS auto-zoom */
              color: "var(--ink)", background: "var(--surface)", outline: "none",
            }}
            onFocus={(e) => (e.currentTarget.style.borderColor = "var(--accent)")}
            onBlur={(e) => (e.currentTarget.style.borderColor = "var(--rule)")}
          />
          <button
            onClick={postComment}
            disabled={!draft.trim()}
            style={{
              height: 44, padding: "0 18px", background: "var(--accent)", color: "#fff",
              border: "none", borderRadius: 8, fontFamily: "var(--font-jakarta)", fontSize: 13,
              fontWeight: 700, cursor: draft.trim() ? "pointer" : "not-allowed",
              opacity: draft.trim() ? 1 : 0.3, transition: "opacity 150ms ease",
            }}
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
}
