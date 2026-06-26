const STEPS = [
  {
    num: '01',
    title: 'Install',
    desc: 'Add the SDK to your Next.js project. It ships as a pure ESM package with no peer dependency overhead.',
    code: (
      <>
        <span className="t-dim">$ </span>
        <span className="t-kw">pnpm </span>
        <span>add @hivelari/sdk</span>
      </>
    ),
  },
  {
    num: '02',
    title: 'Initialise',
    desc: 'Create a single client instance in a server-only file. Your credentials never reach the browser.',
    code: (
      <>
        <span className="t-kw">new </span>
        <span>Velari{'({ spaceId, pubKey, secretKey })'}</span>
      </>
    ),
  },
  {
    num: '03',
    title: 'Call any domain',
    desc: 'Use `client.auth.*` or `client.commerce.*` from Server Actions, RSCs, or Route Handlers.',
    code: (
      <>
        <span className="t-kw">await </span>
        <span>client.auth.</span>
        <span className="t-str">login</span>
        <span>{'({ email, password })'}</span>
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
            No wrappers, no adapters. The SDK speaks directly to the HiVelari API
            and returns typed responses you can trust.
          </p>
        </div>

        <div className="steps">
          {STEPS.map((step) => (
            <div key={step.num} className="step">
              <span className="step-num">{step.num}</span>
              <div className="step-code">{step.code}</div>
              <h3 className="step-title">{step.title}</h3>
              <p className="step-desc">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
