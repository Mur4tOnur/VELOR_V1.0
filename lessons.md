# Lessons

## lightweight-charts v5 markers

`ISeriesApi` for candlesticks no longer exposes `setMarkers`. Use `createSeriesMarkers(series, markers)` and call `detach()` on the returned plugin in the chart cleanup effect.

## Dashboard layout

Overview widget visibility is client state only (no persistence). Indicator **room** stacks the mock liquidation heat map under the chart to mirror the overview column flow.

## lightweight-charts + Webpack / SSR

If you see `__webpack_modules__[moduleId] is not a function` on dev, the chart library was being pulled into the server RSC path. Load the indicator via `next/dynamic(..., { ssr: false })` and a tiny **default-export** loader file (`IndicatorPanelLoader.tsx`) so the module graph does not execute `lightweight-charts` during SSR.
