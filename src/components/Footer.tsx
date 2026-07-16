"use client";

const ISSUE_NUM = 98;
const ISSUE_DATE = "Monday, 14 July 2026";

export default function Footer() {
  const goView = (view: string) => {
    window.dispatchEvent(new CustomEvent("ti:goView", { detail: { view } }));
  };

  const openEditModal = () => {
    window.dispatchEvent(new CustomEvent("ti:openEditModal"));
  };

  return (
    <footer role="contentinfo" style={{ background: "var(--ink)", borderTop: "4px solid var(--accent)" }}>
      <div style={{ maxWidth: "var(--w)", margin: "0 auto", padding: "0 var(--pad)" }}>
        {/* Top grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.2fr 1fr 1fr",
            gap: 56,
            padding: "48px 0 36px",
            borderBottom: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          {/* Brand */}
          <div>
            <span style={{ fontSize: 15, fontWeight: 800, letterSpacing: "-0.025em", color: "#fff", display: "block", marginBottom: 10 }}>
              The Inference
            </span>
            <p style={{ fontSize: 13, lineHeight: 1.65, color: "rgba(255,255,255,0.38)" }}>
              One story per industry, per week. What AI is actually changing — not what the press release says.
            </p>
          </div>

          {/* Publication */}
          <div>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)", marginBottom: 14 }}>
              Publication
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <button
                onClick={() => goView("brief")}
                style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", background: "none", border: "none", cursor: "pointer", padding: 0, textAlign: "left", fontFamily: "var(--font-jakarta)", transition: "color 150ms ease" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.9)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.45)")}
              >
                The Brief
              </button>
              <button
                onClick={() => goView("explore")}
                style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", background: "none", border: "none", cursor: "pointer", padding: 0, textAlign: "left", fontFamily: "var(--font-jakarta)", transition: "color 150ms ease" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.9)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.45)")}
              >
                Explore
              </button>
              <button
                onClick={openEditModal}
                style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", background: "none", border: "none", cursor: "pointer", padding: 0, textAlign: "left", fontFamily: "var(--font-jakarta)", transition: "color 150ms ease" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.9)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.45)")}
              >
                Edit industries
              </button>
            </div>
          </div>

          {/* This issue */}
          <div>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)", marginBottom: 14 }}>
              This issue
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[`Issue #${ISSUE_NUM}`, ISSUE_DATE, "theinference.co"].map((item, i) => (
                <span key={i} style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", cursor: "default" }}>
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            padding: "22px 0",
            display: "flex", alignItems: "center", justifyContent: "space-between",
            fontSize: 12, color: "rgba(255,255,255,0.28)",
          }}
        >
          <span>© 2026 The Inference</span>
          <span style={{ fontStyle: "italic" }}>Written for people inside the industries being rewritten.</span>
        </div>
      </div>
    </footer>
  );
}
