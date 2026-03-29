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
          className="w-full max-w-xs rounded-md border border-[var(--border)] bg-[#0c0c0f] px-2 py-1.5 text-sm text-white"
        >
          {MARKETS.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
      </label>
      <div className="flex items-end gap-3">
        <span className="text-5xl font-semibold tabular-nums tracking-tight text-white">{score}</span>
        <span className="mb-1 rounded-md bg-amber-500/15 px-2 py-1 text-sm font-medium text-amber-300">
          {label}
        </span>
      </div>
      <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-[#0c0c0f]">
        <div
          className="h-full rounded-full bg-gradient-to-r from-emerald-600 via-yellow-500 to-rose-600"
          style={{ width: `${score}%` }}
        />
      </div>
    </WidgetFrame>
  );
}
