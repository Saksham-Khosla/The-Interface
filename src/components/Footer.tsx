import Link from "next/link";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-navy-950 px-4 py-16">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/">
              <Logo />
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed max-w-xs">
              A weekly intelligence briefing on how AI is changing every industry — from finance and law to healthcare and work.
            </p>
          </div>

          {/* Links */}
          <div className="space-y-3">
            <p className="text-xs font-medium uppercase tracking-widest text-slate-500">Navigate</p>
            {[
              { href: "/", label: "Home" },
              { href: "/industries", label: "Industries" },
              { href: "/issues", label: "Issues" },
              { href: "/about", label: "About" },
              { href: "/contact", label: "Contact" },
            ].map((link) => (
              <Link key={link.href} href={link.href} className="block text-sm text-slate-400 hover:text-slate-200 transition-colors">
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mini subscribe */}
          <div className="space-y-4">
            <p className="text-xs font-medium uppercase tracking-widest text-slate-500">Stay sharp</p>
            <p className="text-sm text-slate-400">Get smarter about AI, one industry at a time.</p>
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
