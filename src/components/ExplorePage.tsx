"use client";

import { industries } from "@/lib/industries";

interface ExplorePageProps {
  onOpenArticle: (slug: string, from: "explore") => void;
}

export default function ExplorePage({ onOpenArticle }: ExplorePageProps) {
  return (
    <div>
      {/* Page header */}
      <div
        className="ti-explore-hd"
        style={{ borderBottom: "1px solid var(--ink)", borderTop: "4px solid var(--accent)", padding: "52px 0 48px" }}
      >
        <div style={{ maxWidth: "var(--w)", margin: "0 auto", padding: "0 var(--pad)" }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--ink-3)", marginBottom: 14 }}>
            All industries
          </p>
          <h1 style={{ fontSize: "clamp(34px,3.8vw,58px)", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1, color: "var(--ink)" }}>
            Explore.
          </h1>
        </div>
      </div>

      {/* Panels grid */}
      <div style={{ maxWidth: "var(--w)", margin: "0 auto", padding: "0 var(--pad)", borderBottom: "1px solid var(--rule)" }}>
        <div className="ti-explore-wrap" style={{ borderLeft: "1px solid var(--rule)", borderTop: "1px solid var(--rule)" }}>
          {Array.from({ length: Math.ceil(industries.length / 2) }).map((_, rowIdx) => {
            const pair = industries.slice(rowIdx * 2, rowIdx * 2 + 2);
            return (
              <div key={rowIdx} className="ti-explore-row">
                {pair.map((ind) => (
                  <div
                    key={ind.slug}
                    role="article"
                    tabIndex={0}
                    onClick={() => onOpenArticle(ind.slug, "explore")}
                    onKeyDown={(e) => { if (e.key === "Enter") onOpenArticle(ind.slug, "explore"); }}
                    className="ti-explore-cell"
                    style={{
                      borderRight: "1px solid var(--rule)",
                      borderBottom: "1px solid var(--rule)",
                      padding: "34px 36px",
                      cursor: "pointer",
                      transition: "background 0.15s",
                      display: "flex",
                      flexDirection: "column",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "var(--accent-soft)")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                  >
                    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 10, gap: 12 }}>
                      <h2 style={{ fontSize: "clamp(18px,1.6vw,22px)", fontWeight: 800, letterSpacing: "-0.03em", color: "var(--ink)" }}>
                        {ind.name}
                      </h2>
                      <span style={{ fontSize: 18, color: "var(--accent)", opacity: 0.7, flexShrink: 0, lineHeight: 1, marginTop: 2 }}>→</span>
                    </div>
                    <p style={{ fontSize: "clamp(13px,1.1vw,14px)", lineHeight: 1.62, color: "var(--ink-2)", marginBottom: 20, flex: 1 }}>
                      {ind.description}
                    </p>
                    <div style={{ fontSize: 12, color: "var(--ink-3)", borderTop: "1px solid var(--rule-lt)", paddingTop: 12 }}>
                      Latest: <strong style={{ color: "var(--ink-2)", fontWeight: 600 }}>{ind.headline}</strong>
                    </div>
                  </div>
                ))}
                {pair.length === 1 && (
                  <div className="ti-explore-cell" style={{ borderRight: "1px solid var(--rule)", borderBottom: "1px solid var(--rule)" }} />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* About strip */}
      <div style={{ background: "var(--blush)", borderTop: "1px solid var(--rule)" }}>
        <div
          className="ti-explore-about ti-explore-about-wrap"
          style={{ maxWidth: "var(--w)", margin: "0 auto", padding: "56px var(--pad)" }}
        >
          <div>
            <h2 style={{ fontSize: "clamp(22px,2.4vw,34px)", fontWeight: 800, letterSpacing: "-0.03em", color: "var(--ink)", marginBottom: 14 }}>
              What The Inference covers.
            </h2>
            <p style={{ fontSize: "clamp(15px,1.2vw,16px)", lineHeight: 1.7, color: "var(--ink-2)" }}>
              Seven industries. One story each, per week. No roundups, no hype, no filler.
              We write for people inside the industries being rewritten — people who need to
              understand what AI is doing, not just what it could do.
            </p>
          </div>
          <div>
            {[
              { num: "7", label: "Industries covered, from finance to media" },
              { num: "1×", label: "Deep story per industry per week — not a digest" },
              { num: "Free", label: "Always. Your data stays yours" },
            ].map((fact, i) => (
              <div
                key={i}
                style={{
                  padding: "18px 0",
                  borderBottom: i < 2 ? "1px solid rgba(17,17,15,0.08)" : "none",
                  display: "flex", gap: 20, alignItems: "flex-start",
                }}
              >
                <span style={{ fontSize: 24, fontWeight: 800, letterSpacing: "-0.04em", color: "var(--ink)", minWidth: 60 }}>
                  {fact.num}
                </span>
                <span style={{ fontSize: 14, color: "var(--ink-2)", lineHeight: 1.5, paddingTop: 4 }}>
                  {fact.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
