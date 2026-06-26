import { authenticateUsingCodeAction } from '@/app/auth/_actions';
import { type NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get('code');

  if (code) {
    const res = await authenticateUsingCodeAction(code);
    if (res.success) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return NextResponse.redirect(new URL('/auth', request.url));
}
