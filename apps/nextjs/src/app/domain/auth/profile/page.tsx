import type { Metadata } from 'next';
import { getAuthSession } from '@/lib/velari';
import ProfileConsole from './_components/ProfileConsole';

export const metadata: Metadata = {
  title: 'Profile — HiVelari SDK',
};

export default async function ProfilePage() {
  const { user } = await getAuthSession();
  return (
    <div className="mx-auto max-w-[1040px] px-16 pt-16 pb-28 max-[768px]:max-w-full max-[768px]:px-6 max-[768px]:pt-10 max-[768px]:pb-20">
      <div className="mb-10">
        <p className="mb-2 font-mono text-[11px] font-medium uppercase tracking-[0.1em] text-accent-light">
          auth.updateProfile
        </p>
        <h1 className="mb-2.5 text-[28px] font-extrabold tracking-[-0.04em] text-ink">
          Profile
        </h1>
        <p className="text-[14px] leading-[1.7] text-ink-2">
          View and edit the authenticated user's profile. Also demonstrates
          email verification, password recovery, and sign-out.
        </p>
      </div>
      <ProfileConsole initialUser={user} />
    </div>
  );
}
