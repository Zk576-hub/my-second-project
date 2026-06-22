"use client";

import { useState } from "react";
import Header from "@/components/Header";
import AssetCard from "@/components/AssetCard";
import AddTickerForm from "@/components/AddTickerForm";
import { CORE_ASSETS, listCoreTickers } from "@/lib/coreAssets";
import { getTemplate } from "@/lib/templates";

const CORE_LIVE_SOURCES = {
  GBPJPY: [
    { label: "UK 10Y rate (FRED)", endpoint: "/api/fred?series=IRLTLT01GBM156N" },
    { label: "Japan 10Y rate (FRED)", endpoint: "/api/fred?series=IRLTLT01JPM156N" },
    { label: "Headlines", endpoint: "/api/news?q=GBPJPY" },
  ],
  AUDUSD: [
    { label: "Australia 10Y rate (FRED)", endpoint: "/api/fred?series=IRLTLT01AUM156N" },
    { label: "Headlines", endpoint: "/api/news?q=AUDUSD" },
  ],
  XAGUSD: [
    { label: "US 10Y real yield (FRED)", endpoint: "/api/fred?series=DFII10" },
    { label: "Headlines", endpoint: "/api/news?q=silver+price" },
  ],
  BTCUSD: [
    { label: "BTC market data (CoinGecko)", endpoint: "/api/crypto?ids=bitcoin" },
    { label: "US 10Y real yield (FRED)", endpoint: "/api/fred?series=DFII10" },
    { label: "Headlines", endpoint: "/api/news?q=bitcoin+ETF+flows" },
  ],
};

export default function Home() {
  const [customAssets, setCustomAssets] = useState([]); // [{ ticker, assetClass }]

  function handleAddTicker(ticker, assetClass) {
    setCustomAssets((prev) => {
      if (prev.some((a) => a.ticker === ticker)) return prev;
      return [...prev, { ticker, assetClass }];
    });
  }

  function handleRemove(ticker) {
    setCustomAssets((prev) => prev.filter((a) => a.ticker !== ticker));
  }

  return (
    <main className="max-w-3xl mx-auto px-5 py-12 md:py-16">
      <Header />

      <AddTickerForm onAdd={handleAddTicker} />

      <div className="space-y-5">
        {listCoreTickers().map((ticker, i) => {
          const asset = CORE_ASSETS[ticker];
          return (
            <AssetCard
              key={ticker}
              ticker={ticker}
              label={asset.label}
              factors={asset.factors}
              tag="core"
              liveSources={CORE_LIVE_SOURCES[ticker] ?? []}
              delay={i * 60}
            />
          );
        })}

        {customAssets.map((a, i) => {
          const template = getTemplate(a.assetClass);
          if (!template) return null;
          return (
            <AssetCard
              key={a.ticker}
              ticker={a.ticker}
              label={a.ticker}
              factors={template.factors}
              tag="heuristic"
              liveSources={[{ label: "Headlines", endpoint: `/api/news?q=${encodeURIComponent(a.ticker)}` }]}
              onRemove={handleRemove}
              delay={(listCoreTickers().length + i) * 60}
            />
          );
        })}
      </div>

      <footer className="mt-14 pt-6 border-t text-center" style={{ borderColor: "var(--border-soft)" }}>
        <p className="font-mono text-[11px]" style={{ color: "var(--text-faint)" }}>
          Scores are your own judgment, not predictions. Verify live data sources after deploy.
        </p>
      </footer>
    </main>
  );
}
