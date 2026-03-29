# VELOR — Local dashboard

Local-first **market intelligence** UI (not a signal or buy/sell product). See `projectprocess.md` for scope and phases.

## Setup

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Stack

- **Next.js** (App Router) + **TypeScript** + **Tailwind CSS**
- **lightweight-charts** for the indicator candlestick panel

## Layout

| Area | Role |
|------|------|
| Indicator panel | Mock OHLC + markers (VALUE, DISCOUNT, FADE, OVERHEAT) |
| Fear & Greed | Mock score and label |
| Smart alerts | Sample feed |
| Portfolio | Mock pie (BTC / ETH / USDT) |

UI labels map to Pine tiers via `lib/signals.ts` (VALUE↔Discount, DISCOUNT↔Value, FADE, OVERHEAT).

Layout: left **Rooms** nav, top HUD + **VELOR** logo at the corner; **Overview** supports hiding widgets; indicator + mock **liquidation heat map** (per market/pair); Fear & Greed has a **per-market** mock score.

## Phase 1 scope

No authentication, payments, or external APIs — UI and mock data only.
