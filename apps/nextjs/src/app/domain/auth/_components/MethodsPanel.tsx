export default function MethodsPanel({ methods }: { methods: string[] }) {
  return (
    <div className="rounded-md border border-line">
      <div className="border-b border-line bg-surface-2 px-4 py-2.5">
        <span className="text-[11px] font-semibold uppercase tracking-[0.07em] text-ink-3">
          SDK Methods
        </span>
      </div>
      <div className="flex flex-col gap-[5px] p-3.5">
        {methods.map((m) => (
          <code
            key={m}
            className="block rounded-xs border border-line bg-bg px-2.5 py-[5px] font-mono text-[11px] text-ink-2 overflow-x-auto"
          >
            {m}
          </code>
        ))}
      </div>
    </div>
  );
}
