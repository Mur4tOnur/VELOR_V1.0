/** Placeholder mark — replace with final brand asset later. */
export function VelorLogo() {
  return (
    <div className="flex items-center gap-2" aria-label="VELOR">
      <svg width="36" height="36" viewBox="0 0 40 40" className="shrink-0" aria-hidden>
        <defs>
          <linearGradient id="vl" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#22d3ee" />
            <stop offset="100%" stopColor="#a78bfa" />
          </linearGradient>
        </defs>
        <rect width="40" height="40" rx="10" fill="#141419" stroke="#2a2a32" strokeWidth="1" />
        <path
          d="M10 28L20 10l10 18h-4.5L20 17l-5.5 11H10z"
          fill="url(#vl)"
          opacity={0.95}
        />
      </svg>
      <span className="font-semibold tracking-wide text-white">VELOR</span>
    </div>
  );
}
