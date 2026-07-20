"use client";

import { useState } from "react";
import { Industry } from "@/lib/industries";
import { currentIssue } from "@/lib/issues";
import { ArtPanel, SecArtPanel } from "./ArtPanel";

interface BriefPageProps {
  selectedIndustries: Industry[];
  email: string;
  onOpenArticle: (slug: string, from: "brief") => void;
}

export default function BriefPage({
  selectedIndustries,
  email,
  onOpenArticle,
}: BriefPageProps) {
  const [subEmail, setSubEmail] = useState("");
  const [subDone, setSubDone] = useState(false);

  if (!selectedIndustries.length) return null;

  const lead = selectedIndustries[0];
  const secondary = selectedIndustries.length > 1 ? selectedIndustries[1] : null;
  const compacts = selectedIndustries.slice(2);
  const nameStr = selectedIndustries.map((i) => i.name).join(". ");

  const handleSubSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(subEmail)) return;
    try {
      await fetch("/api/invite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refereeEmail: subEmail, referrerEmail: email }),
      });
    } catch {}
    setSubDone(true);
  };

  return (
    <div>
      {/* Page header */}
      <div style={{ borderBottom: "1px solid var(--ink)", padding: "52px 0 48px" }}>
        <div style={{ maxWidth: "var(--w)", margin: "0 auto", padding: "0 var(--pad)" }}>
          <div className="ti-hd-grid">
            <div>
              <div style={{ width: 28, height: 3, background: "var(--accent)", borderRadius: 2, marginBottom: 14 }} />
              <p className="eyebrow" style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--ink-3)", marginBottom: 14, display: "flex", alignItems: "center", gap: 10 }}>
                Your Brief
              </p>
              <h1
                className="ti-brief-headline"
                style={{ fontSize: "clamp(28px,3.8vw,58px)", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1.05, color: "var(--ink)", textWrap: "balance" } as React.CSSProperties}
              >
                {nameStr}.<br />Reduced to what matters.
              </h1>
            </div>
            <div style={{ paddingBottom: 4 }}>
              <p style={{ fontSize: 15, lineHeight: 1.65, color: "var(--ink-2)", marginBottom: 20 }}>
                A concise weekly briefing on AI across the industries you follow.
              </p>
              <div style={{ fontSize: 12, color: "var(--ink-3)", lineHeight: 1.7 }}>
                <strong style={{ color: "var(--ink-2)", fontWeight: 600 }}>{currentIssue.publishedAt}</strong><br />
                Published weekly
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Primary stories */}
      <div style={{ maxWidth: "var(--w)", margin: "0 auto", padding: "0 var(--pad)" }}>
        <div className={`ti-stories-grid${secondary ? " has-secondary" : ""}`}>
          {/* Lead story */}
          <div
            role="article"
            tabIndex={0}
            className={`ti-lead${secondary ? " has-secondary" : ""}`}
            onClick={() => onOpenArticle(lead.slug, "brief")}
            onKeyDown={(e) => { if (e.key === "Enter") onOpenArticle(lead.slug, "brief"); }}
          >
            <div className={`ti-lead-art${secondary ? " has-secondary" : ""}`}>
              <ArtPanel id={lead.slug} />
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.09em", textTransform: "uppercase", color: "var(--ink-3)" }}>{lead.name}</span>
              <span style={{ width: 3, height: 3, borderRadius: "50%", background: "var(--rule)", flexShrink: 0, display: "inline-block" }} />
              <span style={{ fontSize: 12, color: "var(--ink-3)" }}>{lead.readTime}</span>
            </div>
            <h2 style={{ fontSize: "clamp(22px,2.2vw,30px)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.18, color: "var(--ink)", marginBottom: 12 }}>
              {lead.headline}
            </h2>
            <p style={{ fontSize: 16, lineHeight: 1.65, color: "var(--ink-2)", marginBottom: 20 }}>
              {lead.excerpt}
            </p>
            <span style={{ fontSize: 13, fontWeight: 700, color: "var(--accent)", display: "inline-flex", alignItems: "center", gap: 6, letterSpacing: "-0.01em" }}>
              Read story <span style={{ display: "inline-block", transition: "transform 0.15s" }}>→</span>
            </span>
          </div>

          {/* Secondary story */}
          {secondary && (
            <div
              role="article"
              tabIndex={0}
              onClick={() => onOpenArticle(secondary.slug, "brief")}
              onKeyDown={(e) => { if (e.key === "Enter") onOpenArticle(secondary.slug, "brief"); }}
              className="ti-secondary"
            >
              <div className="ti-secondary-art">
                <SecArtPanel industry={secondary} />
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.09em", textTransform: "uppercase", color: "var(--ink-3)" }}>{secondary.name}</span>
                <span style={{ width: 3, height: 3, borderRadius: "50%", background: "var(--rule)", flexShrink: 0, display: "inline-block" }} />
                <span style={{ fontSize: 12, color: "var(--ink-3)" }}>{secondary.readTime}</span>
              </div>
              <h2 style={{ fontSize: "clamp(17px,1.6vw,21px)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.22, color: "var(--ink)", marginBottom: 8 }}>
                {secondary.headline}
              </h2>
              <p style={{ fontSize: 13.5, lineHeight: 1.6, color: "var(--ink-2)", marginBottom: 14, flex: 1 }}>
                {secondary.excerpt}
              </p>
              <span style={{ fontSize: 13, fontWeight: 700, color: "var(--accent)", display: "inline-flex", alignItems: "center", gap: 6 }}>
                Read story →
              </span>
            </div>
          )}
        </div>

        {/* Compact stories */}
        {compacts.length > 0 && (
          <div style={{ padding: "36px 0", borderBottom: "1px solid var(--rule)" }}>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--ink-3)", marginBottom: 20 }}>
              Also in this issue
            </p>
            <div>
              {compacts.map((ind) => (
                <div
                  key={ind.slug}
                  role="article"
                  tabIndex={0}
                  onClick={() => onOpenArticle(ind.slug, "brief")}
                  onKeyDown={(e) => { if (e.key === "Enter") onOpenArticle(ind.slug, "brief"); }}
                  style={{
                    padding: "22px 28px 22px 0",
                    borderBottom: "1px solid var(--rule-lt)",
                    cursor: "pointer",
                    display: "grid",
                    gridTemplateColumns: "1fr auto",
                    gap: 20,
                    alignItems: "center",
                  }}
                >
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 7 }}>
                      <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.09em", textTransform: "uppercase", color: "var(--ink-3)" }}>{ind.name}</span>
                      <span style={{ width: 3, height: 3, borderRadius: "50%", background: "var(--rule)", flexShrink: 0, display: "inline-block" }} />
                      <span style={{ fontSize: 12, color: "var(--ink-3)" }}>{ind.readTime}</span>
                    </div>
                    <div style={{ fontSize: 16, fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.32, color: "var(--ink)" }}>
                      {ind.headline}
                    </div>
                    <div style={{ fontSize: 13, lineHeight: 1.55, color: "var(--ink-2)", marginTop: 5 }}>
                      {ind.excerpt}
                    </div>
                  </div>
                  <span style={{ color: "var(--accent)", opacity: 0.7 }}>→</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Subscription strip */}
      <div style={{ background: "var(--accent-strong)", borderTop: "1px solid rgba(0,0,0,0.15)" }}>
        <div className="ti-subscribe-grid" style={{ maxWidth: "var(--w)", margin: "0 auto", padding: "clamp(36px,4vw,52px) var(--pad) calc(clamp(36px,4vw,52px) + env(safe-area-inset-bottom))" }}>
          <h2 style={{ fontSize: "clamp(24px,2.6vw,36px)", fontWeight: 800, letterSpacing: "-0.035em", lineHeight: 1.1, color: "var(--on-accent)" }}>
            Share The Inference<br />with a colleague.
          </h2>
          <div>
            <p style={{ fontSize: 15, lineHeight: 1.65, color: "var(--on-accent)", opacity: 0.65, marginBottom: 20 }}>
              Know someone inside the industries being rewritten? One link is all it takes.
            </p>
            {subDone ? (
              <p style={{ fontSize: 14, color: "var(--on-accent)", fontWeight: 600, opacity: 0.8 }}>✓ Thanks — they&apos;ll get an invite shortly.</p>
            ) : (
              <form onSubmit={handleSubSubmit} style={{ display: "flex", gap: 8 }}>
                <input
                  type="email"
                  value={subEmail}
                  onChange={(e) => setSubEmail(e.target.value)}
                  placeholder="colleague@example.com"
                  style={{
                    flex: 1, height: 44, border: "1px solid rgba(255,255,255,0.25)", borderRadius: 7,
                    padding: "0 16px", fontFamily: "var(--font-jakarta)", fontSize: 16, color: "var(--ink)",
                    background: "rgba(255,255,255,0.92)", outline: "none",
                  }}
                />
                <button
                  type="submit"
                  style={{
                    height: 44, padding: "0 20px", background: "var(--on-accent)", color: "var(--accent-strong)",
                    border: "none", borderRadius: 7, fontFamily: "var(--font-jakarta)", fontSize: 13,
                    fontWeight: 700, cursor: "pointer", letterSpacing: "-0.01em", whiteSpace: "nowrap",
                  }}
                >
                  Invite
                </button>
              </form>
            )}
            <p style={{ fontSize: 12, color: "var(--on-accent)", opacity: 0.4, marginTop: 10 }}>Free forever. No spam, ever.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
