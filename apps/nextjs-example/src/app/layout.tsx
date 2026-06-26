import { logoutAction } from '@/app/auth/_actions';
import { getAuthSession } from '@/lib/velari';
import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';

export const metadata: Metadata = {
  title: { default: 'HiVelari SDK Demo', template: '%s | HiVelari SDK' },
  description: 'Next.js example app for the @hivelari/sdk — authentication, commerce, and more.',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { user } = await getAuthSession();

  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <header className="site-header">
          <Link href="/" className="site-logo">
            <span className="site-logo-mark" />
            HiVelari <span>/ sdk-demo</span>
          </Link>

          <nav className="site-nav">
            <Link href="/" className="nav-link">Home</Link>
            <Link href="/commerce" className="nav-link">Commerce</Link>
            <Link href="/auth" className="nav-link">Auth</Link>

            {user ? (
              <>
                <span className="user-chip">
                  <span className="dot dot-green" />
                  {user.first_name ?? user.email}
                </span>
                <form action={logoutAction} style={{ display: 'contents' }}>
                  <button type="submit" className="btn btn-ghost btn-sm">Sign out</button>
                </form>
              </>
            ) : (
              <Link href="/auth" className="btn btn-primary btn-sm">Sign in</Link>
            )}
          </nav>
        </header>

        <main style={{ flex: 1 }}>
          {children}
        </main>

        <footer className="site-footer">
          <p>
            Built with{' '}
            <a href="https://nextjs.org" target="_blank" rel="noreferrer">Next.js</a>
            {' '}·{' '}
            Powered by <strong>@hivelari/sdk</strong>
            {' '}·{' '}
            <a href="https://github.com/hivelari" target="_blank" rel="noreferrer">GitHub</a>
          </p>
        </footer>
      </body>
    </html>
  );
}
