import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <p className="text-6xl font-bold text-blue-500/20 mb-4">404</p>
        <h1 className="text-2xl font-bold text-white mb-3">Page not found</h1>
        <p className="text-sm text-slate-400 mb-8">
          This page doesn't exist — or the URL has changed. Try heading back to the home page.
        </p>
        <Link
          href="/"
          className="inline-flex rounded-xl bg-blue-600 px-6 py-3 text-sm font-medium text-white hover:bg-blue-500 transition-colors"
        >
          Back to home
        </Link>
      </div>
    </div>
  );
}
