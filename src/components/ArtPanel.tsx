import { Industry } from "@/lib/industries";

interface ArtPanelProps {
  id: string;
  className?: string;
}

/** Full editorial art panels (lead story) */
export function ArtPanel({ id, className = "" }: ArtPanelProps) {
  const style: React.CSSProperties = {
    position: "absolute",
    inset: 0,
    overflow: "hidden",
  };

  if (id === "finance") {
    return (
      <div className={className} style={{ position: "absolute", inset: 0, background: "#0C0926", overflow: "hidden" }}>
        <svg
          style={{ position: "absolute", left: 0, right: 0, top: 0, bottom: 38, width: "100%", height: "calc(100% - 38px)" }}
          viewBox="0 0 600 200"
          preserveAspectRatio="none"
        >
          <line x1="0" y1="50" x2="600" y2="50" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
          <line x1="0" y1="100" x2="600" y2="100" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
          <line x1="0" y1="150" x2="600" y2="150" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
          <polyline
            points="0,175 70,148 130,157 200,100 280,118 360,60 440,74 520,36 600,18"
            fill="none"
            stroke="#EFFFA5"
            strokeWidth="2.5"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
          <polyline
            points="0,175 70,148 130,157 200,100 280,118 360,60 440,74 520,36 600,18 600,200 0,200"
            fill="rgba(239,255,165,0.05)"
            stroke="none"
          />
          <circle cx="600" cy="18" r="5" fill="#EFFFA5" />
          <circle cx="600" cy="18" r="14" fill="rgba(239,255,165,0.12)" />
        </svg>
        <div style={{ position: "absolute", top: 18, left: 20, fontSize: 10, fontWeight: 700, letterSpacing: "0.09em", textTransform: "uppercase", color: "rgba(255,255,255,0.28)" }}>
          AI Agent Activity — Q2 2026
        </div>
        <div style={{ position: "absolute", top: 14, right: 20, fontSize: 20, fontWeight: 800, color: "#EFFFA5", fontFamily: "monospace", letterSpacing: "-0.02em" }}>
          +18.4%
        </div>
        <div style={{ position: "absolute", right: 20, top: 52, display: "flex", flexDirection: "column", gap: 18, fontFamily: "monospace", fontSize: 9, color: "rgba(239,255,165,0.28)" }}>
          <span>248</span><span>220</span><span>192</span>
        </div>
        <div style={{ position: "absolute", bottom: 12, left: 20, right: 20, display: "flex", justifyContent: "space-between", fontFamily: "monospace", fontSize: 9, color: "rgba(255,255,255,0.18)" }}>
          <span>JAN</span><span>FEB</span><span>MAR</span><span>APR</span><span>MAY</span><span>JUN</span>
        </div>
      </div>
    );
  }

  if (id === "work") {
    return (
      <div className={className} style={{ position: "absolute", inset: 0, background: "#F5F2EB", overflow: "hidden", padding: 24 }}>
        <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.09em", textTransform: "uppercase", color: "#9C978F", marginBottom: 10 }}>July 2026</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 3, marginBottom: 3 }}>
          {["M","T","W","T","F"].map((d, i) => (
            <div key={i} style={{ fontSize: 8, fontWeight: 700, color: "#9C978F", textAlign: "center", paddingBottom: 4 }}>{d}</div>
          ))}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 3 }}>
          {[
            { bg: "#4165E8", label: "09:00" }, { bg: "#E8E4D8" }, { bg: "#4165E8", opacity: 0.5 }, { bg: "#E8E4D8" }, { bg: "#4165E8", label: "All day" },
            { bg: "#E8E4D8" }, { bg: "#4165E8", opacity: 0.65 }, { bg: "#4165E8", label: "Copilot" }, { bg: "#4165E8", opacity: 0.45 }, { bg: "#E8E4D8" },
            { bg: "#4165E8" }, { bg: "#4165E8", opacity: 0.8 }, { bg: "#E8E4D8" }, { bg: "#4165E8", opacity: 0.5 }, { bg: "#4165E8", label: "Review" },
            { bg: "#E8E4D8" }, { bg: "#E8E4D8" }, { bg: "#4165E8", opacity: 0.35 }, { bg: "#4165E8" }, { bg: "#E8E4D8" },
          ].map((cell, i) => (
            <div key={i} style={{ height: 36, borderRadius: 4, background: cell.bg, opacity: cell.opacity ?? 1, position: "relative", overflow: "hidden" }}>
              {cell.label && <div style={{ position: "absolute", bottom: 4, left: 5, fontSize: 7, color: "rgba(255,255,255,0.65)", fontWeight: 700 }}>{cell.label}</div>}
            </div>
          ))}
        </div>
        <div style={{ marginTop: 14, fontSize: 11, color: "#9C978F" }}>
          AI handled <strong style={{ color: "#11110F", fontWeight: 700 }}>62% of scheduled events</strong> this month
        </div>
      </div>
    );
  }

  if (id === "law") {
    return (
      <div className={className} style={{ position: "absolute", inset: 0, background: "#100E08", overflow: "hidden", padding: "24px 28px" }}>
        <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.2)", marginBottom: 18, fontFamily: "monospace" }}>
          SECTION IV — REPRESENTATIONS AND WARRANTIES
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {[
            { num: "4.1", w: "100%", hi: false }, { num: "", w: "75%", hi: false }, { num: "", w: "68%", hi: true },
            { num: "", w: "100%", hi: false }, { num: "4.2", w: "60%", hi: false }, { num: "", w: "82%", hi: true },
            { num: "", w: "50%", hi: false }, { num: "4.3", w: "100%", hi: false }, { num: "", w: "55%", hi: true },
          ].map((row, i) => (
            <div key={i} style={{ display: "flex", gap: 12, alignItems: "center", margin: row.hi ? "2px 0" : 0 }}>
              <span style={{ fontFamily: "monospace", fontSize: 9, color: "rgba(255,255,255,0.15)", minWidth: 16 }}>{row.num}</span>
              <div style={{ height: 7, borderRadius: 1, background: row.hi ? "rgba(255,255,255,0.75)" : "rgba(255,255,255,0.08)", width: row.w }} />
            </div>
          ))}
        </div>
        <div style={{ position: "absolute", bottom: 14, left: 28, fontSize: 10, color: "#C4A83C", fontWeight: 700, fontFamily: "monospace" }}>
          AI flagged 23 anomalies in §4
        </div>
        <div style={{ position: "absolute", bottom: 14, right: 28, fontFamily: "monospace", fontSize: 9, color: "rgba(255,255,255,0.15)" }}>
          Pg. 14 of 187
        </div>
      </div>
    );
  }

  if (id === "healthcare") {
    return (
      <div className={className} style={{ position: "absolute", inset: 0, background: "#F6F8FA", overflow: "hidden", padding: "24px 28px" }}>
        <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#9C978F", marginBottom: 16 }}>
          Patient Triage Pathway — Radiology Dept.
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 0, marginBottom: 24 }}>
          {[
            { bg: "#FBEEE8", border: "#CC8A7A", color: "#681808", lines: ["Scan", "in"] },
            { bg: "#EFFFA5", border: "#6A7A00", color: "#3A4400", lines: ["Pre-", "annotate"] },
            { bg: "#EEF1FB", border: "#4165E8", color: "#1E2C80", lines: ["Report", "out"] },
          ].map((node, i) => (
            <>
              <div key={`node-${i}`} style={{ width: 48, height: 48, borderRadius: "50%", background: node.bg, border: `2px solid ${node.border}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 8, fontWeight: 700, color: node.color, textAlign: "center", lineHeight: 1.2, flexShrink: 0 }}>
                {node.lines[0]}<br />{node.lines[1]}
              </div>
              {i < 2 && (
                <div key={`line-${i}`} style={{ flex: 1, height: 1, background: "#CBC5B9", position: "relative" }}>
                  <div style={{ position: "absolute", top: -14, left: "50%", transform: "translateX(-50%)", fontSize: 8, color: "#9C978F", whiteSpace: "nowrap" }}>
                    {i === 0 ? "AI triage" : "radiologist"}
                  </div>
                </div>
              )}
            </>
          ))}
        </div>
        <div style={{ border: "1px solid #E2DDD6", borderRadius: 6, overflow: "hidden" }}>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", background: "#F0EEE8", padding: "6px 10px", fontSize: 8, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "#9C978F", gap: 8 }}>
            <div>Finding</div><div>Priority</div><div>Time saved</div>
          </div>
          {[
            { finding: "Pneumonia (probable)", priority: "Urgent", priColor: "#C04030", saved: "4.2h" },
            { finding: "Nodule (possible)", priority: "Review", priColor: "#C48020", saved: "2.1h" },
            { finding: "Clear", priority: "Routine", priColor: "#9C978F", saved: "0.8h" },
          ].map((row, i) => (
            <div key={i} style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", padding: "8px 10px", fontSize: 10, color: "#11110F", gap: 8, borderTop: "1px solid #E2DDD6" }}>
              <div style={{ color: i === 2 ? "#9C978F" : "#11110F" }}>{row.finding}</div>
              <div style={{ color: row.priColor, fontWeight: 700 }}>{row.priority}</div>
              <div style={{ color: i === 2 ? "#9C978F" : "#3C4800", fontWeight: i === 2 ? 400 : 700 }}>{row.saved}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (id === "education") {
    return (
      <div className={className} style={{ position: "absolute", inset: 0, background: "#FDF8EE", overflow: "hidden", padding: "24px 32px" }}>
        <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#9C978F", marginBottom: 14, fontFamily: "monospace" }}>
          Arizona Trial — Maths Performance, 8 Weeks
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
          {[
            { num: "01", w: "88%", hi: false }, { num: "02", w: "70%", hi: true, label: "+32% ↑" },
            { num: "03", w: "75%", hi: false }, { num: "04", w: "60%", hi: false },
            { num: "05", w: "82%", hi: true }, { num: "06", w: "55%", hi: false }, { num: "07", w: "79%", hi: false },
          ].map((row, i) => (
            <div key={i} style={{ display: "flex", gap: 10, alignItems: "center", background: row.hi ? "#EFFFA5" : "transparent", borderRadius: row.hi ? 3 : 0, padding: row.hi ? "3px 2px" : 0, margin: row.hi ? "0 -2px" : 0 }}>
              <span style={{ fontFamily: "monospace", fontSize: 8, color: row.hi ? "#6A7A00" : "#CBC5B9", minWidth: 14 }}>{row.num}</span>
              <div style={{ height: 8, background: row.hi ? "#8AA000" : "#E2DDD6", borderRadius: 1, width: row.w, opacity: row.hi ? 0.6 : 1 }} />
              {row.label && <span style={{ marginLeft: "auto", fontSize: 9, color: "#3A4800", fontWeight: 800, whiteSpace: "nowrap" }}>{row.label}</span>}
            </div>
          ))}
        </div>
        <div style={{ marginTop: 16, paddingTop: 12, borderTop: "1px solid #E2DDD6", display: "flex", gap: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <div style={{ width: 10, height: 10, borderRadius: 2, background: "#EFFFA5", border: "1px solid #8AA000" }} />
            <span style={{ fontSize: 9, color: "#68655F" }}>AI-tutored group</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <div style={{ width: 10, height: 10, borderRadius: 2, background: "#E2DDD6" }} />
            <span style={{ fontSize: 9, color: "#68655F" }}>Control group</span>
          </div>
        </div>
      </div>
    );
  }

  if (id === "startups") {
    return (
      <div className={className} style={{ position: "absolute", inset: 0, background: "#FBF0D8", overflow: "hidden", padding: "24px 28px" }}>
        <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#9C7000", marginBottom: 14 }}>
          Vertical AI Funding Rounds — 2024–2026
        </div>
        <div style={{ position: "relative", height: "calc(100% - 80px)", display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
          <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, display: "flex", alignItems: "flex-end", gap: 12, height: "100%" }}>
            {[
              { label: "$1.2m", stage: "Seed", h: "25%", opacity: 0.5 },
              { label: "$8.5m", stage: "Series A", h: "42%", opacity: 0.65 },
              { label: "$40m", stage: "Series B", h: "64%", opacity: 0.8 },
              { label: "$300m", stage: "Series C", h: "100%", opacity: 1 },
            ].map((bar, i) => (
              <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 5, flex: 1 }}>
                <div style={{ fontFamily: "monospace", fontSize: 9, color: "#C89040", fontWeight: 700 }}>{bar.label}</div>
                <div style={{ width: "100%", borderRadius: "4px 4px 0 0", background: "#C89040", opacity: bar.opacity, height: bar.h }} />
                <div style={{ fontSize: 8, fontWeight: 700, color: "#9C7000" }}>{bar.stage}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ marginTop: 10, fontSize: 10, color: "#9C7000" }}>
          Harvey, Inc. — 18 months from Seed to unicorn
        </div>
      </div>
    );
  }

  if (id === "media") {
    return (
      <div className={className} style={{ position: "absolute", inset: 0, background: "#0A0A0A", overflow: "hidden", padding: "20px 22px" }}>
        <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.09em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)", marginBottom: 12, fontFamily: "monospace" }}>
          Sora Generation — EFF Film Festival Entry
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 3, marginBottom: 3 }}>
          {[0.04, 0.12, 0.07, 0.18, 0.15, 0.05, "media", 0.09, 0.06, "media2", 0.14, 0.03].map((val, i) => (
            <div key={i} style={{
              aspectRatio: "16/9",
              borderRadius: 2,
              background: val === "media" ? "rgba(184,104,152,0.6)" : val === "media2" ? "rgba(184,104,152,0.4)" : `rgba(255,255,255,${val})`,
            }} />
          ))}
        </div>
        <div style={{ marginTop: 10, background: "rgba(255,255,255,0.05)", borderRadius: 3, height: 4, position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "62%", background: "rgba(184,104,152,0.7)", borderRadius: 3 }} />
        </div>
        <div style={{ marginTop: 8, display: "flex", justifyContent: "space-between", fontFamily: "monospace", fontSize: 8, color: "rgba(255,255,255,0.2)" }}>
          <span>00:00</span>
          <span style={{ color: "rgba(184,104,152,0.8)" }}>01:28 / 02:20</span>
          <span>HD</span>
        </div>
      </div>
    );
  }

  return <div className={className} style={{ position: "absolute", inset: 0, background: "#E0DBD2" }} />;
}

/** Secondary story art: bold colour block with ghost text */
export function SecArtPanel({ industry }: { industry: Industry }) {
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", background: industry.block }}>
      <div style={{
        position: "absolute", bottom: -24, right: -12,
        fontSize: 100, fontWeight: 800, color: "rgba(0,0,0,0.07)",
        fontFamily: "var(--font-jakarta)", letterSpacing: "-0.06em", lineHeight: 1, userSelect: "none",
      }}>
        {industry.name}
      </div>
      <div style={{ position: "absolute", top: 20, left: 20, fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)" }}>
        {industry.name}
      </div>
      <div style={{ position: "absolute", bottom: 20, left: 20, fontSize: 11, color: "rgba(255,255,255,0.4)" }}>
        {industry.readTime}
      </div>
    </div>
  );
}
