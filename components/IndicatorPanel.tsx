"use client";

import {
  CandlestickSeries,
  ColorType,
  createChart,
  createSeriesMarkers,
  type ISeriesApi,
  type Time,
} from "lightweight-charts";
import { useEffect, useMemo, useRef, useState } from "react";
import { WidgetFrame } from "@/components/WidgetFrame";
import { defaultPair, MARKETS, PAIRS_BY_MARKET, type Market } from "@/lib/markets";
import { buildMockCandles } from "@/lib/mockCandles";
import { SIGNAL_META, type VelorSignal } from "@/lib/signals";

function markerStyle(signal: string): {
  position: "belowBar" | "aboveBar";
  color: string;
  shape: "arrowUp" | "arrowDown";
} {
  if (signal === "VALUE" || signal === "DISCOUNT") {
    return { position: "belowBar", color: "#22c55e", shape: "arrowUp" };
  }
  return { position: "aboveBar", color: "#f87171", shape: "arrowDown" };
}

type Props = {
  showHide?: boolean;
  onHide?: () => void;
};

export function IndicatorPanel({ showHide, onHide }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const seriesRef = useRef<ISeriesApi<"Candlestick"> | null>(null);
  const [market, setMarket] = useState<Market>("Cryptocurrency");
  const [pair, setPair] = useState<string>(() => defaultPair("Cryptocurrency"));

  const { candles, markerTimes } = useMemo(
    () => buildMockCandles(market, pair, 140),
    [market, pair],
  );

  const onMarketPick = (m: Market) => {
    setMarket(m);
    setPair(defaultPair(m));
  };

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const chart = createChart(el, {
      layout: {
        background: { type: ColorType.Solid, color: "#141419" },
        textColor: "#9ca3af",
      },
      grid: {
        vertLines: { color: "#2a2a32" },
        horzLines: { color: "#2a2a32" },
      },
      rightPriceScale: { borderColor: "#2a2a32" },
      timeScale: { borderColor: "#2a2a32" },
      width: el.clientWidth,
      height: 360,
    });

    const series = chart.addSeries(CandlestickSeries, {
      upColor: "#22c55e",
      downColor: "#ef4444",
      borderVisible: false,
      wickUpColor: "#22c55e",
      wickDownColor: "#ef4444",
    });
    seriesRef.current = series;
    series.setData(candles);

    const markers = markerTimes.map((m) => {
      const st = markerStyle(m.signal);
      return {
        time: m.time as Time,
        position: st.position,
        color: st.color,
        shape: st.shape,
        text: m.signal,
      };
    });
    const seriesMarkers = createSeriesMarkers(series, markers);

    const ro = new ResizeObserver(() => {
      chart.applyOptions({ width: el.clientWidth });
    });
    ro.observe(el);

    return () => {
      ro.disconnect();
      seriesMarkers.detach();
      chart.remove();
      seriesRef.current = null;
    };
  }, [candles, markerTimes]);

  const last = candles[candles.length - 1];
  const mockEma = last ? last.close * 0.985 : 0;
  const distancePct = last && mockEma ? (((last.close - mockEma) / mockEma) * 100).toFixed(2) : "—";

  return (
    <WidgetFrame
      title="Indicator panel"
      subtitle="Mock OHLC — sample only; EMA/RSI-style context labels (see Pine script)."
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

      <div ref={containerRef} className="w-full min-h-[360px]" />

      <div className="mt-3 grid gap-2 border-t border-[var(--border)] pt-3 text-xs sm:grid-cols-2">
        <div className="text-[var(--muted)]">
          <span className="text-white">distancePct</span> (mock vs EMA):{" "}
          <span className="font-mono text-emerald-300">{distancePct}%</span>
        </div>
        <ul className="flex flex-wrap gap-2">
          {(Object.keys(SIGNAL_META) as VelorSignal[]).map((k) => (
            <li
              key={k}
              className={`rounded px-2 py-0.5 font-mono text-[10px] ${
                SIGNAL_META[k].tone === "long"
                  ? "bg-emerald-950/60 text-emerald-300"
                  : "bg-red-950/60 text-red-300"
              }`}
            >
              {k}
            </li>
          ))}
        </ul>
      </div>
    </WidgetFrame>
  );
}
