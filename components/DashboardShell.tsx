"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { FearGreedWidget } from "@/components/FearGreedWidget";
import { LiquidationHeatMap } from "@/components/LiquidationHeatMap";
import { PortfolioPie } from "@/components/PortfolioPie";
import { PositionsStrip } from "@/components/PositionsStrip";
import { SmartAlerts } from "@/components/SmartAlerts";
import { VelorLogo } from "@/components/VelorLogo";

const IndicatorPanel = dynamic(() => import("@/components/IndicatorPanelLoader"), {
  ssr: false,
  loading: () => (
    <div className="min-h-[420px] animate-pulse rounded-xl border border-[var(--border)] bg-[var(--panel)] p-4">
      <div className="mb-3 h-4 w-40 rounded bg-zinc-800" />
      <div className="h-[360px] rounded-lg bg-zinc-900/80" />
    </div>
  ),
});

type RoomId = "overview" | "indicator" | "liquidation" | "portfolio" | "feargreed" | "alerts" | "positions";

type WidgetKey = "indicator" | "liquidation" | "portfolio" | "feargreed" | "alerts";

const NAV: { id: RoomId; label: string }[] = [
  { id: "overview", label: "Overview" },
  { id: "indicator", label: "Indicator" },
  { id: "liquidation", label: "Liquidation" },
  { id: "portfolio", label: "Portfolio" },
  { id: "feargreed", label: "Fear & Greed" },
  { id: "alerts", label: "Alerts" },
  { id: "positions", label: "Positions" },
];

const defaultVisible: Record<WidgetKey, boolean> = {
  indicator: true,
  liquidation: true,
  portfolio: true,
  feargreed: true,
  alerts: true,
};

export function DashboardShell() {
  const [room, setRoom] = useState<RoomId>("overview");
  const [visible, setVisible] = useState<Record<WidgetKey, boolean>>(defaultVisible);
  const positionsDockRef = useRef<HTMLDivElement>(null);

  const hideWidget = (key: WidgetKey) => setVisible((v) => ({ ...v, [key]: false }));

  const resetOverview = () => setVisible({ ...defaultVisible });

  useEffect(() => {
    if (room === "positions") {
      positionsDockRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [room]);

  const navBtn = (id: RoomId) =>
    `w-full rounded-lg px-3 py-2 text-left text-sm transition-colors ${
      room === id
        ? "border border-[var(--border)] bg-[#1a1a22] text-white"
        : "text-[var(--muted)] hover:bg-[#1a1a22]/60 hover:text-white"
    }`;

  const overviewHidden =
    !visible.indicator &&
    !visible.liquidation &&
    !visible.portfolio &&
    !visible.feargreed &&
    !visible.alerts;

  return (
    <div className="flex min-h-screen flex-col bg-[var(--bg)]">
      <header className="flex h-14 shrink-0">
        <div className="flex w-56 items-center border-b border-r border-[var(--border)] bg-[var(--panel)] px-3">
          <VelorLogo />
        </div>
        <div className="flex flex-1 items-center border-b border-[var(--border)] bg-[var(--bg)] px-4">
          <p className="text-sm text-[var(--muted)]">
            Market intelligence · local dashboard · no live execution
          </p>
        </div>
      </header>

      <div className="flex min-h-0 flex-1 flex-col">
        <div className="flex min-h-0 flex-1">
          <aside className="flex w-56 shrink-0 flex-col gap-1 border-r border-[var(--border)] bg-[var(--panel)] p-2">
            <p className="px-2 pb-1 text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
              Rooms
            </p>
            {NAV.map(({ id, label }) => (
              <button key={id} type="button" className={navBtn(id)} onClick={() => setRoom(id)}>
                {label}
              </button>
            ))}
          </aside>

          <main className="min-h-0 flex-1 overflow-y-auto p-4 md:p-6">
            {room === "overview" && (
              <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                <h1 className="text-lg font-semibold text-white">Overview</h1>
                <button
                  type="button"
                  onClick={resetOverview}
                  className="text-xs text-cyan-400/90 hover:text-cyan-300"
                >
                  Reset hidden widgets
                </button>
              </div>
            )}

            {room !== "overview" && room !== "positions" && (
              <h1 className="mb-4 text-lg font-semibold capitalize text-white">
                {NAV.find((n) => n.id === room)?.label}
              </h1>
            )}

            {room === "positions" && (
              <div className="mb-6 space-y-2">
                <h1 className="text-lg font-semibold text-white">Positions</h1>
                <p className="text-sm text-[var(--muted)]">
                  Mock positions across brokers. Full book is pinned in the strip below (scroll down on
                  small screens).
                </p>
                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                  <div className="rounded-lg border border-[var(--border)] bg-[var(--panel)] p-3">
                    <p className="text-[10px] uppercase text-zinc-500">Open (mock)</p>
                    <p className="text-2xl font-semibold text-white">5</p>
                  </div>
                  <div className="rounded-lg border border-[var(--border)] bg-[var(--panel)] p-3">
                    <p className="text-[10px] uppercase text-zinc-500">Brokers</p>
                    <p className="text-2xl font-semibold text-white">3</p>
                  </div>
                  <div className="rounded-lg border border-[var(--border)] bg-[var(--panel)] p-3">
                    <p className="text-[10px] uppercase text-zinc-500">Unrealized PnL (mock)</p>
                    <p className="text-2xl font-semibold text-emerald-400">+$420</p>
                  </div>
                </div>
              </div>
            )}

            {room === "overview" && (
              <>
                {overviewHidden && (
                  <p className="mb-4 rounded-lg border border-dashed border-[var(--border)] p-4 text-sm text-[var(--muted)]">
                    All widgets are hidden. Use &quot;Reset hidden widgets&quot; or open a room from the left.
                  </p>
                )}
                <div className="grid gap-6 lg:grid-cols-3">
                  <div className="space-y-6 lg:col-span-2">
                    {visible.indicator && (
                      <IndicatorPanel showHide onHide={() => hideWidget("indicator")} />
                    )}
                    {visible.liquidation && (
                      <LiquidationHeatMap showHide onHide={() => hideWidget("liquidation")} />
                    )}
                  </div>
                  <div className="space-y-6">
                    {visible.portfolio && (
                      <PortfolioPie showHide onHide={() => hideWidget("portfolio")} />
                    )}
                    {visible.feargreed && (
                      <FearGreedWidget showHide onHide={() => hideWidget("feargreed")} />
                    )}
                    {visible.alerts && <SmartAlerts showHide onHide={() => hideWidget("alerts")} />}
                  </div>
                </div>
              </>
            )}

            {room === "indicator" && (
              <div className="space-y-6">
                <IndicatorPanel />
                <LiquidationHeatMap />
              </div>
            )}
            {room === "liquidation" && <LiquidationHeatMap />}
            {room === "portfolio" && <PortfolioPie />}
            {room === "feargreed" && <FearGreedWidget />}
            {room === "alerts" && <SmartAlerts />}
          </main>
        </div>

        <div ref={positionsDockRef} id="velor-positions" className="shrink-0">
          <PositionsStrip variant="dock" />
        </div>
      </div>
    </div>
  );
}
