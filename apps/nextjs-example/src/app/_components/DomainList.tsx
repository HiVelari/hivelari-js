import { sdkDomains } from '@/lib/data/sdk-info';
import Link from 'next/link';

interface DomainCardProps {
  dom: (typeof sdkDomains)[0];
  isLinkable: boolean;
}

function DomainCard({ dom, isLinkable }: DomainCardProps) {
  return (
    <div
      className="glass-panel"
      style={{
        padding: '24px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '16px',
        cursor: isLinkable ? 'pointer' : 'default',
      }}
    >
      <div style={{ flex: 1 }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            marginBottom: '6px',
          }}
        >
          <h3 style={{ fontSize: '1.2rem', fontWeight: 600, color: 'white' }}>
            {dom.title}
          </h3>
          <span
            style={{
              fontSize: '0.75rem',
              padding: '2px 8px',
              borderRadius: '12px',
              fontWeight: 600,
              background:
                dom.status === 'active'
                  ? 'rgba(16, 185, 129, 0.1)'
                  : dom.status === 'mock'
                    ? 'rgba(99, 102, 241, 0.1)'
                    : 'rgba(255,255,255,0.05)',
              border: `1px solid ${dom.status === 'active' ? 'rgba(16, 185, 129, 0.2)' : dom.status === 'mock' ? 'rgba(99, 102, 241, 0.2)' : 'rgba(255,255,255,0.05)'}`,
              color:
                dom.status === 'active'
                  ? '#34d399'
                  : dom.status === 'mock'
                    ? '#a5b4fc'
                    : 'var(--text-muted)',
            }}
          >
            {dom.badge}
          </span>
        </div>
        <p
          style={{
            fontSize: '0.9rem',
            color: 'var(--text-muted)',
            lineHeight: '1.5',
          }}
        >
          {dom.description}
        </p>
      </div>

      {isLinkable && (
        <span
          style={{
            color: 'var(--color-primary)',
            fontWeight: 600,
            fontSize: '1.1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
          }}
        >
          Open Domain →
        </span>
      )}
    </div>
  );
}

export default function DomainList() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        width: '100%',
        marginTop: '40px',
      }}
    >
      {sdkDomains.map((dom) => {
        const isLinkable = dom.path !== '#';
        return isLinkable ? (
          <Link key={dom.title} href={dom.path}>
            <DomainCard dom={dom} isLinkable={isLinkable} />
          </Link>
        ) : (
          <div key={dom.title}>
            <DomainCard dom={dom} isLinkable={isLinkable} />
          </div>
        );
      })}
    </div>
  );
}
