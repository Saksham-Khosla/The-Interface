interface LogoProps {
  className?: string;
}

export default function Logo({ className = "" }: LogoProps) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <div className="relative flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-navy-700 to-navy-900 ring-1 ring-inset ring-white/10">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 2.5l2.4 6.6 6.6 2.4-6.6 2.4-2.4 6.6-2.4-6.6-6.6-2.4 6.6-2.4z"
            fill="url(#sparkGradient)"
          />
          <defs>
            <linearGradient id="sparkGradient" x1="2" y1="2.5" x2="20" y2="20.5" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#7dd3fc" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <span className="text-[15px] font-semibold tracking-tight text-white whitespace-nowrap">
        The <span className="bg-gradient-to-r from-sky-300 to-blue-500 bg-clip-text text-transparent">Inference</span>
      </span>
    </div>
  );
}
