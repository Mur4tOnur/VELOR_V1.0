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
      subtitle="Risk mix — static demo data."
      onHide={onHide}
      showHide={showHide}
    >
      <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-center sm:justify-center">
        <div
          className="h-36 w-36 shrink-0 rounded-full border border-[var(--border)] shadow-inner"
          style={{ background: conicGradient() }}
        />
        <ul className="space-y-2 text-sm">
          {SLICES.map((s) => (
            <li key={s.name} className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: s.color }} />
              <span className="text-white">{s.name}</span>
              <span className="text-[var(--muted)]">{s.pct}%</span>
            </li>
          ))}
        </ul>
      </div>
    </WidgetFrame>
  );
}
