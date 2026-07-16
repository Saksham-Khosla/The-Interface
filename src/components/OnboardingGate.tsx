"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { industries, Industry } from "@/lib/industries";
import BriefPage from "./BriefPage";
import ExplorePage from "./ExplorePage";
import ArticlePage from "./ArticlePage";
import EditIndustriesModal from "./EditIndustriesModal";

const STORAGE_KEY = "the-inference-prefs";
const ISSUE_NUM = 98;

// ── Types ─────────────────────────────────────────────────────────────────────
type OnboardStep = "checking" | "welcome" | "industries" | "email" | "success" | "home";
type AppView = "brief" | "explore" | "article";

interface Comment {
  name: string;
  text: string;
  time: number;
}

interface Prefs {
  email: string;
  selectedIndustries: string[];
  completed: boolean;
  comments?: Record<string, Comment[]>;
}

// ── Typewriter ─────────────────────────────────────────────────────────────────
function TypewriterText({ text, speed = 42, onDone }: { text: string; speed?: number; onDone?: () => void }) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  const doneRef = useRef(onDone);
  doneRef.current = onDone;

  useEffect(() => {
    setDisplayed("");
    setDone(false);
    let i = 0;
    let cancelled = false;
    const iv = setInterval(() => {
      if (cancelled) return;
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(iv);
        if (!cancelled) { setDone(true); doneRef.current?.(); }
      }
    }, speed);
    return () => { cancelled = true; clearInterval(iv); };
  }, [text, speed]);

  return (
    <span>
      {displayed}
      {!done && (
        <span
          aria-hidden="true"
          className="cursor-blink"
          style={{
            display: "inline-block",
            width: 2,
            height: "0.9em",
            background: "currentColor",
            verticalAlign: "text-bottom",
            animation: "blink 0.85s step-end infinite",
            marginLeft: 1,
          }}
        />
      )}
    </span>
  );
}

// ── Onboarding screens ─────────────────────────────────────────────────────────
function WelcomeScreen({ onNext }: { onNext: () => void }) {
  return (
    <div
      style={{
        minHeight: "calc(100vh - 50px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "60px 24px",
        background: "var(--bg)",
      }}
    >
      <div style={{ width: "100%", maxWidth: 540, opacity: 0, animation: "fadeUp 0.38s ease 0.06s forwards" }}>
        <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--ink-3)", marginBottom: 18 }}>
          AI × Industry
        </p>
        <h1 style={{ fontSize: "clamp(30px,5.5vw,46px)", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1.06, color: "var(--ink)", marginBottom: 16 }}>
          One story.<br />Every week.<br />Actually useful.
        </h1>
        <p style={{ fontSize: 17, lineHeight: 1.65, color: "var(--ink-2)", marginBottom: 34 }}>
          The Inference covers what AI is doing to the industries that matter — no roundups, no hype, no filler. One deep take a week, straight to your inbox.
        </p>
        <button
          onClick={onNext}
          style={{
            display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 7,
            height: 46, padding: "0 22px", background: "var(--ink)", color: "#fff",
            border: "none", borderRadius: 8, fontFamily: "var(--font-jakarta)", fontSize: 14,
            fontWeight: 700, letterSpacing: "-0.01em", cursor: "pointer",
            transition: "opacity 200ms ease, transform 200ms ease",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.84"; e.currentTarget.style.transform = "translateY(-1px)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "translateY(0)"; }}
        >
          Get started →
        </button>
      </div>
    </div>
  );
}

function IndustriesScreen({
  selectedIds,
  onToggle,
  onNext,
}: {
  selectedIds: string[];
  onToggle: (id: string) => void;
  onNext: () => void;
}) {
  const n = selectedIds.length;

  return (
    <div
      style={{
        minHeight: "calc(100vh - 50px)",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        padding: "72px 24px 60px",
        background: "var(--bg)",
      }}
    >
      <div style={{ width: "100%", maxWidth: 620, opacity: 0, animation: "fadeUp 0.38s ease 0.06s forwards" }}>
        <div style={{ display: "flex", gap: 5, marginBottom: 28 }} role="progressbar" aria-valuenow={1} aria-valuemax={2}>
          <div style={{ height: 2, flex: 1, background: "var(--accent)", borderRadius: 2 }} />
          <div style={{ height: 2, flex: 1, background: "var(--rule-lt)", borderRadius: 2 }} />
        </div>
        <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--ink-3)", marginBottom: 18 }}>
          Step 1 of 2
        </p>
        <h2 style={{ fontSize: "clamp(24px,4vw,36px)", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1.06, color: "var(--ink)", marginBottom: 12 }}>
          What do you cover?
        </h2>
        <p style={{ fontSize: 17, lineHeight: 1.65, color: "var(--ink-2)", marginBottom: 24 }}>
          Pick the industries you care about. You will get a weekly briefing on each.
        </p>

        <div
          style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 9, marginBottom: 28 }}
          role="group"
          aria-label="Industry selection"
        >
          {industries.map((ind, i) => {
            const sel = selectedIds.includes(ind.slug);
            const num = String(i + 1).padStart(2, "0");
            return (
              <div
                key={ind.slug}
                id={`pcard-${ind.slug}`}
                role="checkbox"
                aria-checked={sel}
                tabIndex={0}
                onClick={() => onToggle(ind.slug)}
                onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onToggle(ind.slug); } }}
                style={{
                  borderRadius: 10, padding: "15px 14px 14px", cursor: "pointer",
                  background: sel ? "var(--accent-soft)" : "var(--surface)",
                  border: `1.5px solid ${sel ? "var(--accent)" : "var(--rule)"}`,
                  transition: "border-color 150ms ease, background 150ms ease",
                  display: "flex", flexDirection: "column", minHeight: 100,
                  opacity: 0,
                  animation: `fadeUp 0.32s ease ${(0.08 + i * 0.045).toFixed(3)}s forwards`,
                  userSelect: "none",
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
                  }} aria-hidden="true">
                    {sel && (
                      <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
                        <path d="M1 3.5L3 5.5L8 1" stroke="var(--on-accent)" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
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

        <button
          id="ind-continue-btn"
          disabled={n === 0}
          onClick={onNext}
          style={{
            display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 7,
            height: 46, padding: "0 22px", background: "var(--ink)", color: "#fff",
            border: "none", borderRadius: 8, fontFamily: "var(--font-jakarta)", fontSize: 14,
            fontWeight: 700, letterSpacing: "-0.01em",
            cursor: n === 0 ? "not-allowed" : "pointer",
            opacity: n === 0 ? 0.3 : 1,
            transition: "opacity 200ms ease",
          }}
        >
          {n === 0 ? "Pick at least one" : `Continue with ${n} ${n === 1 ? "industry" : "industries"} →`}
        </button>
      </div>
    </div>
  );
}

function EmailScreen({
  selectedIds,
  onNext,
}: {
  selectedIds: string[];
  onNext: (email: string) => void;
}) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, industries: selectedIds }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data?.error || "Something went wrong. Please try again.");
        setLoading(false);
        return;
      }
      onNext(email);
    } catch {
      setError("Something went wrong. Please check your connection.");
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "calc(100vh - 50px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "60px 24px", background: "var(--bg)" }}>
      <div style={{ width: "100%", maxWidth: 540, opacity: 0, animation: "fadeUp 0.38s ease 0.06s forwards" }}>
        <div style={{ display: "flex", gap: 5, marginBottom: 28 }} role="progressbar" aria-valuenow={2} aria-valuemax={2}>
          <div style={{ height: 2, flex: 1, background: "var(--accent)", borderRadius: 2 }} />
          <div style={{ height: 2, flex: 1, background: "var(--accent)", borderRadius: 2 }} />
        </div>
        <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--ink-3)", marginBottom: 18 }}>
          Step 2 of 2
        </p>
        <h2 style={{ fontSize: "clamp(24px,4vw,36px)", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1.06, color: "var(--ink)", marginBottom: 12 }}>
          Where should we send it?
        </h2>
        <p style={{ fontSize: 17, lineHeight: 1.65, color: "var(--ink-2)", marginBottom: 34 }}>
          One email a week, per industry. No noise. Unsubscribe any time.
        </p>
        <form onSubmit={handleSubmit}>
          <div style={{ display: "flex", gap: 10, marginBottom: 12 }}>
            <label htmlFor="email-input" style={{ display: "none" }}>Email address</label>
            <input
              id="email-input"
              type="email"
              value={email}
              autoFocus
              onChange={(e) => { setEmail(e.target.value); setError(""); }}
              placeholder="you@example.com"
              disabled={loading}
              aria-label="Email address"
              style={{
                flex: 1, height: 46, border: "1px solid var(--rule)", borderRadius: 8,
                padding: "0 16px", fontFamily: "var(--font-jakarta)", fontSize: 15, color: "var(--ink)",
                background: "var(--surface)", outline: "none", transition: "border-color 0.15s",
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = "var(--accent)")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "var(--rule)")}
            />
            <button
              type="submit"
              disabled={loading}
              style={{
                display: "inline-flex", alignItems: "center", gap: 7,
                height: 46, padding: "0 22px", background: "var(--accent)", color: "#fff",
                border: "none", borderRadius: 8, fontFamily: "var(--font-jakarta)", fontSize: 14,
                fontWeight: 700, cursor: loading ? "not-allowed" : "pointer",
                opacity: loading ? 0.6 : 1,
              }}
            >
              {loading ? "Subscribing…" : "Subscribe"}
            </button>
          </div>
          {error && <p style={{ fontSize: 13, color: "#C04030", marginBottom: 8 }}>{error}</p>}
        </form>
        <p style={{ fontSize: 13, color: "var(--ink-3)" }}>Free forever. Your data stays yours.</p>
      </div>
    </div>
  );
}

function SuccessScreen({ email, selectedIds, onDone }: { email: string; selectedIds: string[]; onDone: () => void }) {
  const [phase, setPhase] = useState(0);
  const firstInd = industries.find((i) => i.slug === selectedIds[0]) || industries[0];

  return (
    <div style={{ minHeight: "calc(100vh - 50px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "60px 24px", background: "var(--bg)" }}>
      <div style={{ width: "100%", maxWidth: 540, opacity: 0, animation: "fadeUp 0.38s ease 0.06s forwards" }}>
        <div
          aria-hidden="true"
          style={{ width: 52, height: 52, borderRadius: "50%", background: "var(--ink)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 24 }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M4 12L9 17L20 6" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--ink-3)", marginBottom: 18 }}>
          You&apos;re in
        </p>
        <h2 style={{ fontSize: "clamp(30px,5.5vw,46px)", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1.06, color: "var(--ink)", marginBottom: 16 }}>
          {phase >= 0 && (
            <TypewriterText
              text={`Welcome to The Inference.`}
              speed={42}
              onDone={() => setPhase(1)}
            />
          )}
        </h2>
        <p style={{ fontSize: 17, lineHeight: 1.65, color: "var(--ink-2)", marginBottom: 34 }}>
          Check <strong>{email}</strong> — your welcome note is on its way. Your first {firstInd.name} briefing arrives next week.
        </p>
        <button
          onClick={onDone}
          style={{
            display: "inline-flex", alignItems: "center", gap: 7,
            height: 46, padding: "0 22px", background: "var(--accent)", color: "#fff",
            border: "none", borderRadius: 8, fontFamily: "var(--font-jakarta)", fontSize: 14,
            fontWeight: 700, cursor: "pointer", marginTop: 8,
          }}
        >
          See your Brief →
        </button>
      </div>
    </div>
  );
}

// ── Page transition wrapper ─────────────────────────────────────────────────────
function PageTransition({ children, view }: { children: React.ReactNode; view: string }) {
  const [visible, setVisible] = useState(false);
  const [pref, setPref] = useState(false);

  useEffect(() => {
    setPref(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    if (pref) { setVisible(true); return; }
    setVisible(false);
    const t = requestAnimationFrame(() => {
      requestAnimationFrame(() => setVisible(true));
    });
    return () => cancelAnimationFrame(t);
  }, [view, pref]);

  return (
    <div
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(10px)",
        transition: pref ? "none" : "opacity 280ms cubic-bezier(0.22,1,0.36,1), transform 280ms cubic-bezier(0.22,1,0.36,1)",
      }}
    >
      {children}
    </div>
  );
}

// ── Main gate ──────────────────────────────────────────────────────────────────
export default function OnboardingGate() {
  const [step, setStep] = useState<OnboardStep>("checking");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [email, setEmail] = useState("");

  const [appView, setAppView] = useState<AppView>("brief");
  const [articleSlug, setArticleSlug] = useState<string | null>(null);
  const [articleFrom, setArticleFrom] = useState<"brief" | "explore">("brief");
  const [scrollToDisc, setScrollToDisc] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [comments, setComments] = useState<Record<string, Comment[]>>({});

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const prefs = JSON.parse(raw) as Prefs;
        if (prefs.completed && prefs.email && prefs.selectedIndustries?.length) {
          setSelectedIds(prefs.selectedIndustries);
          setEmail(prefs.email);
          setComments(prefs.comments || {});
          setStep("home");
          return;
        }
      }
    } catch {}
    setStep("welcome");
  }, []);

  useEffect(() => {
    const handleGoView = (e: Event) => {
      const view = (e as CustomEvent).detail?.view as AppView;
      if (view) {
        setAppView(view);
        setArticleSlug(null);
        setScrollToDisc(false);
        window.scrollTo(0, 0);
      }
    };
    const handleOpenModal = () => setEditModalOpen(true);

    window.addEventListener("ti:goView", handleGoView);
    window.addEventListener("ti:openEditModal", handleOpenModal);
    return () => {
      window.removeEventListener("ti:goView", handleGoView);
      window.removeEventListener("ti:openEditModal", handleOpenModal);
    };
  }, []);

  useEffect(() => {
    window.dispatchEvent(new CustomEvent("ti:viewChange", { detail: { view: articleSlug ? "article" : appView } }));
  }, [appView, articleSlug]);

  const savePrefs = useCallback((ids: string[], mail: string, cmts: Record<string, Comment[]>) => {
    const prefs: Prefs = { email: mail, selectedIndustries: ids, completed: true, comments: cmts };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
    window.dispatchEvent(new CustomEvent("ti:prefsChange"));
  }, []);

  const handleIndustriesDone = () => { if (selectedIds.length > 0) setStep("email"); };
  const handleEmailDone = (mail: string) => { setEmail(mail); savePrefs(selectedIds, mail, {}); setStep("success"); };
  const handleSuccessDone = () => { setAppView("brief"); setStep("home"); };

  const handleEditSave = (newIds: string[]) => {
    setSelectedIds(newIds);
    savePrefs(newIds, email, comments);
    setEditModalOpen(false);
    if (articleSlug && !newIds.includes(articleSlug)) {
      setArticleSlug(null); setAppView("brief"); window.scrollTo(0, 0);
    }
  };

  const handleOpenArticle = (slug: string, from: "brief" | "explore") => {
    setArticleSlug(slug); setArticleFrom(from); setScrollToDisc(false); window.scrollTo(0, 0);
  };

  const handleBack = () => { setArticleSlug(null); setScrollToDisc(false); window.scrollTo(0, 0); };

  const handleCommentsChange = (slug: string, newComments: Comment[]) => {
    const updated = { ...comments, [slug]: newComments };
    setComments(updated);
    savePrefs(selectedIds, email, updated);
  };

  if (step === "checking") return null;

  const selectedIndustries = industries.filter((i) => selectedIds.includes(i.slug));
  const articleIndustry = articleSlug ? industries.find((i) => i.slug === articleSlug) : null;

  if (step === "home") {
    const viewKey = articleSlug || appView;
    return (
      <>
        <PageTransition view={viewKey}>
          {articleSlug && articleIndustry ? (
            <ArticlePage
              industry={articleIndustry}
              from={articleFrom}
              initialComments={comments[articleSlug] || []}
              scrollToDisc={scrollToDisc}
              onBack={handleBack}
              onCommentsChange={handleCommentsChange}
            />
          ) : appView === "explore" ? (
            <ExplorePage onOpenArticle={handleOpenArticle} />
          ) : (
            <BriefPage selectedIndustries={selectedIndustries} email={email} onOpenArticle={handleOpenArticle} />
          )}
        </PageTransition>
        {editModalOpen && (
          <EditIndustriesModal selectedIds={selectedIds} onSave={handleEditSave} onClose={() => setEditModalOpen(false)} />
        )}
      </>
    );
  }

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 110, background: "var(--bg)", overflowY: "auto", display: "flex", alignItems: "flex-start", justifyContent: "stretch" }}>
      <div style={{ width: "100%" }}>
        {step === "welcome" && <WelcomeScreen onNext={() => setStep("industries")} />}
        {step === "industries" && (
          <IndustriesScreen
            selectedIds={selectedIds}
            onToggle={(id) => setSelectedIds((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id])}
            onNext={handleIndustriesDone}
          />
        )}
        {step === "email" && <EmailScreen selectedIds={selectedIds} onNext={handleEmailDone} />}
        {step === "success" && <SuccessScreen email={email} selectedIds={selectedIds} onDone={handleSuccessDone} />}
      </div>
    </div>
  );
}
