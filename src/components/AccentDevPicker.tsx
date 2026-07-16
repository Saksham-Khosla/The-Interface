"use client";

import { useEffect, useState } from "react";

type Accent = "cobalt" | "aubergine" | "forest";

const OPTIONS: { id: Accent; label: string; color: string }[] = [
  { id: "cobalt",    label: "A — Cobalt",    color: "#3157D5" },
  { id: "aubergine", label: "B — Aubergine", color: "#5B3F70" },
  { id: "forest",    label: "C — Forest",    color: "#2E5943" },
];

function applyAccent(accent: Accent) {
  if (accent === "cobalt") {
    delete document.documentElement.dataset.accent;
  } else {
    document.documentElement.dataset.accent = accent;
  }
}

function readAccentFromUrl(): Accent {
  if (typeof window === "undefined") return "cobalt";
  const val = new URLSearchParams(window.location.search).get("accent");
  if (val === "aubergine" || val === "forest") return val;
  return "cobalt";
}

export default function AccentDevPicker() {
  // Only render in development builds
  if (process.env.NODE_ENV !== "development") return null;
  return <AccentPickerWidget />;
}

function AccentPickerWidget() {
  const [active, setActive] = useState<Accent>("cobalt");
  const [open, setOpen] = useState(false);

  // On mount: read URL param and apply
  useEffect(() => {
    const initial = readAccentFromUrl();
    setActive(initial);
    applyAccent(initial);
  }, []);

  const choose = (accent: Accent) => {
    setActive(accent);
    applyAccent(accent);
    // Update URL without reload so the link is shareable
    const url = new URL(window.location.href);
    if (accent === "cobalt") {
      url.searchParams.delete("accent");
    } else {
      url.searchParams.set("accent", accent);
    }
    window.history.replaceState({}, "", url.toString());
    setOpen(false);
  };

  const current = OPTIONS.find((o) => o.id === active) ?? OPTIONS[0];

  return (
    <div
      style={{
        position: "fixed",
        bottom: 20,
        right: 20,
        zIndex: 9999,
        fontFamily: "var(--font-jakarta), system-ui, sans-serif",
      }}
    >
      {/* Flyout */}
      {open && (
        <div
          style={{
            position: "absolute",
            bottom: "calc(100% + 10px)",
            right: 0,
            background: "var(--ink)",
            borderRadius: 10,
            padding: "6px",
            minWidth: 180,
            boxShadow: "0 8px 24px rgba(0,0,0,0.28)",
          }}
        >
          <p
            style={{
              fontSize: 9,
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.35)",
              padding: "6px 10px 8px",
            }}
          >
            Accent preview (dev only)
          </p>
          {OPTIONS.map((opt) => (
            <button
              key={opt.id}
              onClick={() => choose(opt.id)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                width: "100%",
                padding: "9px 10px",
                background: active === opt.id ? "rgba(255,255,255,0.1)" : "none",
                border: "none",
                borderRadius: 6,
                cursor: "pointer",
                fontFamily: "var(--font-jakarta), system-ui, sans-serif",
                fontSize: 13,
                fontWeight: active === opt.id ? 700 : 400,
                color: active === opt.id ? "#fff" : "rgba(255,255,255,0.65)",
                textAlign: "left",
              }}
            >
              <span
                style={{
                  width: 14,
                  height: 14,
                  borderRadius: "50%",
                  background: opt.color,
                  flexShrink: 0,
                  boxShadow: active === opt.id ? `0 0 0 2px rgba(255,255,255,0.4)` : "none",
                }}
              />
              {opt.label}
            </button>
          ))}
          <div
            style={{
              marginTop: 6,
              borderTop: "1px solid rgba(255,255,255,0.1)",
              padding: "7px 10px 4px",
            }}
          >
            <p style={{ fontSize: 10, color: "rgba(255,255,255,0.28)", lineHeight: 1.45 }}>
              URL: ?accent={active === "cobalt" ? "(none)" : active}
            </p>
          </div>
        </div>
      )}

      {/* Trigger pill */}
      <button
        onClick={() => setOpen((v) => !v)}
        title="Switch accent colour (dev only)"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "7px 12px 7px 10px",
          background: "var(--ink)",
          border: "none",
          borderRadius: 999,
          cursor: "pointer",
          fontFamily: "var(--font-jakarta), system-ui, sans-serif",
          fontSize: 12,
          fontWeight: 600,
          color: "rgba(255,255,255,0.75)",
          boxShadow: "0 2px 12px rgba(0,0,0,0.22)",
          transition: "opacity 150ms",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.86")}
        onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
      >
        <span
          style={{
            width: 12,
            height: 12,
            borderRadius: "50%",
            background: current.color,
            flexShrink: 0,
          }}
        />
        {current.label}
        <span style={{ fontSize: 9, opacity: 0.45 }}>▲</span>
      </button>
    </div>
  );
}
