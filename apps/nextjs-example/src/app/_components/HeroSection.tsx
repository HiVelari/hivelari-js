import Link from 'next/link';

function CodePreview() {
  return (
    <div className="hero-code-card">
      <div className="hero-code-bar">
        <div className="hero-code-dots">
          <span className="hero-code-dot" />
          <span className="hero-code-dot" />
          <span className="hero-code-dot" />
        </div>
        <span className="hero-code-file">page.tsx</span>
      </div>
      <div className="hero-code-body">
        <span className="code-line">
          <span className="c-kw">import</span>
          <span className="c-obj"> {'{ '}</span>
          <span className="c-type">Velari</span>
          <span className="c-obj">{' }'}</span>
          <span className="c-kw"> from </span>
          <span className="c-str">'@hivelari/sdk'</span>
        </span>
        <span className="code-blank" />
        <span className="code-line">
          <span className="c-kw">const </span>
          <span className="c-const">client</span>
          <span className="c-punct"> = </span>
          <span className="c-kw">new </span>
          <span className="c-fn">Velari</span>
          <span className="c-punct">{'({'}</span>
        </span>
        <span className="code-line">
          <span className="code-indent" />
          <span className="c-obj">spaceId</span>
          <span className="c-punct">,</span>
        </span>
        <span className="code-line">
          <span className="code-indent" />
          <span className="c-obj">pubKey</span>
          <span className="c-punct">,</span>
        </span>
        <span className="code-line">
          <span className="code-indent" />
          <span className="c-obj">secretKey</span>
          <span className="c-punct">,</span>
        </span>
        <span className="code-line">
          <span className="c-punct">{'})'}</span>
        </span>
        <span className="code-blank" />
        <span className="code-line">
          <span className="c-cm">{'// Auth — server action'}</span>
        </span>
        <span className="code-line">
          <span className="c-kw">const </span>
          <span className="c-punct">{'{ '}</span>
          <span className="c-const">data</span>
          <span className="c-punct">{' } = '}</span>
          <span className="c-kw">await </span>
          <span className="c-const">client</span>
          <span className="c-punct">.</span>
          <span className="c-obj">auth</span>
          <span className="c-punct">.</span>
          <span className="c-fn">login</span>
          <span className="c-punct">{'({'}</span>
        </span>
        <span className="code-line">
          <span className="code-indent" />
          <span className="c-obj">email</span>
          <span className="c-punct">,</span>
          <span className="c-obj"> password</span>
        </span>
        <span className="code-line">
          <span className="c-punct">{'})'}</span>
        </span>
        <span className="code-blank" />
        <span className="code-line">
          <span className="c-cm">{'// Commerce — server component'}</span>
        </span>
        <span className="code-line">
          <span className="c-kw">const </span>
          <span className="c-punct">{'{ '}</span>
          <span className="c-const">data</span>
          <span className="c-punct">{': '}</span>
          <span className="c-const">products</span>
          <span className="c-punct">{' } = '}</span>
          <span className="c-kw">await</span>
        </span>
        <span className="code-line">
          <span className="code-indent" />
          <span className="c-const">client</span>
          <span className="c-punct">.</span>
          <span className="c-obj">commerce</span>
          <span className="c-punct">.</span>
          <span className="c-fn">listProducts</span>
          <span className="c-punct">()</span>
        </span>
      </div>
    </div>
  );
}

export default function HeroSection() {
  return (
    <div className="hero-wrap">
      <div className="wrap">
        <div className="hero-grid">
          <div>
            <div className="hero-badge">
              <span className="hero-badge-dot" />
              @hivelari/sdk — live demo
            </div>

            <h1 className="hero-h1">
              Ship faster<br />
              with <em>HiVelari</em>.
            </h1>

            <p className="hero-sub">
              Authentication, commerce, and payments built for the
              Next.js App Router. Server-only. Fully typed. Zero client
              bundle leak.
            </p>

            <div className="hero-ctas">
              <Link href="/auth" className="btn btn-primary btn-lg">
                Try authentication
              </Link>
              <Link href="/commerce" className="btn btn-outline btn-lg">
                Browse products
              </Link>
            </div>
          </div>

          <CodePreview />
        </div>
      </div>
    </div>
  );
}
