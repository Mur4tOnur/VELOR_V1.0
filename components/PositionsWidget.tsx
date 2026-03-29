"use client";

import { WidgetFrame } from "@/components/WidgetFrame";
import { MOCK_POSITIONS } from "@/lib/mockPositions";

type Props = {
  onHide?: () => void;
  showHide?: boolean;
};

export function PositionsWidget({ onHide, showHide }: Props) {
  return (
    <WidgetFrame
      title="Positions"
      subtitle="Mock book across brokers — no live connection."
      onHide={onHide}
      showHide={showHide}
    >
      <div className="w-full min-w-0 overflow-x-auto rounded-xl border border-white/[0.08] bg-black/35 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] backdrop-blur-md">
        <table className="w-full min-w-[860px] table-fixed text-left text-xs xl:min-w-0">
          <colgroup>
            <col className="w-[11%]" />
            <col className="w-[18%]" />
            <col className="w-[14%]" />
            <col className="w-[8%]" />
            <col className="w-[10%]" />
            <col className="w-[12%]" />
            <col className="w-[9%]" />
            <col className="w-[10%]" />
          </colgroup>
          <thead>
            <tr className="border-b border-white/[0.08] bg-zinc-900/50 text-[10px] uppercase tracking-wide text-zinc-500">
              <th className="whitespace-nowrap px-2 py-2.5 sm:px-3">Broker</th>
              <th className="whitespace-nowrap px-2 py-2.5 sm:px-3">Platform / account</th>
              <th className="whitespace-nowrap px-2 py-2.5 sm:px-3">Symbol</th>
              <th className="whitespace-nowrap px-2 py-2.5 sm:px-3">Side</th>
              <th className="whitespace-nowrap px-2 py-2.5 sm:px-3">Entry</th>
              <th className="whitespace-nowrap px-2 py-2.5 sm:px-3">Size</th>
              <th className="whitespace-nowrap px-2 py-2.5 sm:px-3">Notional</th>
              <th className="whitespace-nowrap px-2 py-2.5 sm:px-3">Opened</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_POSITIONS.map((p) => (
              <tr
                key={p.id}
                className="border-b border-white/[0.05] last:border-0 transition-colors hover:bg-white/[0.03]"
              >
                <td className="px-2 py-2.5 font-medium text-white sm:px-3">{p.broker}</td>
                <td className="truncate px-2 py-2.5 text-zinc-400 sm:px-3" title={p.account}>
                  {[p.platform, p.account].filter(Boolean).join(" · ") || "—"}
                </td>
                <td className="px-2 py-2.5 font-mono text-zinc-200 sm:px-3">{p.symbol}</td>
                <td className="px-2 py-2.5 sm:px-3">
                  <span
                    className={
                      p.side === "Long"
                        ? "inline-block rounded-md border border-emerald-500/25 bg-emerald-950/40 px-1.5 py-0.5 text-emerald-300 shadow-[0_0_14px_-5px_rgba(52,211,153,0.45)]"
                        : "inline-block rounded-md border border-orange-500/25 bg-orange-950/35 px-1.5 py-0.5 text-orange-200 shadow-[0_0_14px_-5px_rgba(251,146,60,0.35)]"
                    }
                  >
                    {p.side}
                  </span>
                </td>
                <td className="velor-text-glow-green px-2 py-2.5 font-mono tabular-nums text-emerald-300 sm:px-3">
                  {p.entry}
                </td>
                <td className="px-2 py-2.5 font-mono tabular-nums text-zinc-300 sm:px-3">{p.size}</td>
                <td className="px-2 py-2.5 text-zinc-500 sm:px-3">{p.notional ?? "—"}</td>
                <td className="px-2 py-2.5 text-zinc-500 sm:px-3">{p.opened}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </WidgetFrame>
  );
}
