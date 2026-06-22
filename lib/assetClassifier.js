// Rule-based asset class detection for custom tickers.
// Deliberately NOT an AI call — a ticker either matches a known pattern
// or it doesn't. If it doesn't match anything, we say so instead of
// guessing, and the UI asks the user to pick a class manually.

const FX_CURRENCIES = [
  "USD", "EUR", "GBP", "JPY", "AUD", "NZD", "CAD", "CHF", "CNH", "SEK", "NOK",
  "MXN", "ZAR", "SGD", "HKD", "TRY", "PLN", "DKK",
];

const METALS = ["XAU", "XAG", "XPT", "XPD"];

const KNOWN_CRYPTO = [
  "BTC", "ETH", "SOL", "XRP", "ADA", "DOGE", "AVAX", "LINK", "DOT", "LTC",
  "BCH", "MATIC", "ATOM", "UNI", "TRX",
];

const KNOWN_INDICES = [
  "SPX", "SPY", "NDX", "QQQ", "DJI", "DAX", "FTSE", "NIKKEI", "N225",
];

const USD_MAJORS = new Set(["EURUSD", "GBPUSD", "AUDUSD", "NZDUSD", "USDJPY", "USDCAD", "USDCHF"]);

/**
 * @param {string} rawTicker e.g. "GBPJPY", "ETHUSD", "XAGUSD", "SPX"
 * @returns {{ assetClass: string, confidence: "high"|"low", reason: string } | null}
 */
export function classifyTicker(rawTicker) {
  const ticker = rawTicker.trim().toUpperCase().replace(/[\/\-_]/g, "");

  if (METALS.some((m) => ticker.startsWith(m))) {
    return { assetClass: "metal", confidence: "high", reason: `Matches precious metal code` };
  }

  if (KNOWN_CRYPTO.some((c) => ticker.startsWith(c))) {
    return { assetClass: "crypto", confidence: "high", reason: `Matches known crypto asset` };
  }

  if (KNOWN_INDICES.some((i) => ticker.includes(i))) {
    return { assetClass: "equity_index", confidence: "high", reason: `Matches known equity index` };
  }

  if (ticker.length === 6) {
    const base = ticker.slice(0, 3);
    const quote = ticker.slice(3, 6);
    const bothFx = FX_CURRENCIES.includes(base) && FX_CURRENCIES.includes(quote);
    if (bothFx) {
      if (USD_MAJORS.has(ticker)) {
        return { assetClass: "fx_major", confidence: "high", reason: "USD major pair" };
      }
      return { assetClass: "fx_cross", confidence: "high", reason: "Currency cross, no USD leg or non-major USD pair" };
    }
  }

  return null; // unrecognized — UI must ask the user to pick a class manually
}
