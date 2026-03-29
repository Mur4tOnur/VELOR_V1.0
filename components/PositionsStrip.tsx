"use client";

import { MOCK_POSITIONS } from "@/lib/mockPositions";

type Props = {
  /** Taller padding when opened as a full room. */
  variant?: "dock" | "page";
};

export function PositionsStrip({ variant = "dock" }: Props) {
  const pad = variant === "dock" ? "px-4 py-3 md:px-6" : "p-4 md:p-6";

  return (
    <div
      className={`w-full border-t border-[var(--border)] bg-[#0f0f14] ${pad}`}
      role="region"
      aria-label="Positions"
    >
      <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Positions</h2>
        <span className="text-[10px] text-zinc-600">Mock · no broker connection</span>
      </div>

      <div className="overflow-x-auto rounded-lg border border-[var(--border)]">
        <table className="w-full min-w-[720px] text-left text-xs">
          <thead>
            <tr className="border-b border-[var(--border)] bg-[var(--panel)] text-[10px] uppercase tracking-wide text-zinc-500">
              <th className="whitespace-nowrap px-3 py-2">Broker</th>
              <th className="whitespace-nowrap px-3 py-2">Platform / account</th>
              <th className="whitespace-nowrap px-3 py-2">Symbol</th>
              <th className="whitespace-nowrap px-3 py-2">Side</th>
              <th className="whitespace-nowrap px-3 py-2">Entry</th>
              <th className="whitespace-nowrap px-3 py-2">Size</th>
              <th className="whitespace-nowrap px-3 py-2">Notional</th>
              <th className="whitespace-nowrap px-3 py-2">Opened</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_POSITIONS.map((p) => (
              <tr
                key={p.id}
                className="border-b border-[var(--border)]/80 last:border-0 hover:bg-white/[0.02]"
              >
                <td className="px-3 py-2 font-medium text-white">{p.broker}</td>
                <td className="max-w-[200px] truncate px-3 py-2 text-zinc-400" title={p.account}>
                  {[p.platform, p.account].filter(Boolean).join(" · ") || "—"}
                </td>
                <td className="px-3 py-2 font-mono text-zinc-300">{p.symbol}</td>
                <td className="px-3 py-2">
                  <span
                    className={
                      p.side === "Long"
                        ? "rounded bg-emerald-950/60 px-1.5 py-0.5 text-emerald-400"
                        : "rounded bg-red-950/60 px-1.5 py-0.5 text-red-400"
                    }
                  >
                    {p.side}
                  </span>
                </td>
                <td className="px-3 py-2 font-mono text-zinc-300">{p.entry}</td>
                <td className="px-3 py-2 font-mono text-zinc-400">{p.size}</td>
                <td className="px-3 py-2 text-zinc-500">{p.notional ?? "—"}</td>
                <td className="px-3 py-2 text-zinc-500">{p.opened}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
