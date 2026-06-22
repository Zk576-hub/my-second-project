// Templates for custom (non-core) tickers. A ticker's asset class routes
// it into ONE of these five fixed templates — the weights are NOT
// regenerated per ticker. This is the guardrail: flexibility without
// fabricated precision. Every score built from these carries a
// "Heuristic template" tag in the UI, distinct from the Core framework.

export const ASSET_CLASS_TEMPLATES = {
  fx_major: {
    label: "FX Major",
    factors: [
      { key: "rate_differential", name: "Policy rate differential", weight: 25 },
      { key: "inflation_differential", name: "Inflation differential", weight: 20 },
      { key: "growth_differential", name: "Growth / GDP differential", weight: 20 },
      { key: "risk_sentiment", name: "Risk sentiment", weight: 20 },
      { key: "positioning", name: "Speculative positioning (COT)", weight: 15 },
    ],
  },
  fx_cross: {
    label: "FX Cross",
    factors: [
      { key: "rate_differential", name: "Policy rate differential", weight: 20 },
      { key: "carry_dynamics", name: "Carry trade dynamics", weight: 20 },
      { key: "inflation_differential", name: "Inflation differential", weight: 15 },
      { key: "growth_differential", name: "Growth differential", weight: 15 },
      { key: "risk_sentiment", name: "Risk sentiment", weight: 20 },
      { key: "positioning", name: "Speculative positioning (COT)", weight: 10 },
    ],
  },
  metal: {
    label: "Precious Metal",
    factors: [
      { key: "real_yields", name: "Real yields", weight: 25 },
      { key: "dxy", name: "DXY / dollar strength", weight: 20 },
      { key: "inflation_expectations", name: "Inflation expectations", weight: 15 },
      { key: "industrial_demand", name: "Industrial demand", weight: 15 },
      { key: "safe_haven", name: "Safe-haven flow", weight: 15 },
      { key: "liquidity", name: "Global liquidity conditions", weight: 10 },
    ],
  },
  crypto: {
    label: "Cryptocurrency",
    factors: [
      { key: "liquidity", name: "Global liquidity conditions", weight: 25 },
      { key: "real_yields", name: "Real yields", weight: 20 },
      { key: "etf_flows", name: "ETF / fund flow direction", weight: 15 },
      { key: "dxy", name: "DXY / dollar strength", weight: 15 },
      { key: "sentiment", name: "Risk sentiment", weight: 15 },
      { key: "regulatory", name: "Regulatory headline risk", weight: 10 },
    ],
  },
  equity_index: {
    label: "Equity Index",
    factors: [
      { key: "rate_expectations", name: "Rate expectation path", weight: 25 },
      { key: "earnings_proximity", name: "Earnings season proximity", weight: 15 },
      { key: "risk_sentiment", name: "Risk sentiment", weight: 25 },
      { key: "sector_rotation", name: "Sector rotation signal", weight: 15 },
      { key: "liquidity", name: "Liquidity conditions", weight: 20 },
    ],
  },
};

export function getTemplate(assetClass) {
  return ASSET_CLASS_TEMPLATES[assetClass] ?? null;
}
