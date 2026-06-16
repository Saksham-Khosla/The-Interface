import EmailSignup from "./EmailSignup";

interface CTABlockProps {
  title?: string;
  subtitle?: string;
}

export default function CTABlock({
  title = "Stay ahead of AI — every week.",
  subtitle = "Join 12,000+ founders, builders, and operators who read The Inference to understand what's actually happening in AI.",
}: CTABlockProps) {
  return (
    <section id="subscribe" className="relative overflow-hidden rounded-3xl border border-blue-500/10 bg-gradient-to-br from-navy-800 via-navy-900 to-navy-950 p-8 sm:p-12">
      {/* Glow effect */}
      <div className="absolute inset-0 bg-hero-glow opacity-60 pointer-events-none" />
      <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-blue-600/10 blur-3xl pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-xl text-center">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-blue-400 animate-pulse" />
          <span className="text-xs font-medium text-blue-300">Weekly · Free · No spam</span>
        </div>
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl mb-4">
          {title}
        </h2>
        <p className="text-base text-slate-400 mb-8 leading-relaxed">
          {subtitle}
        </p>
        <EmailSignup variant="inline" />
      </div>
    </section>
  );
}
