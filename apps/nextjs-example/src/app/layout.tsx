import SiteHeader from '@/app/_components/SiteHeader';
import { AppProviders } from '@/providers/AppProviders';
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: { default: 'HiVelari SDK Demo', template: '%s | HiVelari SDK' },
  description: 'Next.js example app for the @hivelari/sdk — authentication, commerce, and more.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/*
        Inline script sets data-theme before paint to prevent flash of wrong theme.
        Must be synchronous and in <head>.
      */}
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('hvl-theme');if(t==='light'||t==='dark'){document.documentElement.setAttribute('data-theme',t);return;}var p=window.matchMedia('(prefers-color-scheme:light)').matches;document.documentElement.setAttribute('data-theme',p?'light':'dark');}catch(e){}})();`,
          }}
        />
      </head>
      <body suppressHydrationWarning>
        <AppProviders>
          <SiteHeader />
          <main style={{ flex: 1 }}>
            {children}
          </main>
          <footer className="site-footer">
            <span>
              Powered by{' '}
              <a href="https://github.com/hivelari" target="_blank" rel="noreferrer">@hivelari/sdk</a>
              {' '}· Next.js example
            </span>
            <span>HiVelari &copy; {new Date().getFullYear()}</span>
          </footer>
        </AppProviders>
      </body>
    </html>
  );
}
