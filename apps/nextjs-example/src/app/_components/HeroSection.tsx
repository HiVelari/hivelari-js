import Link from 'next/link';

export default function HeroSection() {
  return (
    <div className="hero">
      <p className="hero-eyebrow">
        <span className="dot dot-green" />
        @hivelari/sdk · Next.js Example
      </p>

      <h1 className="hero-title">
        Build on HiVelari
        <br />
        <span className="gradient">with full type safety</span>
      </h1>

      <p className="hero-subtitle">
        A real-world example app demonstrating the HiVelari SDK inside a Next.js monorepo.
        Commerce, authentication, and social OAuth — all server-side, all type-safe.
      </p>

      <div className="hero-actions">
        <Link href="/commerce" className="btn btn-primary btn-lg">
          Browse Products
        </Link>
        <Link href="/auth" className="btn btn-secondary btn-lg">
          Try Authentication
        </Link>
      </div>
    </div>
  );
}
