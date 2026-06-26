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
  return (
    <section className="section" id="how-it-works">
      <div className="section-inner">
        <div className="section-head">
          <span className="section-eyebrow">How it works</span>
          <h2 className="section-title">Up and running in minutes.</h2>
          <p className="section-sub">
            No wrappers, no adapters. The SDK speaks directly to the
            HiVelari API and returns typed responses you can trust.
          </p>
        </div>

        <div className="steps">
          {STEPS.map((step) => (
            <div key={step.num} className="step">
              <span className="step-num">{step.num}</span>
              <h3 className="step-title">{step.title}</h3>
              <div className="step-code">{step.code}</div>
              <p className="step-desc">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
