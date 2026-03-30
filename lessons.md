# Lessons

## lightweight-charts v5 markers

`ISeriesApi` for candlesticks no longer exposes `setMarkers`. Use `createSeriesMarkers(series, markers)` and call `detach()` on the returned plugin in the chart cleanup effect.

## Dashboard layout

Overview widget visibility is client state only (no persistence). **Indicator** and **Liquidation** are separate rooms (chart-only vs heat map). **Positions** is not a nav room: it is a full-width `lg:col-span-3` row at the bottom of the Overview grid, and the same `PositionsWidget` is stacked under **Portfolio** in the Portfolio room.

Product label in the shell header is **VELOR** (temporary monogram SVG in `VelorLogo.tsx`). Short-tier chart markers (FADE, OVERHEAT) share one purple (`SHORT_MARKER_COLOR` in `IndicatorPanel.tsx`).

## lightweight-charts + Webpack / SSR

If you see `__webpack_modules__[moduleId] is not a function` on dev, the chart library was being pulled into the server RSC path. Load the indicator via `next/dynamic(..., { ssr: false })` and a tiny **default-export** loader file (`IndicatorPanelLoader.tsx`) so the module graph does not execute `lightweight-charts` during SSR.

## Landing hero + Spline

`NEXT_PUBLIC_SPLINE_SCENE_URL`: **`scene.splinecode`** → **`@splinetool/react-spline`** (client `dynamic` via `SplineViewerLoader.tsx`); other **https** → **iframe**; `transpilePackages` in `next.config.ts`. **Landing HUD**: 3-col **grid** — **Menu** (opens `LandingNavOverlay.tsx`: Home, Features, How it works, Testimonials, About, Services + Dashboard/Get started), centered **VELOR**, right **Dashboard** + **Get started** only (`max-[360px]:sr-only` on “Menu” label). **Spline** decorative (`pointer-events-none`). Hero bottom fade **to black**. Sections **Features / How it works / Testimonials** use **`bg-black`** (with `.dark` + shadcn tokens). **Features** (`features-10.tsx`): Fear & Greed card = **mock 0–100 gauge**; Smart Alerts = **mock tier rows** (DISCOUNT, VALUE, FADE, EXHAUSTED). **Testimonials**: `twitter-testimonial-cards.tsx` + `.velor-testimonials-fade-in`. **Glow cards**: `spotlight-card.tsx` + `[data-glow]` in `globals.css`. **`cn`**: `lib/utils.ts`. Feature images: `next/image` + Unsplash `remotePatterns`.

## Routes

**`/`** is landing-only (`HeroSection`). **`/dashboard`** renders `DashboardShell`. Menu item **Dashboard** links to `/dashboard`; hero **Get started** goes to the same route.

## Hydration vs browser extensions

Extensions (e.g. **Grammarly**) inject `data-gr-*` attributes on `<body>` before React hydrates, causing a mismatch. `app/layout.tsx` sets **`suppressHydrationWarning`** on `<html>` and `<body>` so those differences are ignored (safe here; not hiding app bugs).

## Dev `ChunkLoadError` (noop-turbopack-hmr)

If the browser shows **Runtime ChunkLoadError** for `_next/static/chunks/...noop-turbopack-hmr...`, stop `next dev`, delete **`.next`** (and optionally **`node_modules/.cache`**), restart dev, then **hard refresh** (Ctrl+Shift+R). Use **`npm run dev:clean`** to wipe `.next` and start dev in one step.
