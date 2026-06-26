'use client';

import { useApp } from '@/providers/AppProviders';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const DOMAINS = [
  { label: 'Authentication', href: '/auth' },
  { label: 'Commerce', href: '/commerce' },
] as const;

function SunIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

function TerminalIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="4 17 10 11 4 5" /><line x1="12" y1="19" x2="20" y2="19" />
    </svg>
  );
}

export default function SiteHeader() {
  const { theme, devMode, toggleTheme, toggleDevMode } = useApp();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 56);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`site-header ${scrolled ? 'site-header--floating' : ''}`}>
      <div className="header-shell">
        <div className="header-top">
          <Link href="/" className="header-brand">
            <Image src="/logo.png" alt="HiVelari" width={22} height={22} className="header-brand-logo" />
            <span className="header-brand-name">HiVelari</span>
            <span className="header-brand-divider">/</span>
            <span className="header-brand-sub">SDK Next.js Example</span>
          </Link>

          <div className="header-controls">
            <button
              type="button"
              className={`hbtn ${devMode ? 'hbtn-dev--on' : ''}`}
              onClick={toggleDevMode}
              title="Toggle developer mode — shows SDK method names"
            >
              <TerminalIcon />
              Dev mode
              <span className={`dev-pip ${devMode ? 'dev-pip--on' : ''}`} />
            </button>

            <button
              type="button"
              className="hbtn hbtn-icon"
              onClick={toggleTheme}
              title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
            </button>
          </div>
        </div>

        {devMode && (
          <div className="dev-ribbon">
            <span style={{ opacity: 0.6 }}>⬡</span>
            <span>Developer mode active — SDK method names are shown throughout the app</span>
          </div>
        )}

        <nav className="header-nav">
          <div className="header-nav-inner">
            {DOMAINS.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className={`nav-link ${pathname.startsWith(href) ? 'nav-link--active' : ''}`}
              >
                {label}
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
}
