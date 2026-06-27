"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export default function ScrollReveal() {
  const pathname = usePathname();
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    observerRef.current?.disconnect();

    const raf = requestAnimationFrame(() => {
      const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));

      els.forEach((el) => el.classList.remove("is-visible"));

      if (reduce || !("IntersectionObserver" in window)) {
        els.forEach((el) => el.classList.add("is-visible"));
        return;
      }

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              observer.unobserve(entry.target);
            }
          });
        },
        { rootMargin: "0px 0px -10% 0px", threshold: 0.12 },
      );

      els.forEach((el) => observer.observe(el));
      observerRef.current = observer;
    });

    return () => {
      cancelAnimationFrame(raf);
      observerRef.current?.disconnect();
    };
  }, [pathname]);

  return null;
}
