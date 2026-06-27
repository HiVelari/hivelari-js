const FEATURES = [
  {
    icon: (
      <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="8" rx="2" /><rect x="2" y="14" width="20" height="8" rx="2" />
        <line x1="6" y1="6" x2="6.01" y2="6" /><line x1="6" y1="18" x2="6.01" y2="18" />
      </svg>
    ),
    title: 'Server-only',
    desc: (
      <>
        Imports <code>server-only</code> to ensure your credentials never reach
        the client bundle. Violations fail at build time.
      </>
    ),
  },
  {
    icon: (
      <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    title: 'Fully typed',
    desc: 'Every request parameter, response shape, and error variant is typed with TypeScript generics. No casting.',
  },
  {
    icon: (
      <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: 'Zod validated',
    desc: 'Environment variables are validated with Zod on startup. You get a clear error if config is missing, not a cryptic runtime failure.',
  },
  {
    icon: (
      <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
        <polyline points="13 2 13 9 20 9" />
      </svg>
    ),
    title: 'App Router native',
    desc: 'Designed for Server Actions, RSCs, and Route Handlers. No client-side adapters or context providers needed.',
  },
  {
    icon: (
      <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    title: 'Fast by default',
    desc: 'Lightweight with no unnecessary dependencies. Requests go straight to the HiVelari API with no client-side round trips.',
  },
  {
    icon: (
      <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <polyline points="3.27 6.96 12 12.01 20.73 6.96" /><line x1="12" y1="22.08" x2="12" y2="12" />
      </svg>
    ),
    title: 'Modular domains',
    desc: (
      <>
        Each service is a separate domain (<code>auth</code>,{" "}
        <code>commerce</code>). More domains ship as the API grows — one client,
        always.
      </>
    ),
  },
];

export default function Features() {
  return (
    <div className="border-y border-line bg-surface" id="features">
      <div className="mx-auto max-w-[1160px]">
        <div
          className="px-12 pt-18 pb-12 max-[768px]:px-6 max-[520px]:px-5"
          data-reveal
        >
          <span className="eyebrow mb-3">Capabilities</span>
          <h2 className="text-[clamp(28px,3.5vw,44px)] font-extrabold tracking-[-0.05em] text-ink">
            Built the right way.
          </h2>
        </div>
        <div className="grid grid-cols-3 gap-px bg-line max-[768px]:grid-cols-2 max-[520px]:grid-cols-1">
          {FEATURES.map((f, i) => (
            <div
              key={f.title}
              data-reveal
              data-reveal-delay={(i % 3) + 1}
              className="group bg-surface px-9 py-10 transition-colors hover:bg-white/[0.02]"
            >
              <div className="mb-5 flex size-10 shrink-0 items-center justify-center rounded-sm border border-line-accent bg-accent-dim text-accent-light transition-[transform,background] duration-200 group-hover:-translate-y-0.5 group-hover:scale-105 group-hover:bg-accent/[0.16]">
                {f.icon}
              </div>
              <h3 className="mb-2 text-[15px] font-semibold tracking-[-0.03em]">
                {f.title}
              </h3>
              <p className="text-[14px] leading-[1.65] text-ink-2 [&_code]:rounded-xs [&_code]:bg-accent-dim [&_code]:px-[5px] [&_code]:py-px [&_code]:font-mono [&_code]:text-[0.86em] [&_code]:text-accent-light">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
