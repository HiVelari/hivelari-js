import type { Metadata } from 'next';
import Link from 'next/link';
import LockIcon from '@/app/_icons/lock.svg';
import InfoIcon from '@/app/_icons/info.svg';

export const metadata: Metadata = {
  title: 'Authentication — HiVelari SDK',
};

const PAGES = [
  {
    label: 'Login',
    href: '/domain/auth/login',
    desc: 'Sign in with email and password using client.auth.login().',
    method: 'client.auth.login()',
  },
  {
    label: 'Register',
    href: '/domain/auth/register',
    desc: 'Create a new user account with client.auth.register().',
    method: 'client.auth.register()',
  },
  {
    label: 'OAuth',
    href: '/domain/auth/oauth',
    desc: 'Social sign-in via Google or GitHub using client.auth.socialRedirectUrl().',
    method: 'client.auth.socialRedirectUrl()',
  },
  {
    label: 'Profile',
    href: '/domain/auth/profile',
    desc: 'View and edit your profile with client.auth.updateProfile().',
    method: 'client.auth.updateProfile()',
  },
  {
    label: 'Password Recovery',
    href: '/domain/auth/recovery',
    desc: 'Send a recovery email via client.auth.initiatePasswordRecovery().',
    method: 'client.auth.initiatePasswordRecovery()',
  },
];

export default function AuthOverviewPage() {
  return (
    <div className="mx-auto max-w-[920px] px-16 pt-16 pb-28 max-[768px]:max-w-full max-[768px]:px-6 max-[768px]:pt-10 max-[768px]:pb-20">
      <div className="mb-10">
        <p className="mb-2.5 font-mono text-[11px] font-medium uppercase tracking-[0.1em] text-accent-light">
          Domain
        </p>
        <div className="mb-3 flex items-center gap-3">
          <div className="flex size-9 items-center justify-center rounded-sm border border-line-accent bg-accent-dim text-accent-light">
            <LockIcon width={18} height={18} />
          </div>
          <h1 className="text-[32px] font-extrabold tracking-[-0.05em] text-ink max-[768px]:text-[26px]">
            Authentication
          </h1>
        </div>
        <p className="max-w-[520px] text-[15px] leading-[1.7] text-ink-2">
          Identity and access management. Login, register, OAuth flows, session
          management, profile updates, and password recovery — all through a
          single <code className="inline-code">Velari</code> client.
        </p>
      </div>

      <div className="mb-8 grid grid-cols-2 gap-3 max-[640px]:grid-cols-1">
        {PAGES.map((page, i) => (
          <Link
            key={page.href}
            href={page.href}
            data-reveal
            data-reveal-delay={i + 1}
            className="group flex flex-col gap-3 rounded-md border border-line bg-surface p-6 no-underline transition-[border-color,background,transform] duration-200 hover:-translate-y-[3px] hover:border-line-accent hover:bg-surface-2"
          >
            <div>
              <p className="mb-1 text-[15px] font-semibold tracking-[-0.03em] text-ink">
                {page.label}
              </p>
              <p className="text-[13px] leading-[1.6] text-ink-2">{page.desc}</p>
            </div>
            <code className="sdk-badge self-start">{page.method}</code>
          </Link>
        ))}
      </div>

      <div className="flex gap-4 rounded-md border border-line bg-surface p-5 max-[640px]:flex-col max-[640px]:gap-3">
        <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-sm border border-line-accent bg-accent-dim text-accent-light">
          <InfoIcon width={16} height={16} />
        </div>
        <p className="text-[13px] leading-[1.65] text-ink-2">
          Each page is a live interactive playground. Actions call the real SDK
          and log responses in real time — no mocks.
        </p>
      </div>
    </div>
  );
}
