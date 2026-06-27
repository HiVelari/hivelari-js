const STATS = [
  { value: '100%', label: 'Type-safe surface' },
  { value: '0 KB', label: 'Shipped to the client' },
  { value: 'Zod', label: 'Validated config' },
  { value: 'ESM', label: 'Pure, tree-shakeable' },
];

export default function Stats() {
  return (
    <section
      className="border-b border-line py-14 max-[768px]:py-10 max-[520px]:py-8"
      aria-label="SDK highlights"
    >
      <div className="container">
        <div
          className="grid grid-cols-4 gap-px overflow-hidden rounded-lg border border-line bg-line max-[768px]:grid-cols-2"
          data-reveal
        >
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="bg-bg px-7 py-8 text-center transition-colors hover:bg-surface max-[520px]:px-[14px] max-[520px]:py-[22px]"
            >
              <div className="mb-2.5 bg-[linear-gradient(135deg,var(--color-ink)_20%,var(--color-accent-light)_120%)] bg-clip-text text-[34px] font-extrabold leading-none tracking-[-0.05em] text-transparent max-[768px]:text-[28px] max-[520px]:text-[26px]">
                {stat.value}
              </div>
              <div className="text-[13px] tracking-[-0.01em] text-ink-2">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
