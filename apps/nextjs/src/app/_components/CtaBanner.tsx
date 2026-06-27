export default function CtaBanner() {
  return (
    <section className="py-28 text-center max-[768px]:py-20">
      <div className="container">
        <div
          className="cta-card relative mx-auto max-w-[760px] overflow-hidden rounded-xl border border-line-2 bg-[linear-gradient(180deg,var(--color-surface),var(--color-raised))] px-12 py-18 shadow-[0_0_0_1px_var(--color-line)_inset,0_30px_80px_-40px_rgba(124,106,246,0.4)] max-[600px]:px-6 max-[600px]:py-12"
          data-reveal
        >
          <h2 className="relative mb-[18px] text-[clamp(32px,4vw,56px)] font-extrabold tracking-[-0.055em]">
            Start building today.
          </h2>
          <p className="relative mx-auto mb-11 max-w-[440px] text-[18px] leading-[1.65] text-ink-2">
            Drop in the SDK, point it at your HiVelari space, and ship your
            first authenticated page in under an hour.
          </p>
          <div className="relative flex items-center justify-center gap-3 max-[600px]:flex-col">
            <a
              href="/domain/auth"
              className="btn btn-primary btn-lg max-[600px]:w-full"
            >
              Try authentication
            </a>
            <a
              href="/domain/commerce"
              className="btn btn-ghost btn-lg max-[600px]:w-full"
            >
              Browse products
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
