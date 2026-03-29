"use client";

import { useState } from "react";
import { WidgetFrame } from "@/components/WidgetFrame";
import { MARKETS, type Market } from "@/lib/markets";

function labelForScore(score: number): string {
  if (score <= 25) return "Fear";
  if (score <= 49) return "Neutral";
  if (score <= 74) return "Greed";
  return "Extreme";
}

/** Placeholder per market — replace with API calls per market later. */
const MOCK_BY_MARKET: Record<Market, number> = {
  Cryptocurrency: 52,
  Indices: 41,
  Commodities: 63,
  Forex: 37,
};

type Props = {
  onHide?: () => void;
  showHide?: boolean;
};

export function FearGreedWidget({ onHide, showHide }: Props) {
  const [market, setMarket] = useState<Market>("Cryptocurrency");
  const score = MOCK_BY_MARKET[market];
  const label = labelForScore(score);

  return (
    <WidgetFrame
      title="Fear & Greed"
      subtitle="Per-market mock index (0–100) — wire APIs in a later phase."
      onHide={onHide}
      showHide={showHide}
    >
      <label className="mb-4 flex flex-col gap-1 text-xs text-[var(--muted)]">
        Market
        <select
          value={market}
          onChange={(e) => setMarket(e.target.value as Market)}
          className="velor-select w-full max-w-xs"
        >
          {MARKETS.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
      </label>
      <div className="flex items-end gap-3">
        <span className="text-5xl font-semibold tabular-nums tracking-tight text-white drop-shadow-[0_0_24px_rgba(255,255,255,0.12)]">
          {score}
        </span>
        <span className="mb-1 rounded-lg border border-amber-500/25 bg-amber-500/10 px-2 py-1 text-sm font-medium text-amber-200/90 backdrop-blur-sm">
          {label}
        </span>
      </div>
      <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-black/50 ring-1 ring-inset ring-white/[0.06]">
        <div
          className="h-full rounded-full bg-gradient-to-r from-emerald-500 via-amber-400 to-violet-500 shadow-[0_0_12px_rgba(52,211,153,0.4)]"
          style={{ width: `${score}%` }}
        />
      </div>
    </WidgetFrame>
  );
}
