import type { CandlestickData, Time, UTCTimestamp } from "lightweight-charts";

function hashSeed(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function mulberry32(a: number) {
  return function () {
    let t = (a += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function toTs(dayOffset: number): UTCTimestamp {
  const d = new Date("2026-01-01T00:00:00Z");
  d.setUTCDate(d.getUTCDate() + dayOffset);
  return (Math.floor(d.getTime() / 1000) as unknown) as UTCTimestamp;
}

/** Synthetic OHLC per market+pair seed; not real market data. */
export function buildMockCandles(
  market: string,
  pair: string,
  days = 140,
): {
  candles: CandlestickData[];
  markerTimes: { time: Time; signal: string }[];
} {
  const rand = mulberry32(hashSeed(`${market}|${pair}`));
  const candles: CandlestickData[] = [];
  let price = 1000 + (hashSeed(pair) % 90000) * 0.5;

  for (let i = 0; i < days; i++) {
    const drift = Math.sin(i / 11) * 800 * (0.5 + rand()) + (rand() - 0.45) * 400;
    const open = price;
    const close = Math.max(100, open + drift);
    const high = Math.max(open, close) + rand() * 500;
    const low = Math.min(open, close) - rand() * 500;
    candles.push({
      time: toTs(i),
      open,
      high,
      low,
      close,
    });
    price = close;
  }

  const markerTimes = [
    { time: candles[Math.floor(days * 0.72)]!.time, signal: "VALUE" },
    { time: candles[Math.floor(days * 0.55)]!.time, signal: "FADE" },
    { time: candles[Math.floor(days * 0.35)]!.time, signal: "DISCOUNT" },
    { time: candles[Math.floor(days * 0.88)]!.time, signal: "OVERHEAT" },
  ];

  return { candles, markerTimes };
}
