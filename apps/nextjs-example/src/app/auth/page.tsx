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
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 6 }}>Authentication</h1>
        <p className="text-secondary" style={{ fontSize: 14 }}>
          Login, register, update profile, and OAuth flows via <code className="mono">client.auth.*</code>
        </p>
      </div>

      <AuthConsole initialUser={user} />
    </div>
  );
}
