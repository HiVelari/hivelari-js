"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { LockIcon } from "@/app/_icons/LockIcon";
import { CartIcon } from "@/app/_icons/CartIcon";
import { MenuIcon } from "@/app/_icons/MenuIcon";
import { CloseIcon } from "@/app/_icons/CloseIcon";

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

const GROUP_ICONS: Record<string, React.ReactNode> = {
  Authentication: <LockIcon size={12} />,
  Commerce: <CartIcon size={12} />,
};

const ICON_BTN =
  "flex size-9 cursor-pointer items-center justify-center rounded-sm border border-line bg-white/[0.06] text-ink-2 transition hover:bg-white/10 hover:text-ink";

const LINK_BASE =
  "block rounded-sm px-3 py-[7px] text-[13.5px] font-[450] tracking-[-0.01em] text-ink-2 no-underline transition-[color,background] hover:bg-white/[0.04] hover:text-ink";
const LINK_ACTIVE =
  "sidebar-link--active relative bg-white/[0.06] font-medium !text-ink";

function SidebarContent({ onLinkClick }: { onLinkClick?: () => void }) {
  const pathname = usePathname();

  return (
    <>
      <div className="shrink-0 border-b border-line px-5 pt-5 pb-4">
        <Link
          href="/"
          className="flex items-center gap-2.5 no-underline"
          onClick={onLinkClick}
        >
          <Image
            src="/logo.png"
            alt="HiVelari"
            width={28}
            height={28}
            className="size-7 shrink-0 rounded-md object-contain"
            priority
          />
          <div>
            <div className="text-[14px] font-bold leading-[1.2] tracking-[-0.04em] text-ink">
              HiVelari
            </div>
            <div className="text-[11px] leading-[1.2] tracking-[0.01em] text-ink-3">
              SDK Explorer
            </div>
          </div>
        </Link>
      </div>

      <div className="flex-1 px-4 pt-6 pb-12">
        <div className="mb-4 px-3 text-[11px] font-semibold uppercase tracking-[0.09em] text-ink-3">
          Domains
        </div>
        <nav className="flex flex-col gap-0.5">
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
                  className={`${LINK_BASE} ${active ? LINK_ACTIVE : ""}`}
                >
                  {item.label}
                </Link>
              );
            }

            return (
              <div key={item.group} className="mt-5">
                <div className="mb-1.5 flex items-center gap-[7px] px-3 text-[12px] font-semibold tracking-[0.01em] text-ink-2">
                  <span className="flex text-ink-3">{GROUP_ICONS[item.group]}</span>
                  {item.group}
                </div>
                <div className="flex flex-col gap-px">
                  {item.items.map((sub) => {
                    const active = pathname === sub.href;
                    return (
                      <Link
                        key={sub.href}
                        href={sub.href}
                        onClick={onLinkClick}
                        className={`${LINK_BASE} pl-7 text-[13px] ${active ? LINK_ACTIVE : ""}`}
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

  useEffect(() => { setOpen(false); }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      {/* ── Desktop sidebar ── */}
      <aside className="thin-scroll flex h-[100dvh] w-64 shrink-0 flex-col overflow-x-hidden overflow-y-auto border-r border-line bg-raised max-[768px]:hidden">
        <SidebarContent />
      </aside>

      {/* ── Mobile top bar ── */}
      <div className="relative z-[100] hidden h-14 shrink-0 items-center justify-between border-b border-line bg-raised px-4 max-[768px]:flex">
        <Link href="/" className="flex items-center gap-2.5 no-underline">
          <Image
            src="/logo.png"
            alt="HiVelari"
            width={26}
            height={26}
            className="size-[26px] shrink-0 rounded-md object-contain"
            priority
          />
          <span className="text-[14px] font-bold tracking-[-0.04em] text-ink">
            HiVelari SDK
          </span>
        </Link>
        <button
          type="button"
          className={ICON_BTN}
          onClick={() => setOpen(true)}
          aria-label="Open navigation"
        >
          <MenuIcon />
        </button>
      </div>

      {/* ── Mobile drawer backdrop ── */}
      {open && (
        <div
          className="fixed inset-0 z-[200] hidden animate-[fadeIn_0.2s_ease] bg-[rgba(5,5,9,0.7)] backdrop-blur-[2px] max-[768px]:block"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* ── Mobile drawer ── */}
      <aside
        className={`thin-scroll fixed inset-y-0 left-0 z-[300] hidden h-[100dvh] w-[272px] flex-col overflow-x-hidden overflow-y-auto border-r border-line bg-raised transition-transform duration-[320ms] ease-[cubic-bezier(0.16,1,0.3,1)] max-[768px]:flex ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          type="button"
          className={`absolute right-4 top-4 z-10 ${ICON_BTN}`}
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
