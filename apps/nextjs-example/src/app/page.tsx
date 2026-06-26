import { getVelariClient } from '@/lib/velari';
import type { Metadata } from 'next';
import DomainList from './_components/DomainList';
import FeatureCards from './_components/FeatureCards';
import HeroSection from './_components/HeroSection';
import PingConsole from './_components/PingConsole';

export const metadata: Metadata = {
  title: 'HiVelari SDK — Next.js Example',
  description: 'Real-world Next.js app demonstrating @hivelari/sdk — authentication, commerce, payments.',
};

export default async function HomePage() {
  const client = await getVelariClient();

  return (
    <div className="wrap">
      <HeroSection />

      <div className="section">
        <div className="section-head">
          <p className="section-label">Handshake</p>
          <h2 className="section-title">Test API connectivity</h2>
          <p className="section-sub">
            Verify the SDK can reach your sandbox host and that space credentials are valid.
          </p>
        </div>
        <PingConsole targetUrl={client.baseUrl} />
      </div>

      <div className="section">
        <div className="section-head">
          <p className="section-label">Why Velari SDK</p>
          <h2 className="section-title">Built for production</h2>
          <p className="section-sub">
            Every design decision optimised for Next.js App Router — server-only, zero leakage, fully typed.
          </p>
        </div>
        <FeatureCards />
      </div>

      <div className="section">
        <div className="section-head">
          <p className="section-label">Domains</p>
          <h2 className="section-title">Explore live examples</h2>
          <p className="section-sub">
            Each domain is a running demonstration of a distinct SDK service module.
          </p>
        </div>
        <DomainList />
      </div>
    </div>
  );
}
