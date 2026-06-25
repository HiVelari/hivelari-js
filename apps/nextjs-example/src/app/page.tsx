import { getVelariClient } from '@/lib/velari';
import type { Metadata } from 'next';
import DomainList from './_components/DomainList';
import FeatureCards from './_components/FeatureCards';
import HeroSection from './_components/HeroSection';
import PingConsole from './_components/PingConsole';

export const metadata: Metadata = {
  title: 'HiVelari SDK Showcase',
  description:
    'Explore the features, domains, and server-side handshake controls of the HiVelari TypeScript SDK.',
};

export default async function LandingPage() {
  const client = await getVelariClient();
  return (
    <div
      style={{
        maxWidth: '1000px',
        margin: '0 auto',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '56px',
      }}
    >
      <HeroSection />

      <section>
        <h2
          style={{
            fontSize: '1.75rem',
            fontWeight: 700,
            color: 'white',
            textAlign: 'center',
            marginBottom: '8px',
          }}
        >
          Handshake Status Ping
        </h2>
        <p
          style={{
            color: 'var(--text-muted)',
            textAlign: 'center',
            fontSize: '0.95rem',
          }}
        >
          Test raw connectivity to the mock API sandbox host.
        </p>
        <PingConsole targetUrl={client.baseUrl} />
      </section>

      <section>
        <h2
          style={{
            fontSize: '1.75rem',
            fontWeight: 700,
            color: 'white',
            textAlign: 'center',
            marginBottom: '8px',
          }}
        >
          SDK Core Features
        </h2>
        <p
          style={{
            color: 'var(--text-muted)',
            textAlign: 'center',
            fontSize: '0.95rem',
          }}
        >
          Why the Velari SDK is optimized for modern web architectures.
        </p>
        <FeatureCards />
      </section>

      <section style={{ marginBottom: '40px' }}>
        <h2
          style={{
            fontSize: '1.75rem',
            fontWeight: 700,
            color: 'white',
            textAlign: 'center',
            marginBottom: '8px',
          }}
        >
          Explore Application Domains
        </h2>
        <p
          style={{
            color: 'var(--text-muted)',
            textAlign: 'center',
            fontSize: '0.95rem',
          }}
        >
          Browse fully featured pages built with scaling and SoC principles.
        </p>
        <DomainList />
      </section>
    </div>
  );
}
