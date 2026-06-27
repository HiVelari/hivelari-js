import type { Metadata } from 'next';
import OAuthConsole from './_components/OAuthConsole';

export const metadata: Metadata = {
  title: 'OAuth — HiVelari SDK',
};

export default function OAuthPage() {
  return (
    <div className="mx-auto max-w-[1040px] px-16 pt-16 pb-28 max-[768px]:max-w-full max-[768px]:px-6 max-[768px]:pt-10 max-[768px]:pb-20">
      <div className="mb-10">
        <p className="mb-2 font-mono text-[11px] font-medium uppercase tracking-[0.1em] text-accent-light">
          auth.socialRedirectUrl
        </p>
        <h1 className="mb-2.5 text-[28px] font-extrabold tracking-[-0.04em] text-ink">
          OAuth
        </h1>
        <p className="text-[14px] leading-[1.7] text-ink-2">
          Social sign-in via Google or GitHub. The SDK returns a redirect URL;
          after the provider redirects back, the code is exchanged for a session.
        </p>
      </div>
      <OAuthConsole />
    </div>
  );
}
