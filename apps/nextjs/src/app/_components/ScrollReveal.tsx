'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

export default function ScrollReveal() {
  const pathname = usePathname();
  const observerRef = useRef<IntersectionObserver | null>(null);

  // biome-ignore lint/correctness/useExhaustiveDependencies: pathname is an intentional trigger dep — not read inside, used to re-run on navigation
  useEffect(() => {
    const reduce = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    observerRef.current?.disconnect();

    const raf = requestAnimationFrame(() => {
      const els = Array.from(
        document.querySelectorAll<HTMLElement>('[data-reveal]'),
      );

      for (const el of els) el.classList.remove('is-visible');

      if (reduce || !('IntersectionObserver' in window)) {
        for (const el of els) el.classList.add('is-visible');
        return;
      }

      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              observer.unobserve(entry.target);
            }
          }
        },
        { rootMargin: '0px 0px -10% 0px', threshold: 0.12 },
      );

      for (const el of els) observer.observe(el);
      observerRef.current = observer;
    });

    return () => {
      cancelAnimationFrame(raf);
      observerRef.current?.disconnect();
    };
  }, [pathname]);

  return null;
}
