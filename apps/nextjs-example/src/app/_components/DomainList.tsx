import { sdkDomains } from '@/lib/data/sdk-info';
import Link from 'next/link';

export default function DomainList() {
  return (
    <div className="domain-grid">
      {sdkDomains.map((domain) => {
        const isLive = domain.path !== '#';

        const inner = (
          <div className={`card ${isLive ? 'card-lift' : ''} domain-card`} style={{ opacity: isLive ? 1 : 0.5 }}>
            <div className="domain-card-body">
              <div className="domain-card-head">
                <span className="domain-card-title">{domain.title}</span>
                <span className={`pill ${domain.status === 'active' ? 'pill-ok' : 'pill-neutral'}`}>
                  {domain.badge}
                </span>
              </div>
              <p className="domain-card-desc">{domain.description}</p>
              {domain.endpoints.length > 0 && (
                <div className="domain-card-eps">
                  {domain.endpoints.map((ep) => (
                    <span key={ep} className="domain-ep">{ep}</span>
                  ))}
                </div>
              )}
            </div>
            {isLive && (
              <div className="domain-card-arrow">→</div>
            )}
          </div>
        );

        return isLive ? (
          <Link key={domain.title} href={domain.path} style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}>
            {inner}
          </Link>
        ) : (
          <div key={domain.title}>{inner}</div>
        );
      })}
    </div>
  );
}
