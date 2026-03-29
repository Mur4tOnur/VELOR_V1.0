"use client";

import { useMemo, useState } from "react";
import { WidgetFrame } from "@/components/WidgetFrame";
import { defaultPair, MARKETS, PAIRS_BY_MARKET, type Market } from "@/lib/markets";

function hashSeed(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

type Props = {
  onHide?: () => void;
  showHide?: boolean;
};

/** Mock liquidation-style heat grid — not real exchange data. */
export function LiquidationHeatMap({ onHide, showHide }: Props) {
  const [market, setMarket] = useState<Market>("Cryptocurrency");
  const [pair, setPair] = useState<string>(() => defaultPair("Cryptocurrency"));

  const onMarketPick = (m: Market) => {
    setMarket(m);
    setPair(defaultPair(m));
  };

  const rows = 10;
  const cols = 16;

  const cells = useMemo(() => {
    const seed = hashSeed(`${market}|${pair}|liq`);
    const out: { key: string; intensity: number }[] = [];
    let s = seed;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        s = (s * 1103515245 + 12345) >>> 0;
        const intensity = (s % 100) / 100;
        out.push({ key: `${r}-${c}`, intensity });
      }
    }
    return out;
  }, [market, pair]);

  return (
    <WidgetFrame
      title="Liquidation heat map"
      subtitle="Sample density grid per market & pair (API later)."
      onHide={onHide}
      showHide={showHide}
    >
      <div className="mb-3 flex flex-wrap items-end gap-3">
        <label className="flex flex-col gap-1 text-xs text-[var(--muted)]">
          Market
          <select
            value={market}
            onChange={(e) => onMarketPick(e.target.value as Market)}
            className="rounded-md border border-[var(--border)] bg-[#0c0c0f] px-2 py-1.5 text-sm text-white"
          >
            {MARKETS.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-1 text-xs text-[var(--muted)]">
          Pair
          <select
            value={pair}
            onChange={(e) => setPair(e.target.value)}
            className="rounded-md border border-[var(--border)] bg-[#0c0c0f] px-2 py-1.5 font-mono text-sm text-white"
          >
            {PAIRS_BY_MARKET[market].map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div
        className="grid gap-px rounded-lg border border-[var(--border)] bg-[var(--border)] p-px"
        style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
      >
        {cells.map(({ key, intensity }) => {
          const isLong = intensity > 0.52;
          const alpha = 0.15 + intensity * 0.75;
          const bg = isLong
            ? `rgba(34, 197, 94, ${alpha})`
            : `rgba(239, 68, 68, ${alpha})`;
          return <div key={key} className="aspect-square min-h-[14px] rounded-[2px]" style={{ backgroundColor: bg }} />;
        })}
      </div>
      <div className="mt-2 flex justify-between text-[10px] text-[var(--muted)]">
        <span>Lower prices</span>
        <span>Higher prices</span>
      </div>
    </WidgetFrame>
  );
}
