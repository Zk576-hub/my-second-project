# Macro Desk — Fundamentals Terminal

A macro fundamentals scoring desk for confirming or denying trade setups across
GBP/JPY, AUD/USD, Silver (XAG/USD), BTC/USD, and any custom ticker you add.

**This is an explanatory tool, not a signal generator.**

---

## Stack & Cost

- Next.js 14+ App Router · Vercel free tier
- FRED (free) · CoinGecko (free, no key) · CFTC (free, no key) · GNews (free tier)
- **Total running cost: $0/mo**

---

## Deploy in 5 steps

### 1. Push to GitHub
```bash
git init
git add .
git commit -m "initial"
git remote add origin https://github.com/YOUR_USERNAME/macro-desk.git
git push -u origin main
```

### 2. Import to Vercel
1. vercel.com → Add New → Project → import your repo
2. Leave build settings at defaults (Next.js auto-detected)
3. Deploy (first deploy may fail until keys are added — normal)

### 3. Add environment variables
Vercel → Project → Settings → Environment Variables

| Variable | Source | Cost |
|---|---|---|
| `FRED_API_KEY` | fred.stlouisfed.org/docs/api/api_key.html | Free |
| `GNEWS_API_KEY` | gnews.io | Free (100 req/day) |
| `CFTC_DATASET_ID` | default: `6dca-aqww` | Free |

### 4. Redeploy
Push any commit or click Deployments → Redeploy.

### 5. Verify each data route
```
/api/fred?series=DFII10           → US 10Y real yield
/api/fred?series=IRLTLT01GBM156N  → UK 10Y rate
/api/crypto?ids=bitcoin            → BTC price
/api/news?q=GBPJPY                 → headlines
/api/cot?code=084691               → silver COT
```
Each should return `{ "ok": true, ... }`. Errors include the exact reason.

---

## Local dev
```bash
cp .env.local.example .env.local   # fill in FRED + GNews keys
npm install
npm run dev                         # http://localhost:3000
```

---

## Changing your factor weights
Edit `lib/coreAssets.js`. Weights per asset must sum to 100.

---

## Custom tickers
Tickers you add are auto-classified by rule (FX major/cross, metal, crypto, equity index)
and routed to one of 5 fixed templates in `lib/templates.js`. No weights are invented
per-ticker. Custom asset cards are tagged "Heuristic template" to distinguish them from
your 4 validated core assets.

---

## CFTC COT codes for your assets
| Asset | Code |
|---|---|
| Silver | `084691` |
| British Pound | `096742` |
| Australian Dollar | `232741` |
| Bitcoin (CME) | `133741` |

COT is weekly (Friday release) — not a live stream. The app caches the latest report.
