import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';

export const metadata: Metadata = {
  title: 'Velari Storefront Demo',
  description: 'Next.js storefront showcase powered by @hivelari/sdk',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <header
          className="glass-panel"
          style={{
            position: 'sticky',
            top: '16px',
            zIndex: 100,
            margin: '16px 24px',
            padding: '16px 32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderRadius: '16px',
          }}
        >
          <Link
            href="/"
            style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            <span
              style={{
                background:
                  'linear-gradient(135deg, var(--color-primary), #a855f7)',
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                display: 'inline-block',
              }}
            />
            <span
              style={{
                fontWeight: 700,
                fontSize: '1.2rem',
                letterSpacing: '-0.5px',
              }}
            >
              HiVelari{' '}
              <span style={{ color: 'var(--color-primary)', fontWeight: 400 }}>
                Demo
              </span>
            </span>
          </Link>
          <nav style={{ display: 'flex', gap: '24px', fontWeight: 500 }}>
            <Link href="/" style={{ padding: '8px 12px' }}>
              Catalog
            </Link>
            <Link href="/handshake" style={{ padding: '8px 12px' }}>
              Ping Console
            </Link>
          </nav>
        </header>

        <main
          style={{
            flex: 1,
            padding: '0 24px 48px 24px',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {children}
        </main>

        <footer
          style={{
            textAlign: 'center',
            padding: '32px',
            borderTop: '1px solid var(--border-color)',
            color: 'var(--text-muted)',
            fontSize: '0.9rem',
          }}
        >
          Powered by <strong>@hivelari/sdk</strong> inside Next.js monorepo
          workspace
        </footer>
      </body>
    </html>
  );
}
