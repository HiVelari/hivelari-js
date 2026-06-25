interface StatsPanelProps {
  spaceId: string;
  baseUrl: string;
  publicKey: string;
}

export default function StatsPanel({
  spaceId,
  baseUrl,
  publicKey,
}: StatsPanelProps) {
  const isSandbox =
    baseUrl.includes('localhost') ||
    baseUrl.includes('127.0.0.1') ||
    baseUrl.includes('3001');

  return (
    <div
      className="glass-panel"
      style={{
        padding: '24px',
        margin: '0 auto 32px auto',
        width: '100%',
        maxWidth: '1000px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '24px',
      }}
    >
      <div>
        <span
          style={{
            fontSize: '0.85rem',
            color: 'var(--text-muted)',
            display: 'block',
            marginBottom: '4px',
          }}
        >
          Target Environment
        </span>
        <span
          style={{
            fontSize: '1.1rem',
            fontWeight: 600,
            color: isSandbox ? 'var(--color-success)' : 'var(--color-warning)',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          <span
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: isSandbox
                ? 'var(--color-success)'
                : 'var(--color-warning)',
              display: 'inline-block',
            }}
          />
          {isSandbox ? 'Local Sandbox (3001)' : 'Production API'}
        </span>
      </div>

      <div>
        <span
          style={{
            fontSize: '0.85rem',
            color: 'var(--text-muted)',
            display: 'block',
            marginBottom: '4px',
          }}
        >
          Space ID
        </span>
        <span
          style={{ fontSize: '1rem', fontFamily: 'monospace', color: 'white' }}
        >
          {spaceId || 'none'}
        </span>
      </div>

      <div>
        <span
          style={{
            fontSize: '0.85rem',
            color: 'var(--text-muted)',
            display: 'block',
            marginBottom: '4px',
          }}
        >
          Base API Host
        </span>
        <span
          style={{ fontSize: '1rem', fontFamily: 'monospace', color: 'white' }}
        >
          {baseUrl}
        </span>
      </div>

      <div>
        <span
          style={{
            fontSize: '0.85rem',
            color: 'var(--text-muted)',
            display: 'block',
            marginBottom: '4px',
          }}
        >
          Public Key
        </span>
        <span
          style={{ fontSize: '1rem', fontFamily: 'monospace', color: 'white' }}
        >
          {publicKey ? `${publicKey.slice(0, 12)}...` : 'none'}
        </span>
      </div>
    </div>
  );
}
