'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import GitHubIcon from '@/app/_icons/github.svg';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handler, { passive: true });
    handler();
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-[100] flex justify-center px-12 pt-9 max-[900px]:px-3.5 max-[900px]:pt-3.5">
      <div
        className={`header-pill flex items-center ${scrolled ? 'header-pill--float' : ''}`}
      >
        <Link href="/" className="mr-auto flex shrink-0 items-center gap-2.5">
          <Image
            src="/logo.png"
            alt="HiVelari"
            width={28}
            height={28}
            className="size-8 shrink-0 rounded-lg object-contain"
            priority
          />
          <span className="text-[15px] font-bold tracking-[-0.04em] text-ink">
            HiVelari
          </span>
          <span className="rounded-full border border-line-accent bg-accent-dim px-[7px] py-0.5 font-mono text-[11px] font-medium tracking-[0.02em] text-accent-light">
            SDK
          </span>
        </Link>

        <div className="flex items-center gap-2 max-[600px]:gap-1.5">
          <a
            href="https://github.com/hivelari"
            target="_blank"
            rel="noreferrer"
            className="btn btn-ghost btn-sm max-[600px]:hidden"
          >
            <GitHubIcon width={16} height={16} />
            GitHub
          </a>
          <Link href="/domain" className="btn btn-primary btn-sm">
            Get started
          </Link>
        </div>
      </div>
    </header>
  );
}
