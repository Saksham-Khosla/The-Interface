export default function AuthorCard() {
  return (
    <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-8 flex flex-col sm:flex-row gap-6 items-start">
      {/* Avatar */}
      <div className="flex-shrink-0 h-16 w-16 rounded-full bg-gradient-to-br from-blue-500 to-indigo-700 flex items-center justify-center text-2xl font-bold text-white shadow-lg shadow-blue-600/20">
        AI
      </div>
      {/* Bio */}
      <div className="flex-1">
        <p className="text-xs font-semibold uppercase tracking-widest text-blue-400 mb-1">Editorial Team</p>
        <h3 className="text-lg font-semibold text-white mb-2">Our Editorial Team</h3>
        <p className="text-sm text-slate-400 leading-relaxed">
          We're a small editorial team tracking how AI moves through finance, law, healthcare, education, work, startups, and media — and translating that into briefings people actually have time to read.
        </p>
      </div>
    </div>
  );
}
