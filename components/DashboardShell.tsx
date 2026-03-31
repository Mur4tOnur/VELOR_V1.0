"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { useAuth } from "@/components/auth/AuthProvider";
import { FearGreedWidget } from "@/components/FearGreedWidget";
import { LiquidationHeatMap } from "@/components/LiquidationHeatMap";
import { PortfolioPie } from "@/components/PortfolioPie";
import { PositionsWidget } from "@/components/PositionsWidget";
import { SmartAlerts } from "@/components/SmartAlerts";
import { VelorLogo } from "@/components/VelorLogo";

const IndicatorPanel = dynamic(() => import("@/components/IndicatorPanelLoader"), {
  ssr: false,
  loading: () => (
    <div className="velor-glass-card min-h-[420px] animate-pulse p-5">
      <div className="mb-4 h-4 w-40 rounded bg-zinc-800/80" />
      <div className="h-[360px] rounded-xl bg-black/40 ring-1 ring-inset ring-white/[0.06]" />
    </div>
  ),
});

type RoomId =
  | "overview"
  | "indicator"
  | "liquidation"
  | "portfolio"
  | "feargreed"
  | "alerts";

type WidgetKey = "indicator" | "liquidation" | "portfolio" | "feargreed" | "alerts" | "positions";

const NAV: { id: RoomId; label: string }[] = [
  { id: "overview", label: "Overview" },
  { id: "indicator", label: "Indicator" },
  { id: "liquidation", label: "Liquidation" },
  { id: "portfolio", label: "Portfolio" },
  { id: "feargreed", label: "Fear & Greed" },
  { id: "alerts", label: "Alerts" },
];

const defaultVisible: Record<WidgetKey, boolean> = {
  indicator: true,
  liquidation: true,
  portfolio: true,
  feargreed: true,
  alerts: true,
  positions: true,
};

export function DashboardShell() {
  const { user, signOut } = useAuth();
  const router = useRouter();
  const [room, setRoom] = useState<RoomId>("overview");
  const [visible, setVisible] = useState<Record<WidgetKey, boolean>>(defaultVisible);

  const hideWidget = (key: WidgetKey) => setVisible((v) => ({ ...v, [key]: false }));

  const resetOverview = () => setVisible({ ...defaultVisible });

  const navBtn = (id: RoomId) =>
    `shrink-0 whitespace-nowrap rounded-xl px-3 py-2.5 text-left text-sm transition-all duration-200 md:w-full md:whitespace-normal ${
      room === id ? "velor-nav-active border" : "velor-nav-idle border border-transparent"
    }`;

  const overviewHidden =
    !visible.indicator &&
    !visible.liquidation &&
    !visible.portfolio &&
    !visible.feargreed &&
    !visible.alerts;

  return (
    <div className="flex h-full min-h-0 w-full max-w-[100vw] flex-col overflow-hidden bg-[var(--bg)]">
      <header className="flex h-14 w-full shrink-0">
        <div className="velor-glass-hud flex w-40 min-w-[10.5rem] max-w-[14rem] shrink-0 items-center border-b border-r px-2 sm:px-3 md:w-56">
          <VelorLogo />
        </div>
        <div className="velor-glass-hud flex min-h-14 min-w-0 flex-1 items-center justify-end gap-2 border-b px-2 sm:gap-3 sm:px-4">
          <span className="hidden max-w-[8rem] truncate text-xs text-zinc-500 sm:inline md:max-w-[12rem]">
            {user?.name}
          </span>
          <Link
            href="/"
            className="shrink-0 rounded-lg border border-white/10 bg-white/[0.04] px-2.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-white/90 transition-colors hover:border-white/20 hover:bg-white/[0.07] sm:px-3 sm:text-xs"
          >
            Home
          </Link>
          <button
            type="button"
            onClick={() => {
              signOut();
              router.push("/");
            }}
            className="shrink-0 rounded-lg border border-red-500/20 bg-red-950/20 px-2.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-red-200/90 transition-colors hover:border-red-400/35 hover:bg-red-950/35 sm:px-3 sm:text-xs"
          >
            Log out
          </button>
        </div>
      </header>

      <div className="flex min-h-0 w-full min-w-0 flex-1 flex-col overflow-hidden md:flex-row">
        <aside className="velor-glass-hud z-20 flex w-full shrink-0 flex-col border-b border-white/[0.08] md:w-56 md:min-w-[14rem] md:max-w-[14rem] md:border-b-0 md:border-r">
          <p className="hidden px-3 pt-2 text-[10px] font-semibold uppercase tracking-wider text-zinc-500 md:block md:px-2 md:pt-2">
            Rooms
          </p>
          <div className="flex flex-nowrap items-stretch gap-1.5 overflow-x-auto overflow-y-hidden p-2 [-ms-overflow-style:none] [scrollbar-width:none] md:flex-col md:gap-1 md:overflow-x-visible md:overflow-y-auto md:p-2 [&::-webkit-scrollbar]:hidden">
            <span className="flex shrink-0 items-center self-center pr-1 text-[10px] font-semibold uppercase tracking-wider text-zinc-500 md:hidden">
              Rooms
            </span>
            {NAV.map(({ id, label }) => (
              <button key={id} type="button" className={navBtn(id)} onClick={() => setRoom(id)}>
                {label}
              </button>
            ))}
          </div>
        </aside>

        <main className="relative z-0 min-h-0 min-w-0 flex-1 basis-0 overflow-x-hidden overflow-y-auto overscroll-y-contain p-3 sm:p-4 md:p-6">
          {room === "overview" && (
            <div className="mb-3 flex flex-wrap items-center justify-end gap-2 sm:mb-4">
              <button
                type="button"
                onClick={resetOverview}
                className="shrink-0 rounded-lg border border-violet-500/25 bg-violet-950/20 px-2 py-1.5 text-[11px] text-violet-200/90 backdrop-blur-sm transition-colors hover:border-violet-400/40 hover:bg-violet-950/35 sm:px-3 sm:text-xs"
              >
                Reset hidden widgets
              </button>
            </div>
          )}

          {room !== "overview" && (
            <h1 className="mb-3 text-base font-semibold capitalize text-white sm:mb-4 sm:text-lg">
              {NAV.find((n) => n.id === room)?.label}
            </h1>
          )}

          {room === "overview" && (
            <>
              {overviewHidden && (
                <p className="mb-4 rounded-2xl border border-dashed border-white/15 bg-zinc-900/30 p-4 text-sm text-[var(--muted)] backdrop-blur-md">
                  All widgets are hidden. Use &quot;Reset hidden widgets&quot; or open a room from the left.
                </p>
              )}
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-6">
                <div className="flex min-w-0 flex-col gap-4 lg:col-span-2 lg:gap-6">
                  {visible.indicator && (
                    <IndicatorPanel showHide onHide={() => hideWidget("indicator")} />
                  )}
                  {visible.liquidation && (
                    <LiquidationHeatMap showHide onHide={() => hideWidget("liquidation")} />
                  )}
                </div>
                <div className="flex min-w-0 flex-col gap-4 lg:gap-6">
                  {visible.portfolio && <PortfolioPie showHide onHide={() => hideWidget("portfolio")} />}
                  {visible.feargreed && (
                    <FearGreedWidget showHide onHide={() => hideWidget("feargreed")} />
                  )}
                  {visible.alerts && <SmartAlerts showHide onHide={() => hideWidget("alerts")} />}
                </div>
                {visible.positions && (
                  <div className="min-w-0 lg:col-span-3">
                    <PositionsWidget showHide onHide={() => hideWidget("positions")} />
                  </div>
                )}
              </div>
            </>
          )}

          {room === "indicator" && <IndicatorPanel />}
          {room === "liquidation" && <LiquidationHeatMap />}
          {room === "portfolio" && (
            <div className="flex min-w-0 flex-col gap-4 sm:gap-6">
              <PortfolioPie />
              <PositionsWidget />
            </div>
          )}
          {room === "feargreed" && <FearGreedWidget />}
          {room === "alerts" && <SmartAlerts />}
        </main>
      </div>
    </div>
  );
}
