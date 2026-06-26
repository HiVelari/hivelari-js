'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

function GitHubIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <div className="header-inner">
          <Link href="/" className="header-logo">
            <div className="header-logo-mark">H</div>
            <span className="header-logo-name">HiVelari</span>
            <span className="header-logo-tag">SDK</span>
          </Link>

          <nav className="header-nav">
            <a href="#services" className="header-nav-link">Services</a>
            <a href="#how-it-works" className="header-nav-link">How it works</a>
            <a href="#features" className="header-nav-link">Features</a>
          </nav>

          <div className="header-actions">
            <a
              href="https://github.com/hivelari"
              target="_blank"
              rel="noreferrer"
              className="btn btn-ghost btn-sm"
              style={{ gap: 7 }}
            >
              <GitHubIcon />
              GitHub
            </a>
            <a href="#services" className="btn btn-primary btn-sm">
              Get started
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
