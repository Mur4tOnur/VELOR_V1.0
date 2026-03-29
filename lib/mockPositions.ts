export type MockPosition = {
  id: string;
  broker: string;
  platform?: string;
  account?: string;
  symbol: string;
  side: "Long" | "Short";
  entry: string;
  size: string;
  notional?: string;
  opened: string;
};

/** Demo rows only — not connected to any broker API. */
export const MOCK_POSITIONS: MockPosition[] = [
  {
    id: "1",
    broker: "Binance",
    platform: "Futures USDT-M",
    symbol: "BTCUSDT",
    side: "Long",
    entry: "64,200",
    size: "0.15 BTC",
    notional: "~$9.6k",
    opened: "2026-03-26",
  },
  {
    id: "2",
    broker: "Binance",
    platform: "Spot",
    symbol: "ETHUSDT",
    side: "Long",
    entry: "3,180",
    size: "4.2 ETH",
    notional: "~$13.4k",
    opened: "2026-03-22",
  },
  {
    id: "3",
    broker: "MetaTrader 5",
    platform: "FundingPips",
    account: "Challenge — NAS100",
    symbol: "US100 / NASDAQ",
    side: "Short",
    entry: "19,540",
    size: "2.0 lots",
    notional: "—",
    opened: "2026-03-28",
  },
  {
    id: "4",
    broker: "MetaTrader 5",
    platform: "IC Markets",
    account: "Live",
    symbol: "XAUUSD",
    side: "Long",
    entry: "3,012.5",
    size: "0.5 lots",
    notional: "—",
    opened: "2026-03-27",
  },
  {
    id: "5",
    broker: "Bybit",
    platform: "Linear perp",
    symbol: "SOLUSDT",
    side: "Long",
    entry: "142.30",
    size: "120 SOL",
    notional: "~$17.1k",
    opened: "2026-03-29",
  },
];
