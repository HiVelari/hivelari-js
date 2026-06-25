import { getAuthSession } from '@/lib/velari';
import type { Metadata } from 'next';
import AuthConsole from './_components/AuthConsole';

export const metadata: Metadata = {
  title: 'Authentication Domain | HiVelari',
  description:
    'Securely authenticate client profiles, manage account attributes, and exchange credentials using the HiVelari SDK.',
};

export default async function AuthDomainPage() {
  const { user } = await getAuthSession();

  return (
    <div
      style={{
        padding: '40px 0',
        maxWidth: '1000px',
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
          Customer Authentication
        </h1>
        <p
          style={{
            fontSize: '1.1rem',
            color: 'var(--text-muted)',
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: '1.5',
          }}
        >
          Test client authentication APIs, profile updates, and email/password
          workflows completely through the Velari TS SDK service layer.
        </p>
      </div>

      <AuthConsole initialUser={user} />
    </div>
  );
}
