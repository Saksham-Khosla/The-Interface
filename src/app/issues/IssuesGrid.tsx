export default function IssuesGrid() {
  return (
    <div className="rounded-2xl border border-white/5 bg-white/[0.02] py-24 px-8 text-center">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-500/10 border border-blue-500/10 mx-auto">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M2 6l8 6 8-6M2 6v10h16V6" stroke="#60a5fa" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      <h3 className="text-lg font-semibold text-white mb-2">First briefing coming soon.</h3>
      <p className="text-sm text-slate-400 max-w-sm mx-auto">
        Subscribe to get it in your inbox the moment it drops.
      </p>
    </div>
  );
}
