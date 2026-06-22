"use client";

import { useState } from "react";

// `sources` is an array of { label, endpoint } — endpoint is a relative
// /api/* path already containing its query string. Fetched on demand
// (button click) so the dashboard never blocks on external calls, and a
// failure on one source never breaks the others.
export default function LiveReference({ sources }) {
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  async function loadAll() {
    setLoading(true);
    const settled = await Promise.all(
      sources.map(async (s) => {
        try {
          const res = await fetch(s.endpoint);
          const json = await res.json();
          return { label: s.label, ...json };
        } catch (err) {
          return { label: s.label, ok: false, reason: "Request failed" };
        }
      })
    );
    setResults(settled);
    setLoading(false);
  }

  return (
    <div className="mt-3 pt-3 border-t" style={{ borderColor: "var(--border-soft)" }}>
      {!results && (
        <button
          onClick={loadAll}
          disabled={loading}
          className="font-mono text-[11px] uppercase tracking-wider px-2.5 py-1.5 rounded border transition-colors"
          style={{
            borderColor: "var(--border)",
            color: loading ? "var(--text-faint)" : "var(--heuristic)",
          }}
        >
          {loading ? "Loading…" : "Load reference data ↗"}
        </button>
      )}

      {results && (
        <div className="space-y-2">
          {results.map((r) => (
            <div key={r.label} className="text-[11px]">
              <div className="font-mono uppercase tracking-wider mb-0.5" style={{ color: "var(--text-faint)" }}>
                {r.label}
              </div>
              {r.ok ? (
                <pre
                  className="font-mono text-[11px] whitespace-pre-wrap break-words p-2 rounded"
                  style={{ background: "var(--bg-grain)", color: "var(--text-muted)" }}
                >
                  {JSON.stringify(r.data ?? r.markets ?? r.observations ?? r.reports ?? r.headlines, null, 1).slice(0, 400)}
                </pre>
              ) : (
                <div style={{ color: "var(--bearish)" }}>
                  Unavailable — {r.reason ?? "no data"}. Use manual entry above.
                </div>
              )}
            </div>
          ))}
          <button
            onClick={loadAll}
            className="font-mono text-[10px] uppercase tracking-wider"
            style={{ color: "var(--text-faint)" }}
          >
            Refresh
          </button>
        </div>
      )}
    </div>
  );
}
