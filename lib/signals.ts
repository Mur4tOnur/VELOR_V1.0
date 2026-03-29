/**
 * UI signal names (Pine: Value, Discount, Fade, Overheat).
 * VALUE ↔ Discount tier, DISCOUNT ↔ Value tier, FADE ↔ Fade, OVERHEAT ↔ Overheat.
 */
export type VelorSignal = "VALUE" | "DISCOUNT" | "FADE" | "OVERHEAT";

export const SIGNAL_META: Record<
  VelorSignal,
  { label: string; tone: "long" | "short"; pine: string }
> = {
  VALUE: { label: "Value zone", tone: "long", pine: "Discount" },
  DISCOUNT: { label: "Discount / deep context", tone: "long", pine: "Value" },
  FADE: { label: "Fade / overextension", tone: "short", pine: "Fade" },
  OVERHEAT: { label: "Overheat", tone: "short", pine: "Overheat" },
};

export type AlertRow = {
  id: string;
  symbol: string;
  signal: VelorSignal;
  time: string;
};

export const SAMPLE_ALERTS: AlertRow[] = [
  { id: "1", symbol: "BTCUSDT", signal: "VALUE", time: "2026-03-29 14:02" },
  { id: "2", symbol: "ETHUSDT", signal: "FADE", time: "2026-03-29 11:40" },
  { id: "3", symbol: "BTCUSDT", signal: "DISCOUNT", time: "2026-03-28 09:15" },
  { id: "4", symbol: "SOLUSDT", signal: "OVERHEAT", time: "2026-03-27 18:00" },
];
