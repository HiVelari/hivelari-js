import { Velari } from '@hivelari/sdk';
import { cookies } from 'next/headers';

export async function getAuthSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get('velari_token')?.value;
  const userJson = cookieStore.get('velari_user')?.value;

  let user = undefined;
  if (userJson) {
    try {
      user = JSON.parse(userJson);
    } catch (_) {}
  }

  return { token, user };
}

export async function getVelariClient() {
  const { token, user } = await getAuthSession();
  return new Velari({ token, user });
}
