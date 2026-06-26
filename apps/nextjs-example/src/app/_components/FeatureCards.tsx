import { sdkFeatures } from '@/lib/data/sdk-info';

export default function FeatureCards() {
  return (
    <div className="grid-auto" style={{ marginTop: '28px' }}>
      {sdkFeatures.map((feat) => (
        <div key={feat.id} className="card card-body">
          <div style={{ fontSize: 28, marginBottom: 14 }}>{feat.icon}</div>
          <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 8 }}>{feat.title}</h3>
          <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {feat.description}
          </p>
        </div>
      ))}
    </div>
  );
}
