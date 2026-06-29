import velariClient from '@/lib/velari';
import type { PersonalProfile } from '@hivelari/sdk';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Personal Profiles — HiVelari SDK',
};

interface PageProps {
  searchParams: Promise<{ search?: string; availability?: string }>;
}

export default async function PersonalProfilesPage({
  searchParams,
}: PageProps) {
  const { search, availability } = await searchParams;

  let profiles:
    | Awaited<ReturnType<typeof velariClient.profile.personal.list>>['data']
    | null = null;
  let errorMessage: string | null = null;

  try {
    const response = await velariClient.profile.personal.list({
      search: search || undefined,
      availability: availability || undefined,
    });
    profiles = response.data;
  } catch (error: unknown) {
    errorMessage = error instanceof Error ? error.message : String(error);
  }

  return (
    <div className="mx-auto max-w-[1040px] px-16 pt-16 pb-28 max-[768px]:max-w-full max-[768px]:px-6 max-[768px]:pt-10 max-[768px]:pb-20">
      <div className="mb-10">
        <p className="mb-2 font-mono text-[11px] font-medium uppercase tracking-[0.1em] text-accent-light">
          profile.personal.list
        </p>
        <h1 className="mb-2.5 text-[28px] font-extrabold tracking-[-0.04em] text-ink">
          Personal profiles
        </h1>
        <p className="text-[14px] leading-[1.7] text-ink-2">
          Profiles are fetched server-side. Each profile can include education,
          work experience, skills, projects, certifications, publications,
          languages, and volunteering history.
        </p>
      </div>

      {errorMessage ? (
        <div className="flex flex-col gap-4 rounded-md border border-line bg-surface p-8">
          <p className="text-[15px] font-semibold text-red">Sandbox offline</p>
          <p className="text-[13.5px] leading-[1.65] text-ink-2">
            Could not reach the API. Make sure the sandbox is running, then
            reload.
          </p>
          <div className="rounded-sm border border-line bg-bg px-5 py-4 font-mono text-[12.5px] text-ink-2">
            <span className="text-accent-light">❯ </span>
            pnpm --filter @hivelari/sandbox run serve
          </div>
          <p className="font-mono text-[11.5px] text-red">{errorMessage}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {(profiles?.data ?? []).map((profile: PersonalProfile) => (
            <Link
              key={profile.id}
              href={`/domain/profiles/personal/${profile.slug}`}
              className="flex flex-col gap-2 rounded-lg border border-line bg-surface p-5 no-underline transition hover:border-accent/40"
            >
              <div className="flex items-center gap-3">
                {profile.gravatarUrl ? (
                  <img
                    src={profile.gravatarUrl}
                    alt={profile.fullName}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/[0.06] text-[16px] font-bold text-ink-2">
                    {profile.firstName[0]}
                    {profile.lastName[0]}
                  </div>
                )}
                <div>
                  <p className="text-[14px] font-bold tracking-[-0.02em] text-ink">
                    {profile.fullName}
                  </p>
                  <p className="text-[12px] text-ink-3">
                    {profile.tagline ?? profile.location}
                  </p>
                </div>
              </div>
              {profile.availability && (
                <span className="self-start rounded-full border border-line px-2 py-0.5 font-mono text-[10px] text-ink-3">
                  {profile.availability}
                </span>
              )}
            </Link>
          ))}
          {(profiles?.data ?? []).length === 0 && (
            <p className="col-span-2 text-[13.5px] text-ink-3">
              No profiles found.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
