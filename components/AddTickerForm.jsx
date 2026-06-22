"use client";

import { useState } from "react";
import { classifyTicker } from "@/lib/assetClassifier";
import { ASSET_CLASS_TEMPLATES } from "@/lib/templates";

export default function AddTickerForm({ onAdd }) {
  const [input, setInput] = useState("");
  const [pendingTicker, setPendingTicker] = useState(null); // ticker awaiting manual class pick
  const [error, setError] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    const ticker = input.trim().toUpperCase();
    if (!ticker) return;

    const result = classifyTicker(ticker);
    if (result) {
      onAdd(ticker, result.assetClass);
      setInput("");
    } else {
      setPendingTicker(ticker);
    }
  }

  function confirmManualClass(assetClass) {
    onAdd(pendingTicker, assetClass);
    setPendingTicker(null);
    setInput("");
  }

  return (
    <div
      className="rounded-xl border p-5 mb-8 animate-fade-up"
      style={{ background: "var(--surface)", borderColor: "var(--border)" }}
    >
      <h2 className="font-display text-lg mb-3" style={{ color: "var(--text)" }}>
        Add a custom ticker
      </h2>

      {!pendingTicker ? (
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="e.g. EURJPY, ETHUSD, NZDUSD"
            className="flex-1 font-mono text-sm px-3 py-2 rounded border outline-none"
            style={{ background: "var(--bg-grain)", borderColor: "var(--border)", color: "var(--text)" }}
          />
          <button
            type="submit"
            className="font-mono text-xs uppercase tracking-wider px-4 py-2 rounded"
            style={{ background: "var(--accent)", color: "var(--bg)" }}
          >
            Add
          </button>
        </form>
      ) : (
        <div>
          <p className="text-sm mb-3" style={{ color: "var(--text-muted)" }}>
            Couldn&apos;t auto-classify <span className="font-mono">{pendingTicker}</span>. Pick the
            closest asset class — it routes to that template, nothing gets invented per-ticker.
          </p>
          <div className="flex flex-wrap gap-2">
            {Object.entries(ASSET_CLASS_TEMPLATES).map(([key, tpl]) => (
              <button
                key={key}
                onClick={() => confirmManualClass(key)}
                className="font-mono text-[11px] px-2.5 py-1.5 rounded border"
                style={{ borderColor: "var(--border)", color: "var(--heuristic)" }}
              >
                {tpl.label}
              </button>
            ))}
            <button
              onClick={() => setPendingTicker(null)}
              className="font-mono text-[11px] px-2.5 py-1.5"
              style={{ color: "var(--text-faint)" }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {error && (
        <p className="text-xs mt-2" style={{ color: "var(--bearish)" }}>
          {error}
        </p>
      )}
    </div>
  );
}
