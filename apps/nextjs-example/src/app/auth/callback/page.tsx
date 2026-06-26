import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { authenticateUsingCodeAction } from '../_actions';

export const metadata: Metadata = {
  title: 'Social Auth Callback | HiVelari',
  description: 'Authenticating your social login session...',
};

interface CallbackProps {
  searchParams: Promise<{
    code?: string;
  }>;
}

export default async function AuthCallbackPage({
  searchParams,
}: CallbackProps) {
  const params = await searchParams;
  const code = params.code;

  if (code) {
    const res = await authenticateUsingCodeAction(code);

    if (res.success) {
      redirect('/');
    }
  }

  // Redirect to authentication gateway if code is missing or authentication fails
  redirect('/auth');
}
