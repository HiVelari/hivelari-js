import type { Metadata } from 'next';
import RecoveryConsole from './_components/RecoveryConsole';

export const metadata: Metadata = {
  title: 'Password Recovery — HiVelari SDK',
};

export default function RecoveryPage() {
  return (
    <div className="mx-auto max-w-[1040px] px-16 pt-16 pb-28 max-[768px]:max-w-full max-[768px]:px-6 max-[768px]:pt-10 max-[768px]:pb-20">
      <div className="mb-10">
        <p className="mb-2 font-mono text-[11px] font-medium uppercase tracking-[0.1em] text-accent-light">
          auth.initiatePasswordRecovery
        </p>
        <h1 className="mb-2.5 text-[28px] font-extrabold tracking-[-0.04em] text-ink">
          Password Recovery
        </h1>
        <p className="text-[14px] leading-[1.7] text-ink-2">
          Send a password reset email. The SDK emails the user a link with a
          redirect back to your app where they can set a new password.
        </p>
      </div>
      <RecoveryConsole />
    </div>
  );
}
