const STATS = [
  { value: "100%", label: "Type-safe surface" },
  { value: "0 KB", label: "Shipped to the client" },
  { value: "Zod", label: "Validated config" },
  { value: "ESM", label: "Pure, tree-shakeable" },
];

export default function Stats() {
  return (
    <section className="stats" aria-label="SDK highlights">
      <div className="section-inner">
        <div className="stats-grid" data-reveal>
          {STATS.map((stat) => (
            <div key={stat.label} className="stat">
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
