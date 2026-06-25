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
  const isTestMode = process.env.HIVELARI_TEST_MODE === 'true';

  return createEnv({
    server: {
      HIVELARI_TEST_MODE: z
        .preprocess((val) => val === 'true', z.boolean())
        .default(false),
      VELARI_SPACE_ID: isTestMode
        ? z.string().default('space_mock_123')
        : z.string().min(1, 'VELARI_SPACE_ID is required'),
      VELARI_PUBLIC_KEY: isTestMode
        ? z.string().default('pub_mock_123')
        : z.string().min(1, 'VELARI_PUBLIC_KEY is required'),
      VELARI_SECRET_KEY: isTestMode
        ? z.string().default('sec_mock_123')
        : z.string().min(1, 'VELARI_SECRET_KEY is required'),
      VELARI_API_URL: z.string().url().default('https://api.hivelari.com'),
    },
    runtimeEnv: process.env,
    emptyStringAsUndefined: true,
  });
}
