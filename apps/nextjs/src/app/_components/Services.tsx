function LockIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
    </svg>
  );
}

const SERVICES = [
  {
    id: 'auth',
    icon: <LockIcon />,
    title: 'Authentication',
    desc: 'Complete identity management for your users. Email/password, OAuth providers, session handling, and profile management — all in a handful of typed calls.',
    methods: [
      'client.auth.login()',
      'client.auth.register()',
      'client.auth.socialRedirectUrl()',
      'client.auth.updateProfile()',
      'client.auth.initiatePasswordRecovery()',
      'client.auth.logout()',
    ],
    cta: 'Try auth demo',
    href: '/auth',
  },
  {
    id: 'commerce',
    icon: <CartIcon />,
    title: 'Commerce',
    desc: 'Physical and digital product listings, purchasing flows, file delivery, and inventory — all rendered server-side from your Next.js components.',
    methods: [
      'client.commerce.listProducts()',
      'client.commerce.getProduct()',
      'client.commerce.purchaseProduct()',
    ],
    cta: 'Browse catalog',
    href: '/commerce',
  },
];

export default function Services() {
  return (
    <section className="py-24 max-[768px]:py-18" id="services">
      <div className="container">
        <div className="mb-14 max-[768px]:mb-10" data-reveal>
          <span className="eyebrow mb-3">SDK services</span>
          <h2 className="mb-3.5 text-[clamp(28px,3.5vw,44px)] font-extrabold tracking-[-0.05em] text-ink">
            Every domain, one client.
          </h2>
          <p className="max-w-[520px] text-[17px] font-normal leading-[1.7] text-ink-2">
            Each service maps directly to a HiVelari API domain.
            The client is shared — initialise once, use everywhere.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 max-[1020px]:grid-cols-1 max-[768px]:gap-[14px]">
          {SERVICES.map((svc, i) => (
            <a
              key={svc.id}
              href={svc.href}
              data-reveal
              data-reveal-delay={i + 1}
              className="service-card group relative flex flex-col overflow-hidden rounded-lg border border-line bg-surface p-10 text-inherit no-underline transition-[border-color,background,box-shadow,transform] duration-200 hover:-translate-y-[3px] hover:border-line-accent hover:bg-surface-2 hover:shadow-[0_0_0_1px_var(--color-line-accent),0_8px_48px_rgba(0,0,0,0.4)] max-[768px]:px-[22px] max-[768px]:py-7"
            >
              <div className="relative mb-7 flex size-12 items-center justify-center rounded-sm border border-line-accent bg-accent-dim text-accent-light transition-[background,transform] duration-200 group-hover:-rotate-3 group-hover:scale-[1.06] group-hover:bg-accent/[0.16]">
                {svc.icon}
              </div>

              <h3 className="relative mb-2.5 text-[22px] font-bold tracking-[-0.04em]">
                {svc.title}
              </h3>
              <p className="relative mb-7 text-[15px] leading-[1.7] text-ink-2">
                {svc.desc}
              </p>

              <div className="relative mb-8 flex flex-1 flex-col gap-1.5 max-[768px]:overflow-x-auto max-[768px]:no-scrollbar">
                {svc.methods.map((m) => (
                  <span
                    key={m}
                    className="flex items-center gap-2.5 font-mono text-xs text-ink-2 max-[768px]:whitespace-nowrap"
                  >
                    <span className="size-1 shrink-0 rounded-full bg-accent" />
                    {m}
                  </span>
                ))}
              </div>

              <span className="relative inline-flex items-center gap-1.5 text-[14px] font-medium text-accent-light transition-[gap] duration-200 group-hover:gap-2.5">
                {svc.cta} <span>→</span>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
