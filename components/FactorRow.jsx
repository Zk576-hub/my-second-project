"use client";

export default function FactorRow({ factor, value, onChange }) {
  const hasValue = typeof value === "number";

  return (
    <div className="py-2.5 border-b last:border-b-0" style={{ borderColor: "var(--border-soft)" }}>
      <div className="flex items-center justify-between gap-3 mb-1.5">
        <span className="text-[13px]" style={{ color: "var(--text)" }}>
          {factor.name}
        </span>
        <div className="flex items-center gap-2 shrink-0">
          <span
            className="font-mono text-[10px] px-1.5 py-0.5 rounded"
            style={{ background: "var(--surface-raised)", color: "var(--text-faint)" }}
          >
            {factor.weight}%
          </span>
          <span
            className="font-mono text-xs w-7 text-right tabular-nums"
            style={{ color: hasValue ? "var(--accent)" : "var(--text-faint)" }}
          >
            {hasValue ? value : "–"}
          </span>
        </div>
      </div>
      <input
        type="range"
        min={0}
        max={100}
        value={value ?? 50}
        onChange={(e) => onChange(factor.key, Number(e.target.value))}
        className="w-full"
        style={{ opacity: hasValue ? 1 : 0.4 }}
      />
    </div>
  );
}
