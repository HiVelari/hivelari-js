import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SDK Domains — HiVelari SDK",
};

const DOMAINS = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
    title: "Authentication",
    href: "/domain/auth",
    status: "coming-soon",
    desc: "Login, register, OAuth flows, session management, profile updates, and password recovery.",
    methods: ["auth.login()", "auth.register()", "auth.socialRedirectUrl()", "auth.updateProfile()", "auth.logout()"],
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
      </svg>
    ),
    title: "Commerce",
    href: "/domain/commerce",
    status: "coming-soon",
    desc: "Product listings, digital & physical items, purchasing flows, and file delivery.",
    methods: ["commerce.listProducts()", "commerce.getProduct()", "commerce.purchaseProduct()"],
  },
];

export default function DomainPage() {
  return (
    <div className="mx-auto max-w-[820px] px-14 pt-14 pb-24 max-[768px]:max-w-full max-[768px]:px-5 max-[768px]:pt-8 max-[768px]:pb-18">
      <div className="mb-12 flex items-start justify-between gap-6 max-[768px]:mb-8 max-[768px]:flex-wrap max-[768px]:gap-3.5">
        <div>
          <p className="mb-2.5 font-mono text-[11px] font-medium uppercase tracking-[0.1em] text-accent-light">
            SDK domains
          </p>
          <h1 className="mb-3 text-[34px] font-extrabold tracking-[-0.05em] text-ink max-[768px]:text-[28px]">
            All services, one client.
          </h1>
          <p className="max-w-[480px] text-[16px] leading-[1.7] text-ink-2">
            Each domain maps to a service on the HiVelari API. Initialise
            a single <code className="inline-code">Velari</code> client and access all of them.
          </p>
        </div>
        <span className="pill pill-amber">Coming soon</span>
      </div>

      <div className="mb-9 grid grid-cols-2 gap-3.5 overflow-x-auto max-[768px]:grid-cols-1">
        {DOMAINS.map((domain, i) => (
          <div
            key={domain.title}
            data-reveal
            data-reveal-delay={i + 1}
            className="group flex flex-col gap-4 rounded-lg border border-line bg-surface p-8 transition-[border-color,background,transform] duration-200 hover:-translate-y-[3px] hover:border-line-accent hover:bg-surface-2"
          >
            <div className="flex size-11 items-center justify-center rounded-sm border border-line-accent bg-accent-dim text-accent-light transition-transform duration-200 group-hover:-rotate-3 group-hover:scale-[1.06]">
              {domain.icon}
            </div>
            <div>
              <h3 className="mb-1.5 text-[17px] font-bold tracking-[-0.03em]">
                {domain.title}
              </h3>
              <p className="text-[13px] leading-[1.65] text-ink-2">{domain.desc}</p>
            </div>
            <div className="flex flex-1 flex-col gap-[5px]">
              {domain.methods.map((m) => (
                <span
                  key={m}
                  className="flex items-center gap-2 font-mono text-xs text-ink-3"
                >
                  <span className="size-[3px] shrink-0 rounded-full bg-ink-3" />
                  client.{m}
                </span>
              ))}
            </div>
            <div className="mt-auto">
              <span className="pill pill-neutral">Coming soon</span>
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-4 rounded-md border border-line bg-surface p-6 max-[768px]:flex-col max-[768px]:gap-3">
        <div className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-sm border border-line-accent bg-accent-dim text-accent-light">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        </div>
        <div>
          <p className="mb-1.5 text-[14px] font-semibold tracking-[-0.02em]">
            Interactive demos are in progress
          </p>
          <p className="text-[13px] leading-[1.65] text-ink-2 [&_a]:text-accent-light [&_a]:underline [&_a]:underline-offset-[3px]">
            Each domain will have a live, interactive playground where you can call SDK methods
            directly and see the responses. Check back soon — or browse the{" "}
            <a href="https://www.npmjs.com/package/@hivelari/sdk" target="_blank" rel="noreferrer">
              npm package
            </a>{" "}
            in the meantime.
          </p>
        </div>
      </div>
    </div>
  );
}
