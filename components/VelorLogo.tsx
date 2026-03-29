"use client";

import { useId } from "react";

/** Temporary VELOR mark — replace with final brand asset later. */
export function VelorLogo() {
  const uid = useId().replace(/:/g, "");
  const gradId = `velor-mark-${uid}`;

  return (
    <div className="flex min-w-0 items-center gap-2.5" aria-label="VELOR">
      <svg width="36" height="36" viewBox="0 0 40 40" className="shrink-0" aria-hidden>
        <defs>
          <linearGradient id={gradId} x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#7c3aed" />
            <stop offset="55%" stopColor="#a78bfa" />
            <stop offset="100%" stopColor="#c4b5fd" />
          </linearGradient>
        </defs>
        <rect
          width="40"
          height="40"
          rx="10"
          fill="rgba(0,0,0,0.4)"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="1"
          style={{ filter: "drop-shadow(0 0 12px rgba(124, 58, 237, 0.35))" }}
        />
        <path
          d="M11 12h5.2l3.8 11.2L23.8 12H29l-6.2 16h-5.6L11 12z"
          fill={`url(#${gradId})`}
          opacity={0.95}
        />
      </svg>
      <span className="truncate text-lg font-semibold tracking-tight text-white">VELOR</span>
    </div>
  );
}
