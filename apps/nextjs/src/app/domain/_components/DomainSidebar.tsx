"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const NAV: Array<
  | { label: string; href: string; exact: boolean }
  | { group: string; items: { label: string; href: string }[] }
> = [
  { label: "Overview", href: "/domain", exact: true },
  {
    group: "Authentication",
    items: [
      { label: "Overview", href: "/domain/auth" },
      { label: "Login", href: "/domain/auth/login" },
      { label: "Register", href: "/domain/auth/register" },
      { label: "OAuth", href: "/domain/auth/oauth" },
      { label: "Profile", href: "/domain/auth/profile" },
      { label: "Password recovery", href: "/domain/auth/recovery" },
    ],
  },
  {
    group: "Commerce",
    items: [
      { label: "Overview", href: "/domain/commerce" },
      { label: "Products", href: "/domain/commerce/products" },
    ],
  },
];

function LockIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="21" r="1" />
      <circle cx="20" cy="21" r="1" />
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

const GROUP_ICONS: Record<string, React.ReactNode> = {
  Authentication: <LockIcon />,
  Commerce: <CartIcon />,
};

function SidebarContent({ onLinkClick }: { onLinkClick?: () => void }) {
  const pathname = usePathname();

  return (
    <>
      <div className="sidebar-brand">
        <Link href="/" className="sidebar-brand-link" onClick={onLinkClick}>
          <div className="sidebar-brand-mark">H</div>
          <div>
            <div className="sidebar-brand-name">HiVelari</div>
            <div className="sidebar-brand-sub">SDK Explorer</div>
          </div>
        </Link>
      </div>

      <div className="domain-sidebar-inner">
        <div className="sidebar-heading">Domains</div>
        <nav className="sidebar-nav">
          {NAV.map((item) => {
            if ("href" in item) {
              const active = item.exact
                ? pathname === item.href
                : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onLinkClick}
                  className={`sidebar-link ${active ? "sidebar-link--active" : ""}`}
                >
                  {item.label}
                </Link>
              );
            }

            return (
              <div key={item.group} className="sidebar-group">
                <div className="sidebar-group-label">
                  <span className="sidebar-group-icon">{GROUP_ICONS[item.group]}</span>
                  {item.group}
                </div>
                <div className="sidebar-group-items">
                  {item.items.map((sub) => {
                    const active = pathname === sub.href;
                    return (
                      <Link
                        key={sub.href}
                        href={sub.href}
                        onClick={onLinkClick}
                        className={`sidebar-link sidebar-link--sub ${active ? "sidebar-link--active" : ""}`}
                      >
                        {sub.label}
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </nav>
      </div>
    </>
  );
}

export default function DomainSidebar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Close drawer on route change
  useEffect(() => { setOpen(false); }, [pathname]);

  // Lock body scroll when drawer open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      {/* ── Desktop sidebar ── */}
      <aside className="domain-sidebar domain-sidebar--desktop">
        <SidebarContent />
      </aside>

      {/* ── Mobile top bar ── */}
      <div className="domain-mobile-bar">
        <Link href="/" className="sidebar-brand-link">
          <div className="sidebar-brand-mark" style={{ width: 26, height: 26, fontSize: 12 }}>H</div>
          <span className="sidebar-brand-name">HiVelari SDK</span>
        </Link>
        <button
          type="button"
          className="domain-menu-btn"
          onClick={() => setOpen(true)}
          aria-label="Open navigation"
        >
          <MenuIcon />
        </button>
      </div>

      {/* ── Mobile drawer ── */}
      {open && (
        <div className="domain-overlay" onClick={() => setOpen(false)} aria-hidden="true" />
      )}
      <aside className={`domain-sidebar domain-sidebar--drawer ${open ? "domain-sidebar--open" : ""}`}>
        <button
          type="button"
          className="drawer-close-btn"
          onClick={() => setOpen(false)}
          aria-label="Close navigation"
        >
          <CloseIcon />
        </button>
        <SidebarContent onLinkClick={() => setOpen(false)} />
      </aside>
    </>
  );
}
