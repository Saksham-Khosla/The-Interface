"use client";

import { useState, useEffect } from "react";

const STORAGE_KEY = "the-inference-prefs";

export default function Header() {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [activeView, setActiveView] = useState<string>("brief");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const prefs = JSON.parse(raw);
        setIsSubscribed(!!(prefs.completed && prefs.email && prefs.selectedIndustries?.length));
      }
    } catch {}

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

  /* Lock body scroll when mobile menu is open */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const goView = (view: string) => {
    window.dispatchEvent(new CustomEvent("ti:goView", { detail: { view } }));
    setActiveView(view);
    setMenuOpen(false);
  };

  const openEditModal = () => {
    window.dispatchEvent(new CustomEvent("ti:openEditModal"));
    setMenuOpen(false);
  };

  const navBtnStyle = (view: string) => ({
    background: "none",
    border: "none",
    borderBottom: activeView === view ? "2px solid var(--accent)" : "2px solid transparent",
    position: "relative" as const,
    top: 1,
    cursor: "pointer",
    fontFamily: "var(--font-jakarta)",
    fontSize: 13,
    fontWeight: activeView === view ? 700 : 500,
    color: activeView === view ? "var(--accent)" : "var(--ink-2)",
    padding: "0 14px",
    display: "flex",
    alignItems: "center",
    transition: "color 150ms ease",
    whiteSpace: "nowrap" as const,
  });

  return (
    <>
      <nav
        role="navigation"
        aria-label="Main navigation"
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
          background: "var(--bg)", borderBottom: "1px solid var(--ink)",
        }}
      >
        <div
          style={{
            maxWidth: "var(--w)", margin: "0 auto", padding: "0 var(--pad)",
            height: 50, display: "flex", alignItems: "center", justifyContent: "space-between",
          }}
        >
          {/* Logo */}
          <button
            onClick={() => isSubscribed ? goView("brief") : undefined}
            aria-label="The Inference home"
            style={{
              fontSize: 15, fontWeight: 800, letterSpacing: "-0.025em",
              color: "var(--ink)", cursor: isSubscribed ? "pointer" : "default",
              userSelect: "none", border: "none", background: "none", padding: 0,
              fontFamily: "var(--font-jakarta)", flexShrink: 0, whiteSpace: "nowrap",
            }}
          >
            The Inference
          </button>

          {isSubscribed && (
            <>
              {/* Desktop nav — hidden on mobile via CSS */}
              <div className="ti-desktop-nav">
                <button
                  onClick={() => goView("brief")}
                  aria-current={activeView === "brief" ? "page" : undefined}
                  style={navBtnStyle("brief")}
                >
                  The Brief
                </button>
                <button
                  onClick={() => goView("explore")}
                  aria-current={activeView === "explore" ? "page" : undefined}
                  style={navBtnStyle("explore")}
                >
                  Explore
                </button>
                <div style={{ width: 1, background: "var(--rule)", margin: "14px 4px" }} role="separator" />
                <button
                  onClick={openEditModal}
                  aria-haspopup="dialog"
                  style={{
                    background: "none", border: "none", cursor: "pointer",
                    fontFamily: "var(--font-jakarta)", fontSize: 12, fontWeight: 500,
                    color: "var(--ink-3)", padding: "0 14px",
                    display: "flex", alignItems: "center",
                    transition: "color 150ms ease", whiteSpace: "nowrap",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--ink)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--ink-3)")}
                >
                  Edit industries
                </button>
              </div>

              {/* Mobile menu button — hidden on desktop via CSS */}
              <button
                className="ti-mobile-menu-btn"
                onClick={() => setMenuOpen((o) => !o)}
                aria-expanded={menuOpen}
                aria-controls="ti-mobile-nav"
                aria-label={menuOpen ? "Close menu" : "Open menu"}
              >
                {menuOpen ? "Close" : "Menu"}
              </button>
            </>
          )}
        </div>
      </nav>

      {/* Mobile nav overlay — rendered only when open, CSS hides on desktop */}
      {isSubscribed && menuOpen && (
        <div
          id="ti-mobile-nav"
          className="ti-mobile-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation"
        >
          <button
            className={`ti-mobile-overlay-item${activeView === "brief" ? " active" : ""}`}
            onClick={() => goView("brief")}
            aria-current={activeView === "brief" ? "page" : undefined}
          >
            The Brief
            <span className="ti-mobile-overlay-item-arrow">→</span>
          </button>
          <button
            className={`ti-mobile-overlay-item${activeView === "explore" ? " active" : ""}`}
            onClick={() => goView("explore")}
            aria-current={activeView === "explore" ? "page" : undefined}
          >
            Explore
            <span className="ti-mobile-overlay-item-arrow">→</span>
          </button>
          <button
            className="ti-mobile-overlay-item"
            onClick={openEditModal}
            aria-haspopup="dialog"
          >
            Edit industries
            <span className="ti-mobile-overlay-item-arrow">→</span>
          </button>
        </div>
      )}
    </>
  );
}
