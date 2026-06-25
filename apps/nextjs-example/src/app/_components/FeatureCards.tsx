import { sdkFeatures } from '@/lib/data/sdk-info';

export default function FeatureCards() {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '24px',
        width: '100%',
        marginTop: '40px',
      }}
    >
      {sdkFeatures.map((feat) => (
        <div key={feat.id} className="glass-panel" style={{ padding: '24px' }}>
          <div
            style={{
              fontSize: '2rem',
              marginBottom: '16px',
            }}
          >
            {feat.icon}
          </div>
          <h3
            style={{
              fontSize: '1.1rem',
              fontWeight: 600,
              color: 'white',
              marginBottom: '8px',
            }}
          >
            {feat.title}
          </h3>
          <p
            style={{
              fontSize: '0.875rem',
              color: 'var(--text-muted)',
              lineHeight: '1.6',
            }}
          >
            {feat.description}
          </p>
        </div>
      ))}
    </div>
  );
}
