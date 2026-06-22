"use client";

import { useState } from "react";
import FactorRow from "./FactorRow";
import ScoreBar from "./ScoreBar";
import LiveReference from "./LiveReference";
import { computeCompositeScore, scoreLabel } from "@/lib/scoring";

const TAG_STYLE = {
  core: { text: "Core framework", color: "var(--accent)", bg: "var(--accent-soft)" },
  heuristic: { text: "Heuristic template", color: "var(--heuristic)", bg: "#7c9ee822" },
};

export default function AssetCard({ ticker, label, factors, tag, liveSources = [], onRemove, delay = 0 }) {
  const [scores, setScores] = useState({});

  function handleChange(key, value) {
    setScores((prev) => ({ ...prev, [key]: value }));
  }

  const { composite, coverage } = computeCompositeScore(factors, scores);
  const label_ = scoreLabel(composite);
  const tagStyle = TAG_STYLE[tag];

  return (
    <div
      className="rounded-xl border p-5 animate-fade-up"
      style={{ background: "var(--surface)", borderColor: "var(--border)", animationDelay: `${delay}ms` }}
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-display text-xl" style={{ color: "var(--text)" }}>
            {label}
          </h3>
          <span
            className="inline-block mt-1.5 font-mono text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded"
            style={{ color: tagStyle.color, background: tagStyle.bg }}
          >
            {tagStyle.text}
          </span>
        </div>
        {onRemove && (
          <button
            onClick={() => onRemove(ticker)}
            className="font-mono text-[11px]"
            style={{ color: "var(--text-faint)" }}
            aria-label={`Remove ${label}`}
          >
            ✕
          </button>
        )}
      </div>

      <ScoreBar composite={composite} coverage={coverage} label={label_} />

      <div className="mt-4">
        {factors.map((f) => (
          <FactorRow key={f.key} factor={f} value={scores[f.key]} onChange={handleChange} />
        ))}
      </div>

      {liveSources.length > 0 && <LiveReference sources={liveSources} />}
    </div>
  );
}
