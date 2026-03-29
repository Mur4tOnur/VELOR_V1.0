"use client";

import { WidgetFrame } from "@/components/WidgetFrame";

const SLICES = [
  { name: "BTC", pct: 40, color: "#f7931a" },
  { name: "ETH", pct: 30, color: "#627eea" },
  { name: "USDT", pct: 30, color: "#26a17b" },
] as const;

function conicGradient() {
  let start = 0;
  const parts: string[] = [];
  for (const s of SLICES) {
    const end = start + s.pct;
    parts.push(`${s.color} ${start}% ${end}%`);
    start = end;
  }
  return `conic-gradient(${parts.join(", ")})`;
}

type Props = {
  onHide?: () => void;
  showHide?: boolean;
};

export function PortfolioPie({ onHide, showHide }: Props) {
  return (
    <WidgetFrame
      title="Portfolio (mock)"
      subtitle="Allocation and mock book stats — full positions table is below in the Portfolio room, and on Overview as its own row."
      onHide={onHide}
      showHide={showHide}
    >
      <div className="grid gap-3 sm:grid-cols-3">
        <div className="velor-glass-card rounded-xl p-3 ring-1 ring-inset ring-white/[0.04]">
          <p className="text-[10px] uppercase text-zinc-500">Open (mock)</p>
          <p className="text-2xl font-semibold tabular-nums text-white">5</p>
        </div>
        <div className="velor-glass-card rounded-xl p-3 ring-1 ring-inset ring-white/[0.04]">
          <p className="text-[10px] uppercase text-zinc-500">Brokers</p>
          <p className="text-2xl font-semibold tabular-nums text-white">3</p>
        </div>
        <div className="velor-glass-card rounded-xl p-3 ring-1 ring-inset ring-white/[0.04] sm:col-span-1">
          <p className="text-[10px] uppercase text-zinc-500">Unrealized PnL (mock)</p>
          <p className="velor-text-glow-green text-2xl font-semibold tabular-nums text-emerald-400">+$420</p>
        </div>
      </div>

      <div className="mt-6 flex flex-col items-center gap-6 sm:flex-row sm:items-center sm:justify-center">
        <div
          className="h-32 w-32 shrink-0 rounded-full border border-white/15 shadow-[0_0_40px_-12px_rgba(247,147,22,0.35),inset_0_1px_0_rgba(255,255,255,0.08)] ring-2 ring-black/40 sm:h-36 sm:w-36"
          style={{ background: conicGradient() }}
        />
        <ul className="w-full max-w-xs space-y-2 text-sm sm:w-auto">
          {SLICES.map((s) => (
            <li key={s.name} className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: s.color }} />
              <span className="text-white">{s.name}</span>
              <span className="text-[var(--muted)]">{s.pct}%</span>
            </li>
          ))}
        </ul>
      </div>
    </WidgetFrame>
  );
}
