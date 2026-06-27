const STEPS = [
  {
    num: "01",
    title: "Install",
    desc: "Add the SDK to your Next.js project. Pure ESM, no unnecessary peer dependencies.",
    code: (
      <>
        <span className="t-dim">$ </span>
        <span className="t-kw">pnpm </span>
        <span>add @hivelari/sdk</span>
      </>
    ),
  },
  {
    num: "02",
    title: "Initialise",
    desc: "The SDK reads credentials from environment variables. Pass in the current session token and user to unlock authenticated endpoints.",
    code: (
      <>
        <span className="t-kw">new </span>
        <span className="t-fn">Velari</span>
        <span className="t-dim">{"({ "}</span>
        <span>token</span>
        <span className="t-dim">{", "}</span>
        <span>user</span>
        <span className="t-dim">{" })"}</span>
      </>
    ),
  },
  {
    num: "03",
    title: "Call any domain",
    desc: "Use client.auth.* or client.commerce.* from Server Actions, RSCs, or Route Handlers. All responses are fully typed.",
    code: (
      <>
        <span className="t-kw">await </span>
        <span>client</span>
        <span className="t-dim">.</span>
        <span className="t-fn">auth</span>
        <span className="t-dim">.</span>
        <span className="t-fn">login</span>
        <span className="t-dim">{"({ email, password })"}</span>
      </>
    ),
  },
];

export default function Steps() {
  const last = STEPS.length - 1;

  return (
    <section className="py-24 max-[768px]:py-18" id="how-it-works">
      <div className="container">
        <div className="mb-14 max-[768px]:mb-10" data-reveal>
          <span className="eyebrow mb-3">How it works</span>
          <h2 className="mb-3.5 text-[clamp(28px,3.5vw,44px)] font-extrabold tracking-[-0.05em] text-ink">
            Up and running in minutes.
          </h2>
          <p className="max-w-[520px] text-[17px] font-normal leading-[1.7] text-ink-2">
            No wrappers, no adapters. The SDK speaks directly to the
            HiVelari API and returns typed responses you can trust.
          </p>
        </div>

        <div className="grid grid-cols-3 overflow-x-auto max-[768px]:grid-cols-1">
          {STEPS.map((step, i) => (
            <div
              key={step.num}
              data-reveal
              data-reveal-delay={i + 1}
              className={`group relative border border-line bg-surface px-9 py-10 transition-colors hover:bg-surface-2 ${
                i === 0
                  ? "rounded-l-lg max-[768px]:rounded-l-none max-[768px]:rounded-t-lg"
                  : "border-l-0 max-[768px]:border-t-0 max-[768px]:border-l"
              } ${
                i === last
                  ? "rounded-r-lg max-[768px]:rounded-r-none max-[768px]:rounded-b-lg"
                  : ""
              }`}
            >
              <span className="mb-6 inline-flex rounded-full border border-line-accent bg-accent-dim px-[9px] py-[3px] font-mono text-[11px] font-medium tracking-[0.06em] text-accent-light transition-[background,box-shadow] duration-200 group-hover:bg-accent/[0.16] group-hover:shadow-[0_0_0_1px_var(--color-line-accent),0_0_18px_-4px_var(--color-accent-glow)]">
                {step.num}
              </span>
              <h3 className="mb-2 text-[16px] font-semibold tracking-[-0.03em]">
                {step.title}
              </h3>
              <div className="step-code mb-6 overflow-x-auto rounded-sm border border-line bg-raised px-4 py-[11px] font-mono text-[13px] whitespace-nowrap text-ink transition-colors group-hover:border-line-accent">
                {step.code}
              </div>
              <p className="text-[14px] leading-[1.65] text-ink-2">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
