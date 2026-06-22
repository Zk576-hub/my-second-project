// All external calls live here, server-side only. Every function:
//   1. caches via Next's fetch revalidate (free, no extra infra)
//   2. never throws past this layer — returns { ok:false, reason } instead
//      so routes/UI can show "data unavailable" rather than crash.
//
// NOTE: these were written against each provider's documented API shape
// but could not be live-tested from the build sandbox (no external network
// access there). Verify each one against a real response after you deploy
// and add your keys — see README "Post-deploy verification checklist".

const FIFTEEN_MIN = 15 * 60;
const ONE_DAY = 24 * 60 * 60;

async function safeFetchJson(url, options = {}, revalidateSeconds = FIFTEEN_MIN) {
  try {
    const res = await fetch(url, {
      ...options,
      next: { revalidate: revalidateSeconds },
    });
    if (!res.ok) {
      return { ok: false, reason: `Upstream returned ${res.status}` };
    }
    const data = await res.json();
    return { ok: true, data };
  } catch (err) {
    return { ok: false, reason: err?.message ?? "Network error" };
  }
}

// --- FRED (free, requires API key) ---------------------------------------
// Docs: https://fred.stlouisfed.org/docs/api/fred/series_observations.html
export async function fetchFredSeries(seriesId) {
  const apiKey = process.env.FRED_API_KEY;
  if (!apiKey) return { ok: false, reason: "FRED_API_KEY not set" };

  const url = `https://api.stlouisfed.org/fred/series/observations?series_id=${encodeURIComponent(
    seriesId
  )}&api_key=${apiKey}&file_type=json&sort_order=desc&limit=12`;

  const result = await safeFetchJson(url, {}, FIFTEEN_MIN);
  if (!result.ok) return result;

  const obs = result.data?.observations ?? [];
  return { ok: true, observations: obs.map((o) => ({ date: o.date, value: o.value })) };
}

// --- CoinGecko (free, no key) ---------------------------------------------
// Docs: https://www.coingecko.com/en/api/documentation
export async function fetchCoinGeckoMarket(ids = ["bitcoin"]) {
  const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${ids.join(
    ","
  )}&price_change_percentage=24h,7d`;

  const result = await safeFetchJson(url, {}, FIFTEEN_MIN);
  if (!result.ok) return result;

  return { ok: true, markets: result.data };
}

// --- CFTC COT (free, no key, weekly data) ----------------------------------
// Public Socrata dataset. Verify the dataset id is still current after
// deploy — CFTC occasionally republishes datasets under new ids.
// Browse: https://publicreporting.cftc.gov/
export async function fetchCotReport(cftcContractMarketCode) {
  const datasetId = process.env.CFTC_DATASET_ID || "6dca-aqww";
  const url = `https://publicreporting.cftc.gov/resource/${datasetId}.json?cftc_contract_market_code=${encodeURIComponent(
    cftcContractMarketCode
  )}&$order=report_date_as_yyyy_mm_dd DESC&$limit=8`;

  const result = await safeFetchJson(url, {}, ONE_DAY);
  if (!result.ok) return result;

  return { ok: true, reports: result.data };
}

// --- GNews (free tier, works in production unlike NewsAPI free tier) ------
// Docs: https://gnews.io/docs/v4
export async function fetchNewsHeadlines(query) {
  const apiKey = process.env.GNEWS_API_KEY;
  if (!apiKey) return { ok: false, reason: "GNEWS_API_KEY not set" };

  const url = `https://gnews.io/api/v4/search?q=${encodeURIComponent(
    query
  )}&lang=en&max=8&apikey=${apiKey}`;

  const result = await safeFetchJson(url, {}, FIFTEEN_MIN);
  if (!result.ok) return result;

  const articles = result.data?.articles ?? [];
  return {
    ok: true,
    headlines: articles.map((a) => ({ title: a.title, source: a.source?.name, url: a.url, publishedAt: a.publishedAt })),
  };
}
