import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Profiles — HiVelari SDK',
};

export default function ProfilesOverviewPage() {
  return (
    <div className="mx-auto max-w-[1040px] px-16 pt-16 pb-28 max-[768px]:max-w-full max-[768px]:px-6 max-[768px]:pt-10 max-[768px]:pb-20">
      <div className="mb-10">
        <p className="mb-2 font-mono text-[11px] font-medium uppercase tracking-[0.1em] text-accent-light">
          profile
        </p>
        <h1 className="mb-2.5 text-[28px] font-extrabold tracking-[-0.04em] text-ink">
          Profiles domain
        </h1>
        <p className="text-[14px] leading-[1.7] text-ink-2">
          A space can host multiple personal and business profiles — each a
          rich, portfolio-grade page of structured data. Clients read profiles
          via{' '}
          <code className="rounded border border-line bg-surface px-1.5 py-0.5 font-mono text-[12px]">
            client.profile.personal
          </code>{' '}
          and{' '}
          <code className="rounded border border-line bg-surface px-1.5 py-0.5 font-mono text-[12px]">
            client.profile.business
          </code>
          .
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Link
          href="/domain/profiles/personal"
          className="group flex flex-col gap-2 rounded-lg border border-line bg-surface p-6 no-underline transition hover:border-accent/40 hover:bg-surface/80"
        >
          <p className="font-mono text-[11px] font-medium uppercase tracking-[0.1em] text-accent-light">
            profile.personal
          </p>
          <h2 className="text-[17px] font-bold tracking-[-0.03em] text-ink">
            Personal Profiles
          </h2>
          <p className="text-[13.5px] leading-[1.65] text-ink-2">
            Full portfolio profiles for individuals — education, experience,
            skills, projects, certifications, publications, and more.
          </p>
        </Link>

        <Link
          href="/domain/profiles/business"
          className="group flex flex-col gap-2 rounded-lg border border-line bg-surface p-6 no-underline transition hover:border-accent/40 hover:bg-surface/80"
        >
          <p className="font-mono text-[11px] font-medium uppercase tracking-[0.1em] text-accent-light">
            profile.business
          </p>
          <h2 className="text-[17px] font-bold tracking-[-0.03em] text-ink">
            Business Profiles
          </h2>
          <p className="text-[13.5px] leading-[1.65] text-ink-2">
            Rich business portfolio pages with services, team, gallery, awards,
            clients, milestones, hours, FAQs, and case studies.
          </p>
        </Link>
      </div>
    </div>
  );
}
