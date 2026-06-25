import dotenv from 'dotenv';
dotenv.config({ override: true });

// Disable local SSL certificate validation for playground testing
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

import { Velari } from '@hivelari/sdk';

// Save original credentials from .env
const originalApiUrl = process.env.VELARI_API_URL || 'https://api.hivelari.test';
const originalSpaceId = process.env.VELARI_SPACE_ID || '';
const originalPublicKey = process.env.VELARI_PUBLIC_KEY || '';
const originalSecretKey = process.env.VELARI_SECRET_KEY || '';

export let isTestMode = process.env.HIVELARI_TEST_MODE === 'true';

// Set initial env based on test mode
if (isTestMode) {
  process.env.VELARI_API_URL = 'http://localhost:3001';
  process.env.VELARI_SPACE_ID = '01kvghz9025fpz6sj6dy9wyfnw';
  process.env.VELARI_PUBLIC_KEY = 'hvl_pub_mock_123';
  process.env.VELARI_SECRET_KEY = 'hvl_sec_mock_123';
}

export let client = new Velari();

export function toggleTestMode(): void {
  isTestMode = !isTestMode;
  if (isTestMode) {
    process.env.VELARI_API_URL = 'http://localhost:3001';
    process.env.VELARI_SPACE_ID = '01kvghz9025fpz6sj6dy9wyfnw';
    process.env.VELARI_PUBLIC_KEY = 'hvl_pub_mock_123';
    process.env.VELARI_SECRET_KEY = 'hvl_sec_mock_123';
  } else {
    process.env.VELARI_API_URL = originalApiUrl;
    process.env.VELARI_SPACE_ID = originalSpaceId;
    process.env.VELARI_PUBLIC_KEY = originalPublicKey;
    process.env.VELARI_SECRET_KEY = originalSecretKey;
  }
  client = new Velari();
  console.log(`🔌 Toggled Playground SDK target. Base URL is now: ${client.baseUrl}`);
}
