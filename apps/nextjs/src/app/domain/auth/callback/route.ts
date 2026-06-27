import { authenticateUsingCodeAction } from '../_actions';
import { type NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get('code');

  if (!code) {
    return NextResponse.redirect(new URL('/domain/auth/oauth', request.url));
  }

  const result = await authenticateUsingCodeAction(code);

  if (result.success) {
    return NextResponse.redirect(new URL('/domain/auth/profile', request.url));
  }

  return NextResponse.redirect(new URL('/domain/auth/oauth', request.url));
}
