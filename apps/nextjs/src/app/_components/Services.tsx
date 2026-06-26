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
    <section className="section" id="services">
      <div className="section-inner">
        <div className="section-head">
          <span className="section-eyebrow">SDK services</span>
          <h2 className="section-title">Every domain, one client.</h2>
          <p className="section-sub">
            Each service maps directly to a HiVelari API domain.
            The client is shared — initialise once, use everywhere.
          </p>
        </div>

        <div className="services">
          {SERVICES.map((svc) => (
            <a key={svc.id} href={svc.href} className="service-card">
              <div className="service-icon-wrap">{svc.icon}</div>

              <h3 className="service-title">{svc.title}</h3>
              <p className="service-desc">{svc.desc}</p>

              <div className="service-methods">
                {svc.methods.map((m) => (
                  <span key={m} className="service-method">
                    <span className="service-method-dot" />
                    {m}
                  </span>
                ))}
              </div>

              <span className="service-cta">
                {svc.cta} <span>→</span>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
