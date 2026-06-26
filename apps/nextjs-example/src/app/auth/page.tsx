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
    <div className="wrap page">
      <div style={{ marginBottom: 40 }}>
        <p className="section-label">Authentication</p>
        <h1 className="section-title" style={{ fontSize: 36 }}>Identity &amp; access</h1>
        <p className="section-sub">
          Login, register, update profile, and OAuth flows via{' '}
          <code className="mono" style={{ fontSize: 13, color: 'var(--accent-text)' }}>client.auth.*</code>
        </p>
      </div>

      <AuthConsole initialUser={user} />
    </div>
  );
}
