// Core 4 assets — FIXED framework, not regenerated per request.
// These weights are defaults you set once and edit deliberately, not
// numbers an AI invents per ticker. They are NOT backtested truth —
// treat as a starting framework you adjust as your own conviction changes.
// Edit this file directly to change your framework. The UI surfaces these
// as "Core framework" (vs "Heuristic template" for custom tickers).

export const CORE_ASSETS = {
  GBPJPY: {
    label: "GBP/JPY",
    assetClass: "fx_cross",
    factors: [
      { key: "rate_differential", name: "BoE vs BoJ rate differential", weight: 25 },
      { key: "labor_data", name: "UK labour market data", weight: 20 },
      { key: "inflation", name: "UK vs Japan inflation", weight: 20 },
      { key: "central_bank_policy", name: "Central bank policy divergence", weight: 20 },
      { key: "sentiment", name: "Risk sentiment / carry appetite", weight: 10 },
      { key: "liquidity", name: "Global liquidity conditions", weight: 5 },
    ],
  },
  AUDUSD: {
    label: "AUD/USD",
    assetClass: "fx_major",
    factors: [
      { key: "china_growth", name: "Chinese growth conditions", weight: 25 },
      { key: "commodity_trend", name: "Commodity price trend", weight: 20 },
      { key: "rate_differential", name: "RBA vs Fed rate differential", weight: 20 },
      { key: "inflation", name: "AU vs US inflation", weight: 15 },
      { key: "risk_sentiment", name: "Global risk sentiment", weight: 15 },
      { key: "positioning", name: "Speculative positioning (COT)", weight: 5 },
    ],
  },
  XAGUSD: {
    label: "Silver (XAG/USD)",
    assetClass: "metal",
    factors: [
      { key: "real_yields", name: "US real yields", weight: 30 },
      { key: "inflation_expectations", name: "Inflation expectations", weight: 20 },
      { key: "dxy", name: "DXY / dollar strength", weight: 20 },
      { key: "industrial_demand", name: "Industrial demand", weight: 10 },
      { key: "safe_haven", name: "Safe-haven flow", weight: 10 },
      { key: "liquidity", name: "Global liquidity conditions", weight: 10 },
    ],
  },
  BTCUSD: {
    label: "Bitcoin (BTC/USD)",
    assetClass: "crypto",
    factors: [
      { key: "liquidity", name: "Global liquidity conditions", weight: 30 },
      { key: "real_yields", name: "US real yields", weight: 20 },
      { key: "etf_flows", name: "Spot ETF flow direction", weight: 20 },
      { key: "dxy", name: "DXY / dollar strength", weight: 15 },
      { key: "sentiment", name: "Risk sentiment", weight: 10 },
      { key: "positioning", name: "Futures positioning", weight: 5 },
    ],
  },
};

export function getCoreAsset(ticker) {
  return CORE_ASSETS[ticker.toUpperCase()] ?? null;
}

export function listCoreTickers() {
  return Object.keys(CORE_ASSETS);
}
