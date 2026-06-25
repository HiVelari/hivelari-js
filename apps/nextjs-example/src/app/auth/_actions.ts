'use server';

import { getVelariClient } from '@/lib/velari';
import type {
  LoginParams,
  RegisterParams,
  UpdateProfileParams,
} from '@hivelari/sdk';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function loginAction(params: LoginParams) {
  try {
    const client = await getVelariClient();
    const response = await client.auth.login(params);

    if (response.success && response.data?.token) {
      const cookieStore = await cookies();
      cookieStore.set('velari_token', response.data.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7, // 1 week
      });
      cookieStore.set('velari_user', JSON.stringify(response.data.user), {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7, // 1 week
      });

      revalidatePath('/');
      return { success: true, user: response.data.user };
    }

    return { success: false, error: 'Authentication failed.' };
  } catch (error: unknown) {
    const message =
      error instanceof Error
        ? error.message
        : 'An error occurred during login.';
    return {
      success: false,
      error: message,
    };
  }
}

export async function registerAction(params: RegisterParams) {
  try {
    const client = await getVelariClient();
    const response = await client.auth.register(params);

    if (response.success && response.data?.token) {
      const cookieStore = await cookies();
      cookieStore.set('velari_token', response.data.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7, // 1 week
      });
      cookieStore.set('velari_user', JSON.stringify(response.data.user), {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7, // 1 week
      });

      revalidatePath('/');
      return { success: true, user: response.data.user };
    }

    return { success: false, error: 'Registration failed.' };
  } catch (error: unknown) {
    const message =
      error instanceof Error
        ? error.message
        : 'An error occurred during registration.';
    return {
      success: false,
      error: message,
    };
  }
}

export async function logoutAction() {
  try {
    const client = await getVelariClient();
    if (client.isAuthenticated()) {
      await client.auth.logout();
    }
  } catch (_e) {
    // Ignore API errors during logout to guarantee local signout succeeds
  }

  const cookieStore = await cookies();
  cookieStore.delete('velari_token');
  cookieStore.delete('velari_user');

  revalidatePath('/');
  redirect('/');
}

export async function updateProfileAction(params: UpdateProfileParams) {
  try {
    const client = await getVelariClient();
    const response = await client.auth.updateProfile(params);
    if (response.success && response.data) {
      const cookieStore = await cookies();
      cookieStore.set('velari_user', JSON.stringify(response.data), {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7,
      });
      revalidatePath('/');
      return { success: true, user: response.data };
    }
    return { success: false, error: 'Failed to update profile.' };
  } catch (error: unknown) {
    const message =
      error instanceof Error
        ? error.message
        : 'An error occurred during profile update.';
    return {
      success: false,
      error: message,
    };
  }
}

export async function initiateEmailVerificationAction() {
  try {
    const client = await getVelariClient();
    const response = await client.auth.initiateEmailVerification();
    return { success: response.success };
  } catch (error: unknown) {
    const message =
      error instanceof Error
        ? error.message
        : 'An error occurred initiating email verification.';
    return {
      success: false,
      error: message,
    };
  }
}

export async function initiatePasswordRecoveryAction(email: string) {
  try {
    const client = await getVelariClient();
    const response = await client.auth.initiatePasswordRecovery({
      email,
      redirect_url: 'http://localhost:3000/auth/reset-password',
    });
    return { success: response.success };
  } catch (error: unknown) {
    const message =
      error instanceof Error
        ? error.message
        : 'An error occurred initiating password recovery.';
    return {
      success: false,
      error: message,
    };
  }
}

export async function socialRedirectUrlAction(provider: string) {
  try {
    const client = await getVelariClient();
    const response = await client.auth.socialRedirectUrl(provider);
    return {
      success: response.success,
      redirectUrl: response.data.redirect_url,
    };
  } catch (error: unknown) {
    const message =
      error instanceof Error
        ? error.message
        : 'An error occurred retrieving social redirect URL.';
    return {
      success: false,
      error: message,
    };
  }
}
