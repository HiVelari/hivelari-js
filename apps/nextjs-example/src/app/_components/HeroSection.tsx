export default function HeroSection() {
  return (
    <div style={{ textAlign: 'center', margin: '64px 0 40px 0' }}>
      <span
        style={{
          background:
            'linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(168, 85, 247, 0.1))',
          border: '1px solid rgba(99, 102, 241, 0.2)',
          color: '#a5b4fc',
          padding: '6px 16px',
          borderRadius: '20px',
          fontSize: '0.8rem',
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '1.5px',
          display: 'inline-block',
          marginBottom: '20px',
        }}
      >
        🚀 Velari SDK Integration Example
      </span>

      <h1
        style={{
          fontSize: '3.2rem',
          fontWeight: 800,
          background:
            'linear-gradient(135deg, white 30%, var(--text-muted) 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '16px',
          letterSpacing: '-1.5px',
          lineHeight: '1.1',
        }}
      >
        Powering secure backend integrations
      </h1>

      <p
        style={{
          fontSize: '1.2rem',
          color: 'var(--text-muted)',
          maxWidth: '680px',
          margin: '0 auto',
          lineHeight: '1.6',
        }}
      >
        HiVelari is a robust developer platform. This Next.js showcase app
        utilizes the server-only
        <code> @hivelari/sdk</code> client with Zod runtime validations to
        connect to your Space dashboard.
      </p>
    </div>
  );
}
