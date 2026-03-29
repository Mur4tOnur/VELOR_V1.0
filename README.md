# VELOR — Local dashboard

Local-first **market intelligence** UI (not a signal or buy/sell product). See `projectprocess.md` for scope and phases.

## Setup

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) for the dashboard.

## Stack

- **Next.js** (App Router) + **TypeScript** + **Tailwind CSS**
- **lightweight-charts** for the indicator candlestick panel

## Layout

| Area | Role |
|------|------|
| Indicator panel | Mock OHLC + markers (VALUE, DISCOUNT, FADE, OVERHEAT) |
| Fear & Greed | Mock score and label |
| Smart alerts | Sample feed |
| Portfolio | Mock allocation pie + book stats |
| Positions | Mock positions table (Overview: full-width bottom row; Portfolio room: stacked under allocation) |

UI labels map to Pine tiers via `lib/signals.ts` (VALUE↔Discount, DISCOUNT↔Value, FADE, OVERHEAT).

Layout: responsive **Rooms** nav (row on small screens, column on `md+`), fixed-width left HUD on desktop; **Overview** supports hiding widgets; **Indicator** room is chart-only; **Liquidation** room holds the heat map; **Positions** is its own Overview widget (bottom row, full width) and has a dedicated room.

## Phase 1 scope

No authentication, payments, or external APIs — UI and mock data only.
