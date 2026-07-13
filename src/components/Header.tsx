"use client";

import { useState, useEffect } from "react";

const STORAGE_KEY = "the-inference-prefs";

export default function Header() {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [activeView, setActiveView] = useState<string>("brief");

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const prefs = JSON.parse(raw);
        setIsSubscribed(!!(prefs.completed && prefs.email && prefs.selectedIndustries?.length));
      }
    } catch {}

    // Listen for subscription status changes
    const handlePrefsChange = () => {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) {
          const prefs = JSON.parse(raw);
          setIsSubscribed(!!(prefs.completed && prefs.email && prefs.selectedIndustries?.length));
        } else {
          setIsSubscribed(false);
        }
      } catch {}
    };

    // Listen for SPA view changes from OnboardingGate
    const handleViewChange = (e: Event) => {
      const view = (e as CustomEvent).detail?.view;
      if (view) setActiveView(view);
    };

    window.addEventListener("ti:prefsChange", handlePrefsChange);
    window.addEventListener("ti:viewChange", handleViewChange);
    return () => {
      window.removeEventListener("ti:prefsChange", handlePrefsChange);
      window.removeEventListener("ti:viewChange", handleViewChange);
    };
  }, []);

  const goView = (view: string) => {
    window.dispatchEvent(new CustomEvent("ti:goView", { detail: { view } }));
    setActiveView(view);
  };

  const openEditModal = () => {
    window.dispatchEvent(new CustomEvent("ti:openEditModal"));
  };

  return (
    <nav
      role="navigation"
      aria-label="Main navigation"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: "var(--bg)",
        borderBottom: "1px solid var(--ink)",
      }}
    >
      <div
        style={{
          maxWidth: "var(--w)",
          margin: "0 auto",
          padding: "0 var(--pad)",
          height: 50,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <button
          onClick={() => isSubscribed ? goView("brief") : undefined}
          aria-label="The Inference home"
          style={{
            fontSize: 15,
            fontWeight: 800,
            letterSpacing: "-0.025em",
            color: "var(--ink)",
            cursor: isSubscribed ? "pointer" : "default",
            userSelect: "none",
            border: "none",
            background: "none",
            padding: 0,
            fontFamily: "var(--font-jakarta)",
          }}
        >
          The Inference
        </button>

        {/* Nav links (subscribers only) */}
        {isSubscribed && (
          <div style={{ display: "flex", alignItems: "stretch" }}>
            <button
              onClick={() => goView("brief")}
              aria-current={activeView === "brief" ? "page" : undefined}
              style={{
                background: "none",
                border: "none",
                borderBottom: activeView === "brief" ? "2px solid var(--ink)" : "2px solid transparent",
                position: "relative",
                top: 1,
                cursor: "pointer",
                fontFamily: "var(--font-jakarta)",
                fontSize: 13,
                fontWeight: activeView === "brief" ? 700 : 500,
                color: activeView === "brief" ? "var(--ink)" : "var(--ink-2)",
                padding: "0 14px",
                display: "flex",
                alignItems: "center",
                transition: "color 150ms ease",
              }}
            >
              The Brief
            </button>
            <button
              onClick={() => goView("explore")}
              aria-current={activeView === "explore" ? "page" : undefined}
              style={{
                background: "none",
                border: "none",
                borderBottom: activeView === "explore" ? "2px solid var(--ink)" : "2px solid transparent",
                position: "relative",
                top: 1,
                cursor: "pointer",
                fontFamily: "var(--font-jakarta)",
                fontSize: 13,
                fontWeight: activeView === "explore" ? 700 : 500,
                color: activeView === "explore" ? "var(--ink)" : "var(--ink-2)",
                padding: "0 14px",
                display: "flex",
                alignItems: "center",
                transition: "color 150ms ease",
              }}
            >
              Explore
            </button>
            <div style={{ width: 1, background: "var(--rule)", margin: "14px 4px" }} role="separator" />
            <button
              onClick={openEditModal}
              aria-haspopup="dialog"
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                fontFamily: "var(--font-jakarta)",
                fontSize: 12,
                fontWeight: 500,
                color: "var(--ink-3)",
                padding: "0 14px",
                display: "flex",
                alignItems: "center",
                transition: "color 150ms ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--ink)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--ink-3)")}
            >
              Edit industries
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
