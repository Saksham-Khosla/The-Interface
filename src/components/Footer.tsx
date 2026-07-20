"use client";

import { currentIssue } from "@/lib/issues";

export default function Footer() {
  const goView = (view: string) => {
    window.dispatchEvent(new CustomEvent("ti:goView", { detail: { view } }));
  };

  const openEditModal = () => {
    window.dispatchEvent(new CustomEvent("ti:openEditModal"));
  };

  const linkStyle: React.CSSProperties = {
    fontSize: 13, color: "rgba(255,255,255,0.45)", background: "none",
    border: "none", cursor: "pointer", padding: 0, textAlign: "left",
    fontFamily: "var(--font-jakarta)", transition: "color 150ms ease",
    minHeight: 32, display: "flex", alignItems: "center",
  };

  return (
    <footer role="contentinfo" style={{ background: "var(--ink)", borderTop: "4px solid var(--accent)" }}>
      <div style={{ maxWidth: "var(--w)", margin: "0 auto", padding: "0 var(--pad)" }}>
        {/* Top grid */}
        <div className="ti-footer-top">
          {/* Brand */}
          <div>
            <span style={{ fontSize: 15, fontWeight: 800, letterSpacing: "-0.025em", color: "#fff", display: "block" }}>
              The Inference
            </span>
          </div>

          {/* Publication */}
          <div>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)", marginBottom: 14 }}>
              Publication
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <button
                onClick={() => goView("brief")}
                style={linkStyle}
                onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.9)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.45)")}
              >
                The Brief
              </button>
              <button
                onClick={() => goView("explore")}
                style={linkStyle}
                onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.9)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.45)")}
              >
                Explore
              </button>
              <button
                onClick={openEditModal}
                style={linkStyle}
                onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.9)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.45)")}
              >
                Edit industries
              </button>
            </div>
          </div>

          {/* This issue — only shown when real metadata exists */}
          {currentIssue.issueNumber !== null && (
            <div>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)", marginBottom: 14 }}>
                This issue
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <span style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", cursor: "default" }}>
                  Issue #{currentIssue.issueNumber}
                </span>
                <span style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", cursor: "default" }}>
                  {currentIssue.publishedAt}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Bottom bar */}
        <div className="ti-footer-bottom">
          <span>© 2026 The Inference</span>
          <span style={{ fontStyle: "italic" }}>Written for people inside the industries being rewritten.</span>
        </div>
      </div>
    </footer>
  );
}
