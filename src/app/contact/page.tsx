"use client";

import { useState } from "react";

const socials = [
  {
    name: "Twitter / X",
    handle: "@theinference",
    href: "#",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    handle: "The Inference",
    href: "#",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
        <circle cx="4" cy="4" r="2"/>
      </svg>
    ),
  },
  {
    name: "RSS Feed",
    handle: "Subscribe via RSS",
    href: "#",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 11a9 9 0 019 9M4 4a16 16 0 0116 16"/>
        <circle cx="5" cy="19" r="1" fill="currentColor"/>
      </svg>
    ),
  },
];

export default function ContactPage() {
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.email || !formState.message) return;
    setStatus("loading");
    await new Promise((r) => setTimeout(r, 900));
    setStatus("success");
  };

  return (
    <div>
      {/* Header */}
      <section className="relative overflow-hidden border-b border-white/5 py-24 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgba(59,130,246,0.1),transparent)] pointer-events-none" />
        <div className="mx-auto max-w-3xl relative z-10">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-blue-400">Contact</p>
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl mb-4">
            Get in touch.
          </h1>
          <p className="text-base text-slate-400 leading-relaxed max-w-xl">
            Have a story tip, a question about the newsletter, or just want to say hi? The Inference is run by one person, so replies might take a day or two — but they do happen.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
            {/* Left: info */}
            <div className="space-y-10">
              {/* Email */}
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-blue-400 mb-3">Email</p>
                <a
                  href="mailto:hello@theinference.co"
                  className="text-lg font-medium text-white hover:text-blue-300 transition-colors"
                >
                  hello@theinference.co
                </a>
                <p className="mt-1 text-sm text-slate-500">Replies within 1–2 business days.</p>
              </div>

              {/* Socials */}
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-blue-400 mb-4">Follow</p>
                <div className="space-y-3">
                  {socials.map((s) => (
                    <a
                      key={s.name}
                      href={s.href}
                      className="flex items-center gap-4 rounded-xl border border-white/5 bg-white/[0.02] p-4 hover:border-blue-500/20 hover:bg-white/[0.04] transition-all duration-200 group"
                    >
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/8 bg-white/5 text-slate-400 group-hover:text-blue-400 transition-colors">
                        {s.icon}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">{s.name}</p>
                        <p className="text-xs text-slate-500">{s.handle}</p>
                      </div>
                      <svg className="ml-auto text-slate-600 group-hover:text-slate-400 transition-colors" width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: form */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-blue-400 mb-6">Send a message</p>

              {status === "success" ? (
                <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-8 text-center">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/15 border border-emerald-500/20 mx-auto">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M4 10l4 4 8-8" stroke="#34d399" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <h3 className="text-base font-semibold text-white mb-2">Message sent!</h3>
                  <p className="text-sm text-slate-400">Thanks for reaching out. I'll be in touch within a couple days.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-1.5">
                      Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      placeholder="Your name"
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30 transition-all"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-1.5">
                      Email <span className="text-blue-400">*</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      placeholder="you@example.com"
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30 transition-all"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-1.5">
                      Message <span className="text-blue-400">*</span>
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={5}
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      placeholder="What's on your mind?"
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30 transition-all resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full rounded-xl bg-blue-600 px-6 py-3 text-sm font-medium text-white shadow-lg shadow-blue-600/20 hover:bg-blue-500 disabled:opacity-60 transition-all duration-200"
                  >
                    {status === "loading" ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      "Send message"
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
