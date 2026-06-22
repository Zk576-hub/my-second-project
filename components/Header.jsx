export default function Header() {
  return (
    <header className="mb-10 animate-fade-up">
      <div className="flex items-baseline justify-between flex-wrap gap-3 mb-2">
        <h1 className="font-display text-4xl md:text-5xl italic" style={{ color: "var(--text)" }}>
          Macro Desk
        </h1>
        <span
          className="font-mono text-[11px] uppercase tracking-wider px-2 py-1 rounded border"
          style={{ color: "var(--accent)", borderColor: "var(--accent)" }}
        >
          $0/mo · free-tier data
        </span>
      </div>
      <p className="text-sm max-w-xl" style={{ color: "var(--text-muted)" }}>
        A fundamentals scoring desk for confirming or denying a setup you already have.
        Every score below is your own judgment, weighted by a fixed factor framework —
        this is an explanatory tool, not a signal generator.
      </p>
    </header>
  );
}
