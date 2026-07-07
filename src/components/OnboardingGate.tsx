"use client";

import { useState, useEffect, useRef } from "react";
import Logo from "./Logo";
import { industries } from "@/lib/industries";

const STORAGE_KEY = "the-inference-prefs";

interface Prefs {
  email: string;
  selectedIndustries: string[];
  completed: boolean;
}

type Step = "checking" | "welcome" | "industries" | "email" | "success" | "home";

// ── Typewriter line ──────────────────────────────────────────────────────────
function TypewriterLine({
  text,
  speed = 42,
  onDone,
  className = "",
}: {
  text: string;
  speed?: number;
  onDone?: () => void;
  className?: string;
}) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;

  useEffect(() => {
    let i = 0;
    let cancelled = false;
    const iv = setInterval(() => {
      if (cancelled) return;
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(iv);
        if (!cancelled) {
          setDone(true);
          onDoneRef.current?.();
        }
      }
    }, speed);
    return () => {
      cancelled = true;
      clearInterval(iv);
    };
  }, [text, speed]);

  return (
    <span className={className}>
      {displayed}
      {!done && (
        <span
          className="inline-block align-middle ml-[2px] animate-pulse"
          style={{ width: 2, height: "0.85em", background: "currentColor", borderRadius: 1 }}
        />
      )}
    </span>
  );
}

// ── Fade-in wrapper ──────────────────────────────────────────────────────────
function FadeIn({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  return (
    <div
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(10px)",
        transition: "opacity 0.55s ease, transform 0.55s ease",
      }}
    >
      {children}
    </div>
  );
}

// ── Step slide-in wrapper ────────────────────────────────────────────────────
function StepWrap({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 30);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      className="w-full max-w-2xl mx-auto px-6 py-12 flex flex-col items-center justify-center min-h-screen"
      style={{
        opacity: mounted ? 1 : 0,
        transform: mounted ? "translateY(0)" : "translateY(18px)",
        transition: "opacity 0.55s ease, transform 0.55s ease",
      }}
    >
      {children}
    </div>
  );
}

// ── STEP 1: Welcome ──────────────────────────────────────────────────────────
function WelcomeStep({ onNext }: { onNext: () => void }) {
  const [phase, setPhase] = useState(0);

  return (
    <StepWrap>
      <FadeIn delay={200} className="mb-16 self-center">
        <Logo asLink={false} size={44} />
      </FadeIn>

      <div className="w-full text-center space-y-6 mb-14">
        <h1 className="text-6xl sm:text-8xl font-bold text-white tracking-tight leading-[1.05]">
          {phase >= 0 && (
            <TypewriterLine
              text="Welcome."
              speed={90}
              onDone={() => setTimeout(() => setPhase(1), 600)}
            />
          )}
        </h1>

        {phase >= 1 && (
          <FadeIn>
            <p className="text-xl sm:text-2xl text-slate-300 leading-relaxed">
              <TypewriterLine
                text="AI is reshaping every industry."
                speed={38}
                onDone={() => setTimeout(() => setPhase(2), 350)}
              />
            </p>
          </FadeIn>
        )}

        {phase >= 2 && (
          <FadeIn>
            <p className="text-base sm:text-lg text-slate-500">
              <TypewriterLine
                text="We'll build your personalised briefing in 30 seconds."
                speed={28}
                onDone={() => setTimeout(() => setPhase(3), 450)}
              />
            </p>
          </FadeIn>
        )}
      </div>

      {phase >= 3 && (
        <FadeIn delay={150}>
          <button
            onClick={onNext}
            className="group inline-flex items-center gap-2.5 rounded-2xl bg-blue-600 px-9 py-4 text-base font-semibold text-white shadow-xl shadow-blue-600/25 hover:bg-blue-500 hover:shadow-blue-500/30 transition-all duration-200 active:scale-[0.97]"
          >
            Get started
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              className="transition-transform group-hover:translate-x-0.5"
            >
              <path
                d="M3 8h10M9 4l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </FadeIn>
      )}
    </StepWrap>
  );
}

// ── STEP 2: Industry picker ──────────────────────────────────────────────────
function IndustriesStep({ onNext }: { onNext: (selected: string[]) => void }) {
  const [phase, setPhase] = useState(0);
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (slug: string) =>
    setSelected((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    );

  return (
    <StepWrap>
      <div className="w-full text-center mb-10">
        <p className="text-xs font-semibold uppercase tracking-widest text-blue-400 mb-5">
          Step 1 of 2
        </p>
        <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight mb-4 leading-tight">
          {phase >= 0 && (
            <TypewriterLine
              text="Which industries interest you?"
              speed={32}
              onDone={() => setTimeout(() => setPhase(1), 250)}
            />
          )}
        </h2>
        {phase >= 1 && (
          <FadeIn className="text-sm text-slate-500">
            Pick as many as you like. We only send briefings that matter to you.
          </FadeIn>
        )}
      </div>

      {phase >= 1 && (
        <FadeIn delay={80} className="w-full">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mb-10">
            {industries.map((ind) => {
              const isSelected = selected.includes(ind.slug);
              return (
                <button
                  key={ind.slug}
                  onClick={() => toggle(ind.slug)}
                  className={`relative flex flex-col items-center gap-2.5 rounded-2xl border px-3 py-5 text-center transition-all duration-200 active:scale-95 ${
                    isSelected
                      ? "border-sky-400/50 bg-sky-400/[0.07] shadow-[0_0_22px_rgba(56,189,248,0.10)]"
                      : "border-white/8 bg-white/[0.02] hover:border-white/15 hover:bg-white/[0.04]"
                  }`}
                >
                  {isSelected && (
                    <span className="absolute top-2.5 right-2.5 flex h-5 w-5 items-center justify-center rounded-full bg-sky-400">
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path
                          d="M2 5l2 2 4-4"
                          stroke="#0f172a"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  )}
                  <span className="text-3xl">{ind.icon}</span>
                  <span
                    className={`text-sm font-semibold leading-tight ${
                      isSelected ? "text-sky-300" : "text-slate-300"
                    }`}
                  >
                    {ind.name}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="flex flex-col items-center gap-2">
            <button
              onClick={() => selected.length > 0 && onNext(selected)}
              disabled={selected.length === 0}
              className="inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-9 py-4 text-base font-semibold text-white shadow-xl shadow-blue-600/25 hover:bg-blue-500 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200 active:scale-[0.97]"
            >
              Continue
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M3 8h10M9 4l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            {selected.length > 0 && (
              <p className="text-xs text-slate-600">
                {selected.length}{" "}
                {selected.length === 1 ? "industry" : "industries"} selected
              </p>
            )}
          </div>
        </FadeIn>
      )}
    </StepWrap>
  );
}

// ── STEP 3: Email ────────────────────────────────────────────────────────────
function EmailStep({
  selectedIndustries,
  onNext,
}: {
  selectedIndustries: string[];
  onNext: (email: string) => void;
}) {
  const [phase, setPhase] = useState(0);
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
        body: JSON.stringify({ email, industries: selectedIndustries }),
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
    <StepWrap>
      <div className="w-full text-center mb-10">
        <p className="text-xs font-semibold uppercase tracking-widest text-blue-400 mb-5">
          Step 2 of 2
        </p>
        <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight mb-4 leading-tight">
          {phase >= 0 && (
            <TypewriterLine
              text="Where should we send your briefings?"
              speed={30}
              onDone={() => setTimeout(() => setPhase(1), 250)}
            />
          )}
        </h2>
        {phase >= 1 && (
          <FadeIn className="text-sm text-slate-500">
            Free, weekly, personalised to your industries. Unsubscribe anytime.
          </FadeIn>
        )}
      </div>

      {phase >= 1 && (
        <FadeIn delay={100} className="w-full max-w-sm">
          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="email"
              value={email}
              autoFocus
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
              }}
              placeholder="you@example.com"
              disabled={loading}
              className="w-full rounded-2xl border border-white/10 bg-white/[0.05] px-5 py-4 text-base text-white placeholder-slate-600 outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30 transition-all"
            />
            {error && <p className="text-xs text-red-400">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-9 py-4 text-base font-semibold text-white shadow-xl shadow-blue-600/25 hover:bg-blue-500 disabled:opacity-60 transition-all duration-200 active:scale-[0.97]"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  Subscribing...
                </>
              ) : (
                <>
                  Subscribe free
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M3 8h10M9 4l4 4-4 4"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </>
              )}
            </button>
          </form>
        </FadeIn>
      )}
    </StepWrap>
  );
}

// ── STEP 4: Success ──────────────────────────────────────────────────────────
function SuccessStep({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState(0);
  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;

  useEffect(() => {
    const t = setTimeout(() => onDoneRef.current(), 3200);
    return () => clearTimeout(t);
  }, []);

  return (
    <StepWrap>
      <FadeIn delay={150} className="mb-8 self-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full border border-emerald-500/25 bg-emerald-500/10">
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
            <path
              d="M8 18l7 7 13-13"
              stroke="#34d399"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </FadeIn>

      <div className="text-center space-y-4">
        <h2 className="text-6xl sm:text-8xl font-bold text-white tracking-tight">
          {phase >= 0 && (
            <TypewriterLine
              text="You're in."
              speed={75}
              onDone={() => setPhase(1)}
            />
          )}
        </h2>
        {phase >= 1 && (
          <FadeIn className="text-lg text-slate-400">
            Your first briefing is on its way.
          </FadeIn>
        )}
      </div>
    </StepWrap>
  );
}

// ── PERSONALISED HOME ────────────────────────────────────────────────────────
function PersonalisedHome({
  prefs,
  onReset,
}: {
  prefs: Prefs;
  onReset: () => void;
}) {
  const selected = industries.filter((i) =>
    prefs.selectedIndustries.includes(i.slug)
  );
  const others = industries.filter(
    (i) => !prefs.selectedIndustries.includes(i.slug)
  );

  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/5 py-20 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgba(59,130,246,0.12),transparent)] pointer-events-none" />
        <div className="mx-auto max-w-6xl relative z-10">
          <h1 className="text-4xl sm:text-6xl font-bold text-white tracking-tight mb-4 leading-tight">
            Your{" "}
            <span className="bg-gradient-to-r from-sky-300 to-blue-500 bg-clip-text text-transparent">
              {selected.map((i) => i.name).join(" & ")}
            </span>{" "}
            {selected.length === 1 ? "briefing" : "briefings"}.
          </h1>

          <p className="text-slate-400 text-base max-w-lg leading-relaxed">
            Every Tuesday — industry-specific, no hype, straight to the point.
          </p>

          <button
            onClick={onReset}
            className="mt-6 text-xs text-slate-600 hover:text-slate-400 transition-colors underline underline-offset-2"
          >
            Edit my preferences
          </button>
        </div>
      </section>

      {/* Their industries */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-b border-white/5">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-blue-400 mb-8">
            Your industries
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {selected.map((ind) => (
              <div
                key={ind.slug}
                className="rounded-2xl border border-sky-400/15 bg-sky-400/[0.03] p-6"
              >
                <div className="flex items-center gap-3 mb-5">
                  <span className="text-2xl">{ind.icon}</span>
                  <span className="text-sm font-semibold text-sky-300">
                    {ind.name}
                  </span>
                </div>
                <div className="rounded-xl border border-dashed border-white/8 bg-white/[0.01] px-4 py-5 text-center">
                  <p className="text-xs font-medium text-slate-600">
                    First briefing coming soon
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Other industries */}
      {others.length > 0 && (
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-600 mb-2">
              Also covered
            </p>
            <h2 className="text-xl font-bold text-white mb-8">
              Other industries we cover.
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {others.map((ind) => (
                <div
                  key={ind.slug}
                  className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] px-4 py-3"
                >
                  <span className="text-lg">{ind.icon}</span>
                  <span className="text-sm text-slate-400">{ind.name}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

// ── MAIN GATE ────────────────────────────────────────────────────────────────
export default function OnboardingGate() {
  const [step, setStep] = useState<Step>("checking");
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);
  const [prefs, setPrefs] = useState<Prefs | null>(null);

  // Check localStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const saved = JSON.parse(raw) as Prefs;
        if (saved.completed) {
          setPrefs(saved);
          setStep("home");
          return;
        }
      }
    } catch {}
    setStep("welcome");
  }, []);

  const handleIndustriesDone = (selected: string[]) => {
    setSelectedIndustries(selected);
    setStep("email");
  };

  const handleEmailDone = (email: string) => {
    const newPrefs: Prefs = {
      email,
      selectedIndustries,
      completed: true,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newPrefs));
    setPrefs(newPrefs);
    setStep("success");
  };

  const handleReset = () => {
    localStorage.removeItem(STORAGE_KEY);
    setPrefs(null);
    setSelectedIndustries([]);
    setStep("welcome");
  };

  // Don't flash anything while checking
  if (step === "checking") return null;

  // Personalised homepage (regular layout visible)
  if (step === "home" && prefs) {
    return <PersonalisedHome prefs={prefs} onReset={handleReset} />;
  }

  // Onboarding overlay — covers Header via z-[60]
  return (
    <div className="fixed inset-0 z-[60] bg-[#040710] overflow-y-auto flex items-center justify-center">
      {step === "welcome" && (
        <WelcomeStep onNext={() => setStep("industries")} />
      )}
      {step === "industries" && (
        <IndustriesStep onNext={handleIndustriesDone} />
      )}
      {step === "email" && (
        <EmailStep
          selectedIndustries={selectedIndustries}
          onNext={handleEmailDone}
        />
      )}
      {step === "success" && (
        <SuccessStep onDone={() => setStep("home")} />
      )}
    </div>
  );
}
