"use client";

import { WidgetFrame } from "@/components/WidgetFrame";
import { SAMPLE_ALERTS, SIGNAL_META, type VelorSignal } from "@/lib/signals";

function badgeClass(signal: VelorSignal) {
  if (SIGNAL_META[signal].tone === "long") {
    return "bg-emerald-950/50 text-emerald-300 ring-emerald-500/30 shadow-[0_0_12px_-4px_rgba(52,211,153,0.4)]";
  }
  return "bg-violet-950/45 text-violet-200 ring-violet-400/30 shadow-[0_0_12px_-4px_rgba(167,139,250,0.35)]";
}

type Props = {
  onHide?: () => void;
  showHide?: boolean;
};

export function SmartAlerts({ onHide, showHide }: Props) {
  return (
    <WidgetFrame
      title="Smart alerts"
      subtitle="Sample context signals — not buy/sell advice."
      onHide={onHide}
      showHide={showHide}
    >
      <ul className="space-y-2">
        {SAMPLE_ALERTS.map((a) => (
          <li
            key={a.id}
            className="flex items-center justify-between gap-2 rounded-xl border border-white/[0.06] bg-black/35 px-3 py-2 text-sm backdrop-blur-sm transition-colors hover:border-white/10 hover:bg-black/45"
          >
            <span className="font-mono text-white">{a.symbol}</span>
            <span className={`rounded-md px-2 py-0.5 text-xs font-medium ring-1 ${badgeClass(a.signal)}`}>
              {a.signal}
            </span>
            <span className="hidden text-xs text-[var(--muted)] sm:inline">{a.time}</span>
          </li>
        ))}
      </ul>
    </WidgetFrame>
  );
}
