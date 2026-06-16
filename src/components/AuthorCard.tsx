export default function AuthorCard() {
  return (
    <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-8 flex flex-col sm:flex-row gap-6 items-start">
      {/* Avatar */}
      <div className="flex-shrink-0 h-16 w-16 rounded-full bg-gradient-to-br from-blue-500 to-indigo-700 flex items-center justify-center text-2xl font-bold text-white shadow-lg shadow-blue-600/20">
        TI
      </div>
      {/* Bio */}
      <div className="flex-1">
        <p className="text-xs font-semibold uppercase tracking-widest text-blue-400 mb-1">Author</p>
        <h3 className="text-lg font-semibold text-white mb-2">Your Name Here</h3>
        <p className="text-sm text-slate-400 leading-relaxed">
          Placeholder author bio. Replace this with a short paragraph about who you are, what you've built, why you're the right person to write about AI, and what makes your perspective worth reading. 2–3 sentences is ideal.
        </p>
        <div className="mt-4 flex gap-3">
          <a href="#" className="text-xs text-slate-400 hover:text-white transition-colors">Twitter →</a>
          <a href="#" className="text-xs text-slate-400 hover:text-white transition-colors">LinkedIn →</a>
        </div>
      </div>
    </div>
  );
}
