import { logoutAction } from '@/app/auth/_actions';
import { getAuthSession } from '@/lib/velari';
import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';

export const metadata: Metadata = {
  title: 'Velari Storefront Demo',
  description: 'Next.js storefront showcase powered by @hivelari/sdk',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user } = await getAuthSession();

  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <header
          className="glass-panel"
          style={{
            position: 'sticky',
            top: '16px',
            zIndex: 100,
            margin: '16px 24px',
            padding: '12px 32px',
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
                width: '28px',
                height: '28px',
                borderRadius: '6px',
                display: 'inline-block',
              }}
            />
            <span
              style={{
                fontWeight: 700,
                fontSize: '1.15rem',
                letterSpacing: '-0.5px',
                color: 'white',
              }}
            >
              HiVelari{' '}
              <span style={{ color: 'var(--color-primary)', fontWeight: 400 }}>
                Demo
              </span>
            </span>
          </Link>
          <nav
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '24px',
              fontWeight: 500,
            }}
          >
            <Link
              href="/"
              style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}
            >
              Home
            </Link>
            <Link
              href="/commerce"
              style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}
            >
              Products
            </Link>
            {user ? (
              <>
                <span
                  style={{
                    fontSize: '0.85rem',
                    color: 'var(--color-success)',
                    background: 'rgba(16, 185, 129, 0.08)',
                    padding: '4px 12px',
                    borderRadius: '20px',
                    border: '1px solid rgba(16, 185, 129, 0.15)',
                    fontWeight: 600,
                  }}
                >
                  👤 {user.first_name || user.email}
                </span>
                <form action={logoutAction} style={{ display: 'inline' }}>
                  <button
                    type="submit"
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--color-error)',
                      cursor: 'pointer',
                      fontSize: '0.95rem',
                      fontWeight: 500,
                      padding: '4px 8px',
                      borderRadius: '8px',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    Logout
                  </button>
                </form>
              </>
            ) : (
              <Link
                href="/auth"
                style={{
                  fontSize: '0.95rem',
                  color: 'var(--color-primary)',
                  fontWeight: 600,
                }}
              >
                Login
              </Link>
            )}
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
