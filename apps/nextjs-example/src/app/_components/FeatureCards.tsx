const FEATURES = [
  {
    id: 'server-only',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
        <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
        <line x1="6" y1="6" x2="6.01" y2="6" /><line x1="6" y1="18" x2="6.01" y2="18" />
      </svg>
    ),
    title: 'Server-only by design',
    description: 'The SDK uses the `server-only` package to prevent secret keys from leaking into the browser bundle.',
  },
  {
    id: 'typed',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    title: 'End-to-end typed',
    description: 'Request parameters, response payloads, and error shapes are all fully typed with TypeScript generics.',
  },
  {
    id: 'auth',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
    title: 'Auth service',
    description: 'Login, register, OAuth, profile management, email verification — everything in `client.auth.*`.',
  },
  {
    id: 'commerce',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
      </svg>
    ),
    title: 'Commerce service',
    description: 'Physical and digital product listings, purchasing, and file management via `client.commerce.*`.',
  },
  {
    id: 'apirouter',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
        <polyline points="13 2 13 9 20 9" />
      </svg>
    ),
    title: 'App Router native',
    description: 'Server Actions, RSCs, and Route Handlers are first-class citizens. No adaptation layer needed.',
  },
  {
    id: 'zod',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: 'Validated at runtime',
    description: 'Environment variables and API responses are validated with Zod at startup and on every call.',
  },
];

export default function FeatureCards() {
  return (
    <div className="feature-grid">
      {FEATURES.map((feat) => (
        <div key={feat.id} className="card card-lift">
          <div className="feature-card-inner">
            <div className="feature-icon">{feat.icon}</div>
            <div>
              <h3 className="feature-title">{feat.title}</h3>
              <p className="feature-desc" style={{ marginTop: 6 }}>{feat.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
