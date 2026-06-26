const ITEMS = [
  'Next.js App Router',
  'React Server Components',
  'TypeScript',
  'Server Actions',
  'Route Handlers',
  'Node.js',
  'Zod validated',
  'Zero client leakage',
];

export default function CompatStrip() {
  const doubled = [...ITEMS, ...ITEMS];

  return (
    <div className="compat-strip">
      <div className="compat-inner">
        {doubled.map((item, i) => (
          <span key={i} className="compat-item">
            {i > 0 && <span className="compat-dot" />}
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
