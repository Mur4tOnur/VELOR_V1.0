/** Four asset modes (aligned with bptrade_indicator.pine). */
export const MARKETS = ["Cryptocurrency", "Indices", "Commodities", "Forex"] as const;
export type Market = (typeof MARKETS)[number];

export const PAIRS_BY_MARKET: Record<Market, readonly string[]> = {
  Cryptocurrency: ["BTCUSDT", "ETHUSDT", "SOLUSDT", "BNBUSDT"],
  Indices: ["US500", "NAS100", "DE40", "UK100"],
  Commodities: ["XAUUSD", "XAGUSD", "WTI", "NATGAS"],
  Forex: ["EURUSD", "GBPUSD", "USDJPY", "AUDUSD"],
};

export function defaultPair(market: Market): string {
  return PAIRS_BY_MARKET[market][0]!;
}
