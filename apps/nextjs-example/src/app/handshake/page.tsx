import type { Metadata } from 'next';
import HandshakeConsole from './_components/HandshakeConsole';
import { velari } from '@/lib/velari';

export const metadata: Metadata = {
  title: 'Handshake Ping Console | Velari',
  description: 'Test local SDK connection and request latency',
};

export default function HandshakePage() {
  return (
    <div
      style={{
        padding: '40px 0',
        maxWidth: '800px',
        margin: '0 auto',
        width: '100%',
      }}
    >
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1
          style={{
            fontSize: '2.5rem',
            fontWeight: 700,
            background: 'linear-gradient(135deg, white, var(--text-muted))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '12px',
            letterSpacing: '-1px',
          }}
        >
          Handshake connection console
        </h1>
        <p
          style={{
            fontSize: '1.1rem',
            color: 'var(--text-muted)',
            maxWidth: '600px',
            margin: '0 auto',
          }}
        >
          Test your server-side connection and calculate ping handshake latency
          to the API server.
        </p>
      </div>

      <HandshakeConsole targetUrl={velari.baseUrl} />
    </div>
  );
}
