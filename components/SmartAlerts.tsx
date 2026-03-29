"use client";

import { WidgetFrame } from "@/components/WidgetFrame";
import { SAMPLE_ALERTS, SIGNAL_META, type VelorSignal } from "@/lib/signals";

function badgeClass(signal: VelorSignal) {
  return SIGNAL_META[signal].tone === "long"
    ? "bg-emerald-950/70 text-emerald-300 ring-emerald-800/50"
    : "bg-red-950/70 text-red-300 ring-red-800/50";
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
            className="flex items-center justify-between gap-2 rounded-lg border border-[var(--border)] bg-[#0c0c0f]/80 px-3 py-2 text-sm"
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
