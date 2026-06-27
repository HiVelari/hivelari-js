'use client';

import { useApp } from '@/providers/AppProviders';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import SunIcon from '@/app/_icons/sun.svg';
import MoonIcon from '@/app/_icons/moon.svg';
import TerminalIcon from '@/app/_icons/terminal.svg';

const DOMAINS = [
  { label: 'Authentication', href: '/auth' },
  { label: 'Commerce', href: '/commerce' },
] as const;

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
    <header
      className={`site-header ${scrolled ? 'site-header--floating' : ''}`}
    >
      <div className="header-shell">
        <div className="header-top">
          <Link href="/" className="header-brand">
            <Image
              src="/logo.png"
              alt="HiVelari"
              width={22}
              height={22}
              className="header-brand-logo"
            />
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
              <TerminalIcon width={13} height={13} />
              Dev mode
              <span className={`dev-pip ${devMode ? 'dev-pip--on' : ''}`} />
            </button>

            <button
              type="button"
              className="hbtn hbtn-icon"
              onClick={toggleTheme}
              title={
                theme === 'dark'
                  ? 'Switch to light mode'
                  : 'Switch to dark mode'
              }
            >
              {theme === 'dark' ? (
                <SunIcon width={15} height={15} />
              ) : (
                <MoonIcon width={15} height={15} />
              )}
            </button>
          </div>
        </div>

        {devMode && (
          <div className="dev-ribbon">
            <span style={{ opacity: 0.6 }}>⬡</span>
            <span>
              Developer mode active — SDK method names are shown throughout the
              app
            </span>
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
