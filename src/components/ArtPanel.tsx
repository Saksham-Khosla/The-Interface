import { Industry } from "@/lib/industries";

interface ArtPanelProps {
  id: string;
  className?: string;
}

/** Full editorial art panels (lead story) — all accent colours via CSS variables */
export function ArtPanel({ id, className = "" }: ArtPanelProps) {
  if (id === "finance") {
    return (
      <div className={className} style={{ position: "absolute", inset: 0, background: "#0C0F1A", overflow: "hidden" }}>
        {/* Right accent panel — accent-strong block */}
        <div style={{
          position: "absolute", right: 0, top: 0, bottom: 0, width: "34%",
          background: "var(--accent)",
        }} />

        {/* Chart SVG — left 66% */}
        <svg
          style={{ position: "absolute", left: 0, top: 0, width: "66%", height: "calc(100% - 36px)" }}
          viewBox="0 0 380 200"
          preserveAspectRatio="none"
        >
          <line x1="0" y1="55" x2="380" y2="55" stroke="var(--accent-muted)" strokeWidth="0.6" strokeOpacity="0.22" />
          <line x1="0" y1="110" x2="380" y2="110" stroke="var(--accent-muted)" strokeWidth="0.6" strokeOpacity="0.22" />
          <line x1="0" y1="162" x2="380" y2="162" stroke="var(--accent-muted)" strokeWidth="0.6" strokeOpacity="0.22" />
          <polyline
            points="0,178 70,152 130,160 200,105 280,82 380,38 380,200 0,200"
            fill="var(--accent)"
            fillOpacity="0.14"
            stroke="none"
          />
          <polyline
            points="0,178 70,152 130,160 200,105 280,82 380,38"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="2.5"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
          <circle cx="380" cy="38" r="5" fill="var(--accent)" />
          <circle cx="380" cy="38" r="14" fill="var(--accent)" fillOpacity="0.18" />
        </svg>

        <div style={{ position: "absolute", top: 18, left: 20, fontSize: 9, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.22)" }}>
          AI Agent Activity — Q2 2026
        </div>
        <div style={{ position: "absolute", bottom: 10, left: 20, width: "60%", display: "flex", justifyContent: "space-between", fontFamily: "monospace", fontSize: 8, color: "rgba(255,255,255,0.16)" }}>
          <span>JAN</span><span>FEB</span><span>MAR</span><span>APR</span><span>MAY</span><span>JUN</span>
        </div>

        {/* Accent panel — metric */}
        <div style={{
          position: "absolute", right: 0, top: 0, bottom: 0, width: "34%",
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          padding: "0 20px", textAlign: "center",
        }}>
          <div style={{ fontSize: 36, fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1, color: "var(--on-accent)", fontFamily: "var(--font-jakarta)", marginBottom: 8 }}>
            +18.4%
          </div>
          <div style={{ fontSize: 8, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--on-accent)", opacity: 0.48 }}>
            YTD Return
          </div>
          <div style={{ width: 24, height: 1, background: "var(--on-accent)", opacity: 0.2, margin: "16px auto" }} />
          <div style={{ fontSize: 14, fontWeight: 800, letterSpacing: "-0.02em", color: "var(--on-accent)", marginBottom: 4 }}>
            $4.2T
          </div>
          <div style={{ fontSize: 8, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--on-accent)", opacity: 0.38 }}>
            AUM Tracked
          </div>
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
            { accent: true, label: "09:00" }, { accent: false }, { accent: true, op: 0.5 }, { accent: false }, { accent: true, label: "All day" },
            { accent: false }, { accent: true, op: 0.65 }, { accent: true, label: "Copilot" }, { accent: true, op: 0.45 }, { accent: false },
            { accent: true }, { accent: true, op: 0.8 }, { accent: false }, { accent: true, op: 0.5 }, { accent: true, label: "Review" },
            { accent: false }, { accent: false }, { accent: true, op: 0.35 }, { accent: true }, { accent: false },
          ].map((cell, i) => (
            <div key={i} style={{ height: 36, borderRadius: 4, background: cell.accent ? "var(--accent)" : "#E8E4D8", opacity: cell.op ?? 1, position: "relative", overflow: "hidden" }}>
              {cell.label && <div style={{ position: "absolute", bottom: 4, left: 5, fontSize: 7, color: "rgba(255,255,255,0.7)", fontWeight: 700 }}>{cell.label}</div>}
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
              <div style={{ height: 7, borderRadius: 1, background: row.hi ? "var(--accent-soft)" : "rgba(255,255,255,0.08)", width: row.w }} />
            </div>
          ))}
        </div>
        <div style={{ position: "absolute", bottom: 14, left: 28, fontSize: 10, color: "var(--accent-muted)", fontWeight: 700, fontFamily: "monospace" }}>
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
            { bg: "#F5F2EB", border: "#CCC8BE", color: "#6C6962", lines: ["Pre-", "annotate"] },
            { bg: "var(--accent-soft)", border: "var(--accent)", color: "var(--accent-strong)", lines: ["Report", "out"] },
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
              <div style={{ color: i === 2 ? "#9C978F" : "var(--accent-strong)", fontWeight: i === 2 ? 400 : 700 }}>{row.saved}</div>
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
            <div key={i} style={{ display: "flex", gap: 10, alignItems: "center", background: row.hi ? "var(--accent-soft)" : "transparent", borderRadius: row.hi ? 3 : 0, padding: row.hi ? "3px 2px" : 0, margin: row.hi ? "0 -2px" : 0 }}>
              <span style={{ fontFamily: "monospace", fontSize: 8, color: row.hi ? "var(--accent)" : "#CBC5B9", minWidth: 14 }}>{row.num}</span>
              <div style={{ height: 8, background: row.hi ? "var(--accent)" : "#E2DDD6", borderRadius: 1, width: row.w, opacity: row.hi ? 0.65 : 1 }} />
              {row.label && <span style={{ marginLeft: "auto", fontSize: 9, color: "var(--accent-strong)", fontWeight: 800, whiteSpace: "nowrap" }}>{row.label}</span>}
            </div>
          ))}
        </div>
        <div style={{ marginTop: 16, paddingTop: 12, borderTop: "1px solid #E2DDD6", display: "flex", gap: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <div style={{ width: 10, height: 10, borderRadius: 2, background: "var(--accent-soft)", border: "1px solid var(--accent)" }} />
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
      <div className={className} style={{ position: "absolute", inset: 0, background: "var(--accent-faint)", overflow: "hidden", padding: "24px 28px" }}>
        <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--accent-muted)", marginBottom: 14 }}>
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
                <div style={{ fontFamily: "monospace", fontSize: 9, color: "var(--accent)", fontWeight: 700 }}>{bar.label}</div>
                <div style={{ width: "100%", borderRadius: "4px 4px 0 0", background: "var(--accent)", opacity: bar.opacity, height: bar.h }} />
                <div style={{ fontSize: 8, fontWeight: 700, color: "var(--accent-strong)" }}>{bar.stage}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ marginTop: 10, fontSize: 10, color: "var(--accent-strong)" }}>
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
          {[0.04, 0.12, 0.07, 0.18, 0.15, 0.05, "hi", 0.09, 0.06, "mid", 0.14, 0.03].map((val, i) => (
            <div key={i} style={{
              aspectRatio: "16/9",
              borderRadius: 2,
              background: (val === "hi" || val === "mid") ? "var(--accent)" : `rgba(255,255,255,${val})`,
              opacity: val === "hi" ? 0.62 : val === "mid" ? 0.4 : 1,
            }} />
          ))}
        </div>
        <div style={{ marginTop: 10, background: "rgba(255,255,255,0.06)", borderRadius: 3, height: 4, position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "62%", background: "var(--accent)", opacity: 0.72, borderRadius: 3 }} />
        </div>
        <div style={{ marginTop: 8, display: "flex", justifyContent: "space-between", fontFamily: "monospace", fontSize: 8, color: "rgba(255,255,255,0.2)" }}>
          <span>00:00</span>
          <span style={{ color: "var(--accent-muted)", opacity: 0.85 }}>01:28 / 02:20</span>
          <span>HD</span>
        </div>
      </div>
    );
  }

  return <div className={className} style={{ position: "absolute", inset: 0, background: "#E0DBD2" }} />;
}

/** Secondary story art: accent-strong block with on-accent typography */
export function SecArtPanel({ industry }: { industry: Industry }) {
  /* ── Education — bespoke learning-pathway visual ── */
  if (industry.slug === "education") {
    return (
      <div style={{
        position: "absolute", inset: 0, overflow: "hidden",
        background: "var(--accent-faint)",
        padding: "18px 20px 16px",
        display: "flex", flexDirection: "column",
      }}>
        {/* Top label */}
        <div style={{
          fontSize: 8, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase",
          color: "var(--accent-muted)", marginBottom: 14, fontFamily: "monospace", flexShrink: 0,
        }}>
          Personalised Learning Path
        </div>

        {/* Pathway area — grows to fill remaining height */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
          {/* Three blocks + connectors */}
          <div style={{ display: "flex", alignItems: "center", gap: 0, marginBottom: 8 }}>
            {/* Block 1 — current level */}
            <div style={{
              flex: 1, background: "var(--surface)", border: "1.5px solid var(--rule)",
              borderRadius: 7, padding: "10px 11px 9px",
            }}>
              <div style={{ fontSize: 7, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#9C978F", marginBottom: 4 }}>
                Module 1
              </div>
              <div style={{ fontSize: 11, fontWeight: 800, color: "var(--ink)", lineHeight: 1.3, letterSpacing: "-0.01em" }}>
                Algebra<br />Basics
              </div>
            </div>

            {/* Connector */}
            <div style={{ width: 22, height: 1.5, background: "var(--accent-soft)", flexShrink: 0 }} />

            {/* Block 2 — AI recommendation */}
            <div style={{ flex: 1.15, background: "var(--accent)", borderRadius: 7, padding: "10px 11px 9px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                <div style={{ fontSize: 7, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(255,255,255,0.55)" }}>
                  Module 2
                </div>
                <div style={{
                  fontSize: 6.5, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase",
                  color: "var(--on-accent)", background: "var(--accent-strong)", borderRadius: 2, padding: "1px 4px",
                }}>
                  AI
                </div>
              </div>
              <div style={{ fontSize: 11, fontWeight: 800, color: "var(--on-accent)", lineHeight: 1.3, letterSpacing: "-0.01em" }}>
                Linear<br />Equations
              </div>
            </div>

            {/* Connector (dimmed — path not yet open) */}
            <div style={{ width: 22, height: 1.5, background: "var(--accent-soft)", opacity: 0.35, flexShrink: 0 }} />

            {/* Block 3 — next lesson (locked) */}
            <div style={{
              flex: 1, background: "var(--surface)", border: "1.5px solid var(--rule)",
              borderRadius: 7, padding: "10px 11px 9px", opacity: 0.42,
            }}>
              <div style={{ fontSize: 7, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#9C978F", marginBottom: 4 }}>
                Module 3
              </div>
              <div style={{ fontSize: 11, fontWeight: 800, color: "var(--ink)", lineHeight: 1.3, letterSpacing: "-0.01em" }}>
                Quadratic<br />Functions
              </div>
            </div>
          </div>

          {/* Annotation row — mirrors block widths */}
          <div style={{ display: "flex", alignItems: "flex-start", gap: 0 }}>
            <div style={{ flex: 1, fontSize: 8, color: "#9C978F", textAlign: "center" }}>Current level</div>
            <div style={{ width: 22, flexShrink: 0 }} />
            <div style={{ flex: 1.15, fontSize: 8, color: "var(--accent)", fontWeight: 700, textAlign: "center" }}>AI recommendation</div>
            <div style={{ width: 22, flexShrink: 0 }} />
            <div style={{ flex: 1, fontSize: 8, color: "#9C978F", textAlign: "center", opacity: 0.42 }}>Next lesson</div>
          </div>
        </div>

        {/* Metric strip */}
        <div style={{
          marginTop: 12, paddingTop: 10, borderTop: "1px solid var(--accent-soft)",
          fontSize: 10, fontWeight: 700, color: "var(--accent-strong)",
          letterSpacing: "-0.01em", flexShrink: 0,
        }}>
          +24% retention · AI-tutored cohort
        </div>
      </div>
    );
  }

  /* ── Generic secondary panel (all other industries) ── */
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", background: "var(--accent-strong)" }}>
      <div style={{
        position: "absolute", bottom: -20, right: -10,
        fontSize: 96, fontWeight: 800,
        color: "var(--on-accent)", opacity: 0.07,
        fontFamily: "var(--font-jakarta)", letterSpacing: "-0.06em", lineHeight: 1, userSelect: "none",
      }}>
        {industry.name.toUpperCase()}
      </div>
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "repeating-linear-gradient(0deg, rgba(255,255,255,0.04) 0px, rgba(255,255,255,0.04) 1px, transparent 1px, transparent 32px)",
      }} />
      <div style={{
        position: "absolute", top: 20, left: 20,
        fontSize: 10, fontWeight: 700, letterSpacing: "0.1em",
        textTransform: "uppercase", color: "var(--on-accent)", opacity: 0.5,
      }}>
        {industry.name}
      </div>
      <div style={{
        position: "absolute", bottom: 20, left: 20,
        fontSize: 11, color: "var(--on-accent)", opacity: 0.38,
      }}>
        {industry.readTime}
      </div>
    </div>
  );
}
