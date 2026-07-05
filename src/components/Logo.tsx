import Link from "next/link";

type LogoProps = {
  /** Show the "The Inference" wordmark next to the icon. Default: true */
  showWordmark?: boolean;
  /** Icon size in px (the wordmark scales with it). Default: 32 */
  size?: number;
  /** Wrap the logo in a link to "/". Default: true */
  asLink?: boolean;
  className?: string;
};

/**
 * The Inference — "Therefore" (∴) mark.
 * A dark navy rounded tile holding the logic symbol for "therefore":
 * three dots (one top, two bottom) in the sky-300 → blue-500 brand gradient.
 * Wordmark: "The" in white, "Inference" in the same gradient.
 */
export default function Logo({
  showWordmark = true,
  size = 32,
  asLink = true,
  className = "",
}: LogoProps) {
  const inner = (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <span
        className="grid place-items-center rounded-[28%] border border-sky-300/20 bg-gradient-to-b from-navy-800 to-navy-900 shadow-[0_0_24px_rgba(59,130,246,0.18)]"
        style={{ width: size, height: size }}
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 24 24"
          width={size * 0.56}
          height={size * 0.56}
          role="img"
          aria-label="The Inference logo"
        >
          <defs>
            <linearGradient id="inference-mark" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#7dd3fc" />
              <stop offset="1" stopColor="#3b82f6" />
            </linearGradient>
          </defs>
          <circle cx="12" cy="6" r="2.5" fill="url(#inference-mark)" />
          <circle cx="6.5" cy="16.5" r="2.5" fill="url(#inference-mark)" />
          <circle cx="17.5" cy="16.5" r="2.5" fill="url(#inference-mark)" />
        </svg>
      </span>

      {showWordmark && (
        <span
          className="font-extrabold tracking-tight whitespace-nowrap"
          style={{ fontSize: size * 0.58 }}
        >
          <span className="text-white">The </span>
          <span className="bg-gradient-to-r from-sky-300 to-blue-500 bg-clip-text text-transparent">
            Inference
          </span>
        </span>
      )}
    </span>
  );

  if (!asLink) return inner;

  return (
    <Link href="/" aria-label="The Inference — home" className="inline-flex">
      {inner}
    </Link>
  );
}
