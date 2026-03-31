# Lessons

## Landing intro overlay (`VelorIntro.tsx`)

Full-viewport intro sits above the landing (`z-[110]` > `LandingNavOverlay` `z-[100]`). **sessionStorage** key **`velor_intro_completed`** (`1`) skips intro for the rest of the browser session. **Hold-to-continue** uses **pointer capture** + **requestAnimationFrame** progress (~1.2–1.8s random per mount). **Escape** is **preventDefault** only (no dismiss). **AnimatePresence** drives exit (opacity + blur + scale); **`useLayoutEffect`** reads storage before paint to avoid a long wrong-state flash. **`prefers-reduced-motion`**: `useReducedMotion()` shortens exit and skips WebGL — static radial gradient only.

Background (normal motion): **`components/ui/shader-lines.tsx`** — **Three.js r89** from CDN (`Intro_Animation.md` line shader), single script tag (`data-velor-three-shader`), **`ensureThreeLoaded`** polls until `THREE.WebGLRenderer` exists (fixes stuck promise when `load` already fired from cache), **pixel ratio ≤ 2**, init + **`render`** in **try/catch** (avoids crash on lost context). **`VelorIntro`**: `pageshow` + **`persisted`** bumps **`shaderBootId`** so **ShaderAnimation** remounts after **bfcache**. Intro **sessionStorage** is set **only** after hold completes — refresh before that shows intro again.

## lightweight-charts v5 markers

`ISeriesApi` for candlesticks no longer exposes `setMarkers`. Use `createSeriesMarkers(series, markers)` and call `detach()` on the returned plugin in the chart cleanup effect.

## Dashboard layout

Overview widget visibility is client state only (no persistence). **Indicator** and **Liquidation** are separate rooms (chart-only vs heat map). **Positions** is not a nav room: it is a full-width `lg:col-span-3` row at the bottom of the Overview grid, and the same `PositionsWidget` is stacked under **Portfolio** in the Portfolio room.

Product label in the shell header is **VELOR** (temporary monogram SVG in `VelorLogo.tsx`). Short-tier chart markers (FADE, OVERHEAT) share one purple (`SHORT_MARKER_COLOR` in `IndicatorPanel.tsx`).

## lightweight-charts + Webpack / SSR

If you see `__webpack_modules__[moduleId] is not a function` on dev, the chart library was being pulled into the server RSC path. Load the indicator via `next/dynamic(..., { ssr: false })` and a tiny **default-export** loader file (`IndicatorPanelLoader.tsx`) so the module graph does not execute `lightweight-charts` during SSR.

## Landing hero + Spline

`NEXT_PUBLIC_SPLINE_SCENE_URL`: **`scene.splinecode`** → **`@splinetool/react-spline`** (client `dynamic` via `SplineViewerLoader.tsx`); other **https** → **iframe**; `transpilePackages` in `next.config.ts`. **Landing HUD** (`LandingHud.tsx`): **`fixed` top bar** (`z-[70]`, blur) — reusable on other pages; **`variant="static"`** for in-flow layout. Top spacing for content: **`LANDING_HUD_TOP_PADDING_CLASS`** in `lib/landing-hud-layout.ts` (also re-exported from `LandingHud`). 3-col **grid** — **Menu** (opens `LandingNavOverlay.tsx`: Home, Features, How it works, Testimonials, **Pricing**, **FAQ**, **Get started** (`#final-cta`), **Footer** (`#footer`) + Dashboard/Get started), centered **VELOR**, right **Dashboard** + **Get started** only (`max-[360px]:sr-only` on “Menu” label). **Spline** decorative (`pointer-events-none`). Hero bottom fade **to black**. Sections **Features / How it works / Testimonials / Pricing / FAQ / Final CTA** use **`bg-black`**; **Footer** (`footer-section.tsx`, `#footer`) uses rounded inner panel + `hover-footer.tsx` (`TextHoverEffect` without **motion** — SVG SMIL + gradient mask). **lucide-react@1.7** has no Facebook/Instagram/Twitter/Dribbble exports; footer social row uses **Share2 / MessageCircle / Link2 / Globe** as placeholders until upgrade or custom SVGs. (with `.dark` + shadcn tokens). **Features** (`features-10.tsx`): Fear & Greed card = **mock 0–100 gauge**; Smart Alerts = **mock tier rows** (DISCOUNT, VALUE, FADE, EXHAUSTED). **Testimonials**: `twitter-testimonial-cards.tsx` + `.velor-testimonials-fade-in`. **FAQ** (after pricing): `components/ui/faq-section.tsx` (`FAQWithSpiral`) — spiral SVG via `ResizeObserver`, accordion items, search filter; block wrapper `components/blocks/faq-section.tsx` (`#faq`). Dev-only spiral control panel / global **H**/**R** shortcuts from the spec were omitted so search and typing are not hijacked. **Final CTA** (after FAQ): `components/ui/call-to-action-cta.tsx` (`CtaCard`) + `input.tsx`; `next/image` + Unsplash; no **framer-motion** (CSS `velor-cta-fade-item` in `globals.css` instead). Block `final-cta-section.tsx` — `#final-cta`, `titleId` on card heading for `aria-labelledby`. **Glow cards**: `spotlight-card.tsx` + `[data-glow]` in `globals.css`. **`cn`**: `lib/utils.ts`. Feature images: `next/image` + Unsplash `remotePatterns`.

## Routes

**`/`** is landing-only (`HeroSection`). **`/login`** / **`/signup`** — mock auth UI (`sign-in-card-2` / `sign-up-card-2`, Framer glass card + `AuthBackdrop`). **`/dashboard`** is gated by **`RequireAuth`** (redirect to `/login` if no `velor_session` in `localStorage`); **`DashboardShell`** header: **Home** → `/`, **Log out** clears session → `/`. **`/forgot-password`** — placeholder copy (no real reset; mock auth only).

**`AuthProvider`** (`components/auth/AuthProvider.tsx`): session + **`velor_users`** in `localStorage`; cross-tab sync via **`storage`** event. **Landing HUD / overlay**: logged out → **Login** + **Get started** (`/signup`), no **Dashboard**; logged in → user name + **Dashboard** + **Log out**. **`RedirectIfAuthed`** sends logged-in users away from `/login` and `/signup` to **`/dashboard`**.

## Hydration vs browser extensions

Extensions (e.g. **Grammarly**) inject `data-gr-*` attributes on `<body>` before React hydrates, causing a mismatch. `app/layout.tsx` sets **`suppressHydrationWarning`** on `<html>` and `<body>` so those differences are ignored (safe here; not hiding app bugs).

## Dev `ChunkLoadError` (noop-turbopack-hmr)

If the browser shows **Runtime ChunkLoadError** for `_next/static/chunks/...noop-turbopack-hmr...`, stop `next dev`, delete **`.next`** (and optionally **`node_modules/.cache`**), restart dev, then **hard refresh** (Ctrl+Shift+R). Use **`npm run dev:clean`** to wipe `.next` and start dev in one step.
