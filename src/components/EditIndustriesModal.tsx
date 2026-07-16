"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { industries } from "@/lib/industries";

interface EditIndustriesModalProps {
  selectedIds: string[];
  onSave: (newIds: string[]) => void;
  onClose: () => void;
}

export default function EditIndustriesModal({
  selectedIds,
  onSave,
  onClose,
}: EditIndustriesModalProps) {
  const [draft, setDraft] = useState<string[]>([...selectedIds]);
  const [closing, setClosing] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const pref = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (pref || !overlayRef.current || !panelRef.current) return;

    overlayRef.current.style.opacity = "0";
    panelRef.current.style.transform = "translateY(20px)";

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (!overlayRef.current || !panelRef.current) return;
        overlayRef.current.style.transition = "opacity 260ms ease";
        overlayRef.current.style.opacity = "1";
        panelRef.current.style.transition = "transform 260ms cubic-bezier(0.22,1,0.36,1)";
        panelRef.current.style.transform = "translateY(0)";
      });
    });

    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  useEffect(() => {
    const t = setTimeout(() => closeRef.current?.focus(), 50);
    return () => clearTimeout(t);
  }, []);

  const close = useCallback(() => {
    const pref = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (pref || !overlayRef.current) { onClose(); return; }
    setClosing(true);
    overlayRef.current.style.transition = "opacity 200ms ease";
    overlayRef.current.style.opacity = "0";
    setTimeout(onClose, 210);
  }, [onClose]);

  const save = () => {
    const pref = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (pref || !overlayRef.current) { onSave(draft); return; }
    setClosing(true);
    overlayRef.current.style.transition = "opacity 200ms ease";
    overlayRef.current.style.opacity = "0";
    setTimeout(() => onSave(draft), 210);
  };

  const toggle = (id: string) => {
    setDraft((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") { close(); return; }
    if (e.key !== "Tab" || !overlayRef.current) return;
    const focusable = Array.from(
      overlayRef.current.querySelectorAll<HTMLElement>(
        "button:not([disabled]), input, [tabindex]:not([tabindex='-1'])"
      )
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (!first) return;
    if (e.shiftKey) {
      if (document.activeElement === first) { e.preventDefault(); last.focus(); }
    } else {
      if (document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  };

  return (
    <div
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      aria-label="Edit industries"
      onKeyDown={handleKeyDown}
      onClick={(e) => { if (e.target === overlayRef.current) close(); }}
      style={{
        position: "fixed", inset: 0, zIndex: 200,
        background: "rgba(21,21,19,0.58)",
        display: "flex", alignItems: "flex-start", justifyContent: "center",
        padding: "48px 20px 80px", overflowY: "auto",
      }}
    >
      <div
        ref={panelRef}
        style={{
          background: "var(--surface)", border: "1px solid var(--rule)",
          borderRadius: 16, padding: "36px 36px 32px",
          width: "100%", maxWidth: 660, position: "relative",
        }}
      >
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 6 }}>
          <h2 style={{ fontSize: 21, fontWeight: 800, letterSpacing: "-0.03em", color: "var(--ink)" }}>
            Edit your industries
          </h2>
          <button
            ref={closeRef}
            onClick={close}
            aria-label="Close"
            style={{
              width: 30, height: 30, display: "flex", alignItems: "center", justifyContent: "center",
              background: "none", border: "1px solid var(--rule)", borderRadius: "50%",
              cursor: "pointer", color: "var(--ink-2)", fontSize: 15, lineHeight: 1, flexShrink: 0,
              fontFamily: "var(--font-jakarta)", transition: "border-color 150ms ease, color 150ms ease",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--ink)"; e.currentTarget.style.color = "var(--ink)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--rule)"; e.currentTarget.style.color = "var(--ink-2)"; }}
          >
            ×
          </button>
        </div>
        <p style={{ fontSize: 14, color: "var(--ink-2)", marginBottom: 22 }}>
          Your Brief updates immediately. Pick as many as you like.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 9, marginBottom: 4 }}>
          {industries.map((ind, i) => {
            const sel = draft.includes(ind.slug);
            const num = String(i + 1).padStart(2, "0");
            const checkSvg = sel ? (
              <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
                <path d="M1 3.5L3 5.5L8 1" stroke="var(--on-accent)" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ) : null;
            return (
              <div
                key={ind.slug}
                id={`ecard-${ind.slug}`}
                role="checkbox"
                aria-checked={sel}
                tabIndex={0}
                onClick={() => toggle(ind.slug)}
                onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggle(ind.slug); } }}
                style={{
                  borderRadius: 10, padding: "15px 14px 14px", cursor: "pointer",
                  background: sel ? "var(--accent-soft)" : "var(--surface)",
                  border: `1.5px solid ${sel ? "var(--accent)" : "var(--rule)"}`,
                  transition: "border-color 150ms ease, background 150ms ease",
                  display: "flex", flexDirection: "column", minHeight: 100, userSelect: "none",
                }}
              >
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 9 }}>
                  <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.07em", color: sel ? "var(--accent)" : "var(--ink-3)", lineHeight: 1 }}>
                    {num}
                  </span>
                  <div style={{
                    width: 15, height: 15, borderRadius: "50%", flexShrink: 0,
                    border: `1.5px solid ${sel ? "var(--accent)" : "var(--rule)"}`,
                    background: sel ? "var(--accent)" : "none",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    {checkSvg}
                  </div>
                </div>
                <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: "-0.01em", color: sel ? "var(--accent-strong)" : "var(--ink)", marginBottom: 5 }}>
                  {ind.name}
                </div>
                <div style={{ fontSize: 11, lineHeight: 1.45, color: sel ? "var(--accent-muted)" : "var(--ink-3)", marginTop: "auto", paddingTop: 5 }}>
                  {ind.shortDesc}
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 10, marginTop: 20, paddingTop: 20, borderTop: "1px solid var(--rule-lt)" }}>
          <button
            onClick={close}
            style={{
              height: 38, padding: "0 16px", background: "none", color: "var(--ink-2)",
              border: "1px solid var(--rule)", borderRadius: 7,
              fontFamily: "var(--font-jakarta)", fontSize: 13, fontWeight: 600,
              cursor: "pointer", transition: "background 150ms ease, border-color 150ms ease, color 150ms ease",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "var(--surface)"; e.currentTarget.style.borderColor = "var(--ink)"; e.currentTarget.style.color = "var(--ink)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "none"; e.currentTarget.style.borderColor = "var(--rule)"; e.currentTarget.style.color = "var(--ink-2)"; }}
          >
            Cancel
          </button>
          <button
            onClick={save}
            disabled={draft.length === 0 || closing}
            style={{
              height: 38, padding: "0 16px", background: "var(--accent)", color: "#fff",
              border: "none", borderRadius: 7,
              fontFamily: "var(--font-jakarta)", fontSize: 13, fontWeight: 700,
              cursor: draft.length === 0 ? "not-allowed" : "pointer",
              opacity: draft.length === 0 ? 0.3 : 1, transition: "opacity 150ms ease",
            }}
          >
            Save changes
          </button>
        </div>
      </div>
    </div>
  );
}
