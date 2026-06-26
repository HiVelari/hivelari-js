import Link from 'next/link';

function CodeBlock() {
  return (
    <div className="hero-code fade-up delay-3">
      <div className="code-bar">
        <div className="code-dots">
          <span className="code-dot" />
          <span className="code-dot" />
          <span className="code-dot" />
        </div>
        <span className="code-filename">auth/actions.ts</span>
      </div>

      <div className="code-body">
        <span className="t-line">
          <span className="t-kw">import </span>
          <span className="t-dim">{'{ '}</span>
          <span className="t-type">Velari</span>
          <span className="t-dim">{' }'}</span>
          <span className="t-kw"> from </span>
          <span className="t-str">'@hivelari/sdk'</span>
        </span>
        <span className="t-line">
          <span className="t-kw">import </span>
          <span className="t-str">'server-only'</span>
        </span>
        <span className="t-gap" />
        <span className="t-line">
          <span className="t-kw">const </span>
          <span className="t-const">client</span>
          <span className="t-dim"> = </span>
          <span className="t-kw">new </span>
          <span className="t-fn">Velari</span>
          <span className="t-dim">{'({'}</span>
        </span>
        <span className="t-line">
          <span className="t-in" />
          <span className="t-const">spaceId</span>
          <span className="t-dim">:  process.env.</span>
          <span className="t-const">VELARI_SPACE_ID</span>
          <span className="t-dim">!,</span>
        </span>
        <span className="t-line">
          <span className="t-in" />
          <span className="t-const">pubKey</span>
          <span className="t-dim">:   process.env.</span>
          <span className="t-const">VELARI_PUB_KEY</span>
          <span className="t-dim">!,</span>
        </span>
        <span className="t-line">
          <span className="t-in" />
          <span className="t-const">secretKey</span>
          <span className="t-dim">: process.env.</span>
          <span className="t-const">VELARI_SECRET</span>
          <span className="t-dim">!,</span>
        </span>
        <span className="t-line">
          <span className="t-dim">{'})'}</span>
        </span>
        <span className="t-gap" />
        <span className="t-line">
          <span className="t-kw">export async function </span>
          <span className="t-fn">loginAction</span>
          <span className="t-dim">{'('}</span>
          <span className="t-const">email</span>
          <span className="t-dim">, </span>
          <span className="t-const">password</span>
          <span className="t-dim">{') {'}</span>
        </span>
        <span className="t-line">
          <span className="t-in" />
          <span className="t-kw">const </span>
          <span className="t-dim">{'{ data } = '}</span>
          <span className="t-kw">await </span>
          <span className="t-const">client</span>
          <span className="t-dim">.</span>
          <span className="t-fn">auth</span>
          <span className="t-dim">.</span>
          <span className="t-fn">login</span>
          <span className="t-dim">{'({'}</span>
        </span>
        <span className="t-line">
          <span className="t-in2" />
          <span className="t-const">email</span>
          <span className="t-dim">, </span>
          <span className="t-const">password</span>
          <span className="t-dim">,</span>
        </span>
        <span className="t-line">
          <span className="t-in" />
          <span className="t-dim">{'}) '}</span>
          <span className="t-cm">// → {'{ token, user }'}</span>
        </span>
        <span className="t-line">
          <span className="t-in" />
          <span className="t-kw">return </span>
          <span className="t-const">data</span>
        </span>
        <span className="t-line">
          <span className="t-dim">{'}'}</span>
        </span>
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="hero">
      <div className="container">
        <div className="hero-inner">
          <div>
            <div className="hero-badge fade-up">
              <span className="hero-badge-pip" />
              @hivelari/sdk — early access
            </div>

            <h1 className="hero-h1 fade-up delay-1">
              Build on HiVelari,<br />
              ship in <span className="hero-h1-em">days.</span>
            </h1>

            <p className="hero-sub fade-up delay-2">
              Authentication, commerce, and payments — all server-side,
              fully type-safe. One SDK built for the Next.js App Router.
            </p>

            <div className="hero-actions fade-up delay-2">
              <a href="#services" className="btn btn-primary btn-lg">
                Explore the SDK
              </a>
              <a href="#how-it-works" className="btn btn-ghost btn-lg">
                How it works
              </a>
            </div>
          </div>

          <CodeBlock />
        </div>
      </div>
    </section>
  );
}
