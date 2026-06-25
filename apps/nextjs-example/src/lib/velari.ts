import { Velari } from '@hivelari/sdk';
import { cookies } from 'next/headers';

// Helper to retrieve the authentication session (token & user) from cookies
export async function getAuthSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get('velari_token')?.value;
  const userJson = cookieStore.get('velari_user')?.value;
  let user = undefined;

  if (userJson) {
    try {
      user = JSON.parse(userJson);
    } catch (_e) {}
  }

  return { token, user };
}

// Instantiate and configure Velari SDK client dynamically per-request
export async function getVelariClient() {
  const { token, user } = await getAuthSession();
  return new Velari({ token, user });
}
