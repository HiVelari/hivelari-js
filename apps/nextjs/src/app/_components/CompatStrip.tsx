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
    <div className="marquee overflow-hidden border-y border-line bg-[radial-gradient(ellipse_60%_100%_at_50%_50%,rgba(124,106,246,0.04),transparent_70%)] py-[22px]">
      <div className="marquee-track flex w-max animate-marquee items-center gap-9 whitespace-nowrap">
        {doubled.map((item, i) => (
          <span
            key={`${i}-${item}`}
            className="flex items-center gap-[9px] text-[13px] font-medium tracking-[-0.01em] text-ink-3"
          >
            {i > 0 && <span className="size-[3px] rounded-full bg-ink-3" />}
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
