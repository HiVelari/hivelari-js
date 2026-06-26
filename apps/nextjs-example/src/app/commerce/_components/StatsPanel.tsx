interface StatsPanelProps {
  spaceId: string;
  baseUrl: string;
  publicKey: string;
}

export default function StatsPanel({ spaceId, baseUrl, publicKey }: StatsPanelProps) {
  const isSandbox =
    baseUrl.includes('localhost') || baseUrl.includes('127.0.0.1') || baseUrl.includes('3001');

  const rows = [
    {
      key: 'Environment',
      value: isSandbox ? 'Local Sandbox' : 'Production',
      accent: isSandbox ? 'var(--green)' : 'var(--yellow)',
      dot: isSandbox ? 'dot-green' : 'dot-yellow',
    },
    { key: 'Space ID',   value: spaceId || '—',                         accent: undefined, dot: undefined },
    { key: 'API Host',   value: baseUrl,                                 accent: undefined, dot: undefined },
    { key: 'Public Key', value: publicKey ? `${publicKey.slice(0, 14)}…` : '—', accent: undefined, dot: undefined },
  ];

  return (
    <div className="card card-body" style={{ marginBottom: 28 }}>
      <div className="kv-table">
        {rows.map((row) => (
          <div className="kv-row" key={row.key}>
            <span className="kv-key">{row.key}</span>
            <span className="kv-val" style={row.accent ? { color: row.accent, display: 'flex', alignItems: 'center', gap: 6 } : undefined}>
              {row.dot && <span className={`dot ${row.dot}`} />}
              {row.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
