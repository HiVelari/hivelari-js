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

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        {/* Top: brand + columns */}
        <div className="footer-top">
          <div className="footer-brand-col">
            <div className="footer-logo">
              <div className="footer-logo-mark">H</div>
              <span className="footer-logo-name">HiVelari SDK</span>
            </div>
            <p className="footer-tagline">
              The official SDK for building on HiVelari.
              <br />
              Server-only. Fully typed. App Router native.
            </p>
            <span className="pill pill-green" style={{ alignSelf: "flex-start" }}>
              Early access
            </span>
          </div>

          <div className="footer-cols">
            {Object.entries(LINKS).map(([heading, items]) => (
              <div key={heading} className="footer-col">
                <h4 className="footer-col-heading">{heading}</h4>
                <ul className="footer-col-list">
                  {items.map((item) => (
                    <li key={item.label}>
                      <a
                        href={item.href}
                        className="footer-col-link"
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
                            style={{ display: "inline", marginLeft: 4, opacity: 0.5 }}
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
        <div className="footer-bottom">
          <span className="footer-copy">
            &copy; {year} HiVelari. All rights reserved.
          </span>
          <div className="footer-bottom-links">
            <a href="#" className="footer-col-link">Privacy</a>
            <a href="#" className="footer-col-link">Terms</a>
            <a
              href="https://www.npmjs.com/package/@hivelari/sdk"
              target="_blank"
              rel="noreferrer"
              className="footer-col-link"
            >
              @hivelari/sdk
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
