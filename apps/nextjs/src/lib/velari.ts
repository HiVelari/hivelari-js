import { VelariNext } from '@hivelari/nextjs';

export async function getVelariClient() {
  return VelariNext.init();
}

export async function getAuthSession() {
  const client = await VelariNext.init();
  return { user: client.user(), token: client.getToken() };
}
