"use client";

const TONE_COLOR = {
  bullish: "var(--bullish)",
  bearish: "var(--bearish)",
  neutral: "var(--neutral)",
};

export default function ScoreBar({ composite, coverage, label }) {
  const pct = composite ?? 50;
  const color = TONE_COLOR[label.tone];

  return (
    <div className="w-full">
      <div className="flex items-baseline justify-between mb-1.5">
        <span
          className="font-mono text-2xl font-bold tabular-nums"
          style={{ color }}
        >
          {composite === null ? "—" : composite}
        </span>
        <span className="font-mono text-[11px] uppercase tracking-wider" style={{ color }}>
          {label.text}
        </span>
      </div>
      <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "var(--border)" }}>
        <div
          className="h-full rounded-full transition-all duration-700 ease-out"
          style={{ width: `${pct}%`, background: color }}
        />
      </div>
      <div className="mt-1 font-mono text-[10px]" style={{ color: "var(--text-faint)" }}>
        {coverage}% of factors scored
      </div>
    </div>
  );
}
