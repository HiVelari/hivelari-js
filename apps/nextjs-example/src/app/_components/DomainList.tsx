import { sdkDomains } from '@/lib/data/sdk-info';
import Link from 'next/link';

export default function DomainList() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 28 }}>
      {sdkDomains.map((domain) => {
        const isLive = domain.path !== '#';
        const card = (
          <div
            className={`card card-body ${isLive ? 'card-hover' : ''}`}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24 }}
          >
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                <span style={{ fontSize: 16, fontWeight: 600 }}>{domain.title}</span>
                <span className={`badge ${domain.status === 'active' ? 'badge-green' : domain.status === 'soon' ? 'badge-neutral' : 'badge-blue'}`}>
                  {domain.badge}
                </span>
              </div>
              <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: domain.endpoints.length ? 10 : 0 }}>
                {domain.description}
              </p>
              {domain.endpoints.length > 0 && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {domain.endpoints.map((ep) => (
                    <code
                      key={ep}
                      style={{
                        fontSize: 11,
                        padding: '2px 8px',
                        background: 'var(--bg-subtle)',
                        border: '1px solid var(--border-subtle)',
                        borderRadius: 4,
                        color: 'var(--text-secondary)',
                      }}
                    >
                      {ep}
                    </code>
                  ))}
                </div>
              )}
            </div>
            {isLive && (
              <span style={{ color: 'var(--accent)', fontSize: 18, flexShrink: 0 }}>→</span>
            )}
          </div>
        );

        return isLive ? (
          <Link key={domain.title} href={domain.path} style={{ display: 'block' }}>
            {card}
          </Link>
        ) : (
          <div key={domain.title}>{card}</div>
        );
      })}
    </div>
  );
}
