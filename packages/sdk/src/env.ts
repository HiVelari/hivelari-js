import 'server-only';
import { createEnv } from '@t3-oss/env-core';
import { z } from 'zod';

export function assertServer(): void {
  if (typeof window !== 'undefined') {
    throw new Error(
      'This package is server-only and cannot be executed in the browser.',
    );
  }
}

export function getValidatedEnv() {
  assertServer();

  return createEnv({
    server: {
      VELARI_SPACE_ID: z.string().min(1, 'VELARI_SPACE_ID is required'),
      VELARI_PUBLIC_KEY: z.string().min(1, 'VELARI_PUBLIC_KEY is required'),
      VELARI_SECRET_KEY: z.string().min(1, 'VELARI_SECRET_KEY is required'),
      VELARI_API_URL: z.string().url().default('https://api.hivelari.com'),
    },
    runtimeEnv: process.env,
    emptyStringAsUndefined: true,
  });
}
