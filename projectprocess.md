# VELOR V1.0 - Local Dashboard

## 🎯 Objective
Build a local-first dashboard for VELOR where the core engine (indicator logic) is visualized and usable via localhost.

This is NOT a SaaS yet. No auth, no payments, no subscriptions.

---

## 🧠 Core Philosophy
VELOR is NOT a signal platform.
VELOR is a Market Intelligence Engine.

We show:
- Overextension
- Exhaustion
- Discount zones
- Accumulation zones

We DO NOT say:
- Buy
- Sell

---

## 🧱 V1 FEATURES

### 1. Indicator Panel (MAIN)
- Chart visualization
- Uses VELOR signal logic (EMA + RSI + distance)
- Displays:
  - FADE
  - EXHAUSTION
  - ACCUMULATE
  - DISCOUNT
- Symbol selector (BTCUSDT default)

---

### 2. Fear & Greed Widget
- Big score display
- Simple gauge (can be mocked initially)
- Text:
  - Fear
  - Neutral
  - Greed
  - Extreme

---

### 3. Smart Alerts Feed
- List of latest signals
- Example:
  - BTCUSDT → DISCOUNT
  - ETHUSDT → FADE

---

### 4. Portfolio Risk Panel
- Pie chart
- Mock data initially:
  - BTC 40%
  - ETH 30%
  - USDT 30%

---

## ⚙️ TECH STACK

Frontend:
- Next.js (App Router)
- TailwindCSS
- shadcn/ui

Charts:
- lightweight-charts (TradingView lib)

State:
- React state (simple for now)

---

## 🚫 NOT INCLUDED (YET)
- Auth system
- Payments
- API keys
- Broker integration
- Mobile optimization

---

## 🧭 PHASE PLAN

### Phase 1
Local dashboard UI + mock data + indicator integration

### Phase 2
Real data integration (Binance, Fear & Greed API)

### Phase 3
Alerts + engine API

### Phase 4
SaaS (auth, pricing, plans)

---

## 🧬 CORE ENGINE

Signals:
- FADE 
- OVERHEAT
- DISCOUNT
- VALUE

Formula:
distancePct = ((close - ema) / ema) * 100

Market presets:
- Crypto
- Indices
- Commodities
- Forex

---

## 🎯 END GOAL (V1)
Run:

npm run dev

Open:

http://localhost:3000

See:
- Dashboard
- Indicator working
- Signals visible