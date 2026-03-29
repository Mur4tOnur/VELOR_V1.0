# Lessons

## lightweight-charts v5 markers

`ISeriesApi` for candlesticks no longer exposes `setMarkers`. Use `createSeriesMarkers(series, markers)` and call `detach()` on the returned plugin in the chart cleanup effect.

## Dashboard layout

Overview widget visibility is client state only (no persistence). **Indicator** and **Liquidation** are separate rooms (chart-only vs heat map). **Positions** is not a nav room: it is a full-width `lg:col-span-3` row at the bottom of the Overview grid, and the same `PositionsWidget` is stacked under **Portfolio** in the Portfolio room.

Product label in the shell header is **VELOR** (temporary monogram SVG in `VelorLogo.tsx`). Short-tier chart markers (FADE, OVERHEAT) share one purple (`SHORT_MARKER_COLOR` in `IndicatorPanel.tsx`).

## lightweight-charts + Webpack / SSR

If you see `__webpack_modules__[moduleId] is not a function` on dev, the chart library was being pulled into the server RSC path. Load the indicator via `next/dynamic(..., { ssr: false })` and a tiny **default-export** loader file (`IndicatorPanelLoader.tsx`) so the module graph does not execute `lightweight-charts` during SSR.
