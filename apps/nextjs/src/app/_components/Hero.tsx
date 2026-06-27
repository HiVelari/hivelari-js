import Link from 'next/link';
import InstallCommand from './InstallCommand';

function CodeBlock() {
  return (
    <div className="code-card relative overflow-hidden rounded-lg bg-surface transition-transform duration-300 hover:-translate-y-1 fade-up delay-3 max-[1020px]:hidden">
      <div className="flex items-center gap-2.5 border-b border-line bg-white/[0.018] px-[18px] py-3.5">
        <div className="flex gap-[7px]">
          <span className="size-[11px] rounded-full bg-[#ff5f57]" />
          <span className="size-[11px] rounded-full bg-[#febc2e]" />
          <span className="size-[11px] rounded-full bg-[#28c840]" />
        </div>
        <span className="ml-1 font-mono text-xs text-white/[0.22]">
          lib/velari.ts
        </span>
      </div>

      <div className="relative bg-[#080810] px-[26px] pt-6 pb-7 font-mono text-[13.5px] leading-[2.05]">
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
          <span className="t-cm">
            {'// Credentials are read from env vars:'}
          </span>
        </span>
        <span className="t-line">
          <span className="t-cm">
            {'// VELARI_SPACE_ID · VELARI_PUBLIC_KEY'}
          </span>
        </span>
        <span className="t-line">
          <span className="t-cm">
            {'// VELARI_SECRET_KEY · VELARI_BASE_URL'}
          </span>
        </span>
        <span className="t-gap" />
        <span className="t-line">
          <span className="t-kw">export async function </span>
          <span className="t-fn">getClient</span>
          <span className="t-dim">{'() {'}</span>
        </span>
        <span className="t-line">
          <span className="t-in" />
          <span className="t-cm">{'// Attach session from cookies'}</span>
        </span>
        <span className="t-line">
          <span className="t-in" />
          <span className="t-kw">const </span>
          <span className="t-dim">{'{ '}</span>
          <span className="t-const">token</span>
          <span className="t-dim">{', '}</span>
          <span className="t-const">user</span>
          <span className="t-dim">{' } = '}</span>
          <span className="t-kw">await </span>
          <span className="t-fn">getAuthSession</span>
          <span className="t-dim">{'()'}</span>
        </span>
        <span className="t-line">
          <span className="t-in" />
          <span className="t-kw">return new </span>
          <span className="t-fn">Velari</span>
          <span className="t-dim">{'({ '}</span>
          <span className="t-const">token</span>
          <span className="t-dim">{', '}</span>
          <span className="t-const">user</span>
          <span className="t-dim">{' })'}</span>
        </span>
        <span className="t-line">
          <span className="t-dim">{'}'}</span>
        </span>
        <span className="t-gap" />
        <span className="t-line">
          <span className="t-cm">{'// In a Server Action:'}</span>
        </span>
        <span className="t-line">
          <span className="t-kw">const </span>
          <span className="t-const">client</span>
          <span className="t-dim">{' = '}</span>
          <span className="t-kw">await </span>
          <span className="t-fn">getClient</span>
          <span className="t-dim">{'()'}</span>
        </span>
        <span className="t-line">
          <span className="t-kw">await </span>
          <span className="t-const">client</span>
          <span className="t-dim">{'.'}</span>
          <span className="t-fn">auth</span>
          <span className="t-dim">{'.'}</span>
          <span className="t-fn">login</span>
          <span className="t-dim">{'({ '}</span>
          <span className="t-const">email</span>
          <span className="t-dim">{', '}</span>
          <span className="t-const">password</span>
          <span className="t-dim">{' })'}</span>
        </span>
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="hero-glow relative overflow-hidden pt-44 pb-26 max-[768px]:pt-25 max-[768px]:pb-16 max-[520px]:pt-23 max-[520px]:pb-14">
      <div className="container">
        <div className="relative z-[1] grid grid-cols-[1fr_480px] items-center gap-[72px] max-[1020px]:max-w-[640px] max-[1020px]:grid-cols-1">
          <div>
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-line-accent bg-accent-dim py-[5px] pr-3 pl-1.5 text-xs font-medium tracking-[0.01em] text-accent-light fade-up max-[520px]:mb-6">
              <span className="size-1.5 animate-[pulse-dot_2.4s_ease-in-out_infinite] rounded-full bg-green shadow-[0_0_8px_var(--color-green)]" />
              @hivelari/sdk — early access
            </div>

            <h1 className="mb-6 text-[clamp(48px,5.5vw,80px)] font-extrabold leading-[1.04] tracking-[-0.055em] text-ink fade-up delay-1 max-[380px]:text-[40px]">
              Build on HiVelari,
              <br />
              ship in <span className="text-gradient">days.</span>
            </h1>

            <p className="mb-11 max-w-[430px] text-[18px] font-normal leading-[1.75] text-ink-2 fade-up delay-2 max-[520px]:mb-8">
              Authentication, commerce, and payments — all server-side, fully
              type-safe. One SDK built for the Next.js App Router.
            </p>

            <div className="flex items-center gap-3 fade-up delay-2 max-[520px]:flex-col max-[520px]:items-stretch">
              <Link
                href="/domain"
                className="btn btn-primary btn-lg max-[520px]:w-full"
              >
                Explore the SDK
              </Link>
              <a
                href="#how-it-works"
                className="btn btn-ghost btn-lg max-[520px]:w-full"
              >
                How it works
              </a>
            </div>

            <div className="mt-7 fade-up delay-3">
              <InstallCommand />
            </div>
          </div>

          <CodeBlock />
        </div>
      </div>
    </section>
  );
}
