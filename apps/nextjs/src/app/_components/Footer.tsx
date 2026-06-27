const LINKS = {
  SDK: [
    { label: "npm package", href: "https://www.npmjs.com/package/@hivelari/sdk", external: true },
    { label: "Changelog", href: "#", external: false },
    { label: "Releases", href: "https://github.com/hivelari", external: true },
  ],
  Domains: [
    { label: "Authentication", href: "/domain/auth", external: false },
    { label: "Commerce", href: "/domain/commerce", external: false },
    { label: "More coming soon", href: "#", external: false },
  ],
  Connect: [
    { label: "GitHub", href: "https://github.com/hivelari", external: true },
    { label: "HiVelari", href: "https://hivelari.com", external: true },
  ],
};

const LINK_CLASS =
  "inline-flex items-center gap-[3px] text-[13px] text-ink-3 no-underline transition-colors hover:text-ink-2";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-line pt-24 pb-12 max-[768px]:pt-16 max-[768px]:pb-10">
      <div className="container">
        {/* Top: brand + columns */}
        <div className="mb-9 grid grid-cols-[300px_1fr] gap-20 border-b border-line pb-16 max-[768px]:mb-7 max-[768px]:grid-cols-1 max-[768px]:gap-10 max-[768px]:pb-10">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <div className="flex size-6 shrink-0 items-center justify-center rounded-md bg-accent text-[12px] font-extrabold text-white">
                H
              </div>
              <span className="text-[14px] font-bold tracking-[-0.03em] text-ink">
                HiVelari SDK
              </span>
            </div>
            <p className="text-[14px] leading-[1.75] text-ink-3">
              The official SDK for building on HiVelari.
              <br />
              Server-only. Fully typed. App Router native.
            </p>
            <span className="pill pill-green self-start">Early access</span>
          </div>

          <div className="grid grid-cols-3 gap-8 max-[768px]:gap-6 max-[520px]:grid-cols-2 max-[520px]:gap-x-[18px] max-[520px]:gap-y-[22px]">
            {Object.entries(LINKS).map(([heading, items]) => (
              <div key={heading}>
                <h4 className="mb-4 text-[12px] font-semibold uppercase tracking-[0.04em] text-ink">
                  {heading}
                </h4>
                <ul className="flex list-none flex-col gap-3.5">
                  {items.map((item) => (
                    <li key={item.label}>
                      <a
                        href={item.href}
                        className={LINK_CLASS}
                        target={item.external ? "_blank" : undefined}
                        rel={item.external ? "noreferrer" : undefined}
                      >
                        {item.label}
                        {item.external && (
                          <svg
                            width="10"
                            height="10"
                            viewBox="0 0 12 12"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            className="ml-1 inline opacity-50"
                          >
                            <path d="M2 10L10 2M10 2H5M10 2V7" />
                          </svg>
                        )}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 max-[768px]:flex-col max-[768px]:items-start max-[768px]:gap-3.5">
          <span className="text-[13px] text-ink-3">
            &copy; {year} HiVelari. All rights reserved.
          </span>
          <div className="flex items-center gap-5">
            <a href="#" className={LINK_CLASS}>Privacy</a>
            <a href="#" className={LINK_CLASS}>Terms</a>
            <a
              href="https://www.npmjs.com/package/@hivelari/sdk"
              target="_blank"
              rel="noreferrer"
              className={LINK_CLASS}
            >
              @hivelari/sdk
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
