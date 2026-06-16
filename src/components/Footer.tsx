import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-navy-950 px-4 py-16">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-blue-700">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h4M9 4l4 4-4 4" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="text-[15px] font-semibold text-white">The Inference</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed max-w-xs">
              Weekly intelligence on AI tools, research, and trends — written for people who build things.
            </p>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-3">
              <p className="text-xs font-medium uppercase tracking-widest text-slate-500">Navigate</p>
              {[
                { href: "/", label: "Home" },
                { href: "/issues", label: "Issues" },
                { href: "/about", label: "About" },
                { href: "/contact", label: "Contact" },
              ].map((link) => (
                <Link key={link.href} href={link.href} className="block text-sm text-slate-400 hover:text-slate-200 transition-colors">
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="space-y-3">
              <p className="text-xs font-medium uppercase tracking-widest text-slate-500">Follow</p>
              {[
                { href: "#", label: "Twitter / X" },
                { href: "#", label: "LinkedIn" },
                { href: "#", label: "RSS Feed" },
              ].map((link) => (
                <a key={link.label} href={link.href} className="block text-sm text-slate-400 hover:text-slate-200 transition-colors">
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Mini subscribe */}
          <div className="space-y-4">
            <p className="text-xs font-medium uppercase tracking-widest text-slate-500">Stay sharp</p>
            <p className="text-sm text-slate-400">Join 12,000+ readers getting weekly AI clarity.</p>
            <Link
              href="/#subscribe"
              className="inline-block rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500 transition-colors"
            >
              Subscribe free →
            </Link>
          </div>
        </div>

        <div className="mt-12 border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} The Inference. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-xs text-slate-500 hover:text-slate-400 transition-colors">Privacy</a>
            <a href="#" className="text-xs text-slate-500 hover:text-slate-400 transition-colors">Unsubscribe</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
