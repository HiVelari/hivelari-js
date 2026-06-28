import velariClient from '@/lib/velari';
import type { Metadata } from 'next';
import LoginConsole from './_components/LoginConsole';

export const metadata: Metadata = {
  title: 'Login — HiVelari SDK',
};

export default async function LoginPage() {
  const user = velariClient.user();

  return (
    <div className="mx-auto max-w-[1040px] px-16 pt-16 pb-28 max-[768px]:max-w-full max-[768px]:px-6 max-[768px]:pt-10 max-[768px]:pb-20">
      <div className="mb-10">
        <p className="mb-2 font-mono text-[11px] font-medium uppercase tracking-[0.1em] text-accent-light">
          auth.login
        </p>

        <h1 className="mb-2.5 text-[28px] font-extrabold tracking-[-0.04em] text-ink">
          Login
        </h1>

        <p className="text-[14px] leading-[1.7] text-ink-2">
          Sign in with an email and password. A successful call returns a token
          and user payload, which are persisted in an httpOnly cookie.
        </p>
      </div>

      <LoginConsole initialUser={user} />
    </div>
  );
}
