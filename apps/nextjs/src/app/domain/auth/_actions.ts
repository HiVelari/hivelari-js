'use server';

import { getVelariClient } from '@/lib/velari';
import type {
  LoginParams,
  RegisterParams,
  UpdateProfileParams,
} from '@hivelari/nextjs';
import { revalidatePath } from 'next/cache';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

async function getAppBaseUrl() {
  const headersList = await headers();
  return headersList.get('origin');
}

export async function loginAction(params: LoginParams) {
  try {
    const client = await getVelariClient();
    const response = await client.auth.login(params);

    if (response.success && response.data?.token) {
      revalidatePath('/domain/auth');
      return { success: true, user: response.data.user };
    }

    return { success: false, error: 'Authentication failed.' };
  } catch (error: unknown) {
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : 'An error occurred during login.',
    };
  }
}

export async function registerAction(params: RegisterParams) {
  try {
    const client = await getVelariClient();
    const response = await client.auth.register(params);

    if (response.success && response.data?.token) {
      revalidatePath('/domain/auth');
      return { success: true, user: response.data.user };
    }

    return { success: false, error: 'Registration failed.' };
  } catch (error: unknown) {
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : 'An error occurred during registration.',
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
    // local sign-out must always succeed
  }

  revalidatePath('/domain/auth');
  redirect('/domain/auth/login');
}

export async function updateProfileAction(params: UpdateProfileParams) {
  try {
    const client = await getVelariClient();
    const response = await client.auth.updateProfile(params);

    if (response.success && response.data) {
      revalidatePath('/domain/auth');
      return { success: true, user: response.data };
    }

    return { success: false, error: 'Failed to update profile.' };
  } catch (error: unknown) {
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : 'An error occurred during profile update.',
    };
  }
}

export async function initiateEmailVerificationAction() {
  try {
    const client = await getVelariClient();
    const response = await client.auth.initiateEmailVerification();
    return { success: response.success };
  } catch (error: unknown) {
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : 'An error occurred initiating email verification.',
    };
  }
}

export async function initiatePasswordRecoveryAction(email: string) {
  try {
    const client = await getVelariClient();
    const baseUrl = await getAppBaseUrl();
    const response = await client.auth.initiatePasswordRecovery({
      email,
      redirect_url: `${baseUrl}/domain/auth/recovery`,
    });
    return { success: response.success };
  } catch (error: unknown) {
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : 'An error occurred initiating password recovery.',
    };
  }
}

export async function socialRedirectUrlAction(provider: string) {
  try {
    const client = await getVelariClient();
    const baseUrl = await getAppBaseUrl();
    const response = await client.auth.socialRedirectUrl(
      provider,
      `${baseUrl}/domain/auth/callback`,
    );
    return { success: true, redirectUrl: response.data.redirect_url };
  } catch (error: unknown) {
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : 'An error occurred retrieving social redirect URL.',
    };
  }
}

export async function authenticateUsingCodeAction(code: string) {
  try {
    const client = await getVelariClient();
    const response = await client.auth.exchangeCode(code);

    if (response.success && response.data?.token) {
      revalidatePath('/domain/auth');
      return { success: true, user: response.data.user };
    }

    return { success: false, error: 'Authentication failed.' };
  } catch (error: unknown) {
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : 'An error occurred during code authentication.',
    };
  }
}
