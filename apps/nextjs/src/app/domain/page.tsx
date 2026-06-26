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
    <div className="domain-content">
      <div className="domain-content-header">
        <div>
          <p className="domain-eyebrow">SDK domains</p>
          <h1 className="domain-h1">All services, one client.</h1>
          <p className="domain-sub">
            Each domain maps to a service on the HiVelari API. Initialise
            a single <code className="inline-code">Velari</code> client and access all of them.
          </p>
        </div>
        <span className="pill pill-amber">Coming soon</span>
      </div>

      <div className="coming-soon-grid overflow-x-auto">
        {DOMAINS.map((domain, i) => (
          <div
            key={domain.title}
            className="coming-soon-card"
            data-reveal
            data-reveal-delay={i + 1}
          >
            <div className="cs-icon">{domain.icon}</div>
            <div>
              <h3 className="cs-title">{domain.title}</h3>
              <p className="cs-desc">{domain.desc}</p>
            </div>
            <div className="cs-methods">
              {domain.methods.map((m) => (
                <span key={m} className="cs-method">
                  <span className="cs-method-dot" />
                  client.{m}
                </span>
              ))}
            </div>
            <div className="cs-footer">
              <span className="pill pill-neutral">Coming soon</span>
            </div>
          </div>
        ))}
      </div>

      <div className="coming-soon-notice">
        <div className="csn-icon">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        </div>
        <div>
          <p className="csn-title">Interactive demos are in progress</p>
          <p className="csn-sub">
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
