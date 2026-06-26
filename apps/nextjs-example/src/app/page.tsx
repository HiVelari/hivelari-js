import { getVelariClient } from "@/lib/velari";
import type { Metadata } from "next";
import DomainList from "./_components/DomainList";
import FeatureCards from "./_components/FeatureCards";
import HeroSection from "./_components/HeroSection";
import PingConsole from "./_components/PingConsole";

export const metadata: Metadata = {
  title: "HiVelari SDK Demo",
  description:
    "Next.js example app showcasing the @hivelari/sdk — commerce, auth, and more.",
};

export default async function HomePage() {
  const client = await getVelariClient();

  return (
    <div className="wrap">
      <HeroSection />

      <div className="section">
        <div className="section-header">
          <h2 className="section-title">API Handshake</h2>
          <p className="section-subtitle">
            Verify connectivity to your sandbox host and validate space
            credentials.
          </p>
        </div>
        <PingConsole targetUrl={client.baseUrl} />
      </div>

      <div className="section">
        <div className="section-header">
          <h2 className="section-title">SDK Features</h2>
          <p className="section-subtitle">
            What makes the Velari SDK suitable for production Next.js
            applications.
          </p>
        </div>
        <FeatureCards />
      </div>

      <div className="section">
        <div className="section-header">
          <h2 className="section-title">Explore Domains</h2>
          <p className="section-subtitle">
            Live example pages — each domain demonstrates a distinct SDK service
            module.
          </p>
        </div>
        <DomainList />
      </div>
    </div>
  );
}
