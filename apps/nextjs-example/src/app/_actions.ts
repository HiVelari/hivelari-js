'use server';

import { getVelariClient } from '@/lib/velari';

export async function runHandshakeAction() {
  const startTime = Date.now();
  try {
    const client = await getVelariClient();
    const response = await client.ping();

    const latency = Date.now() - startTime;

    return {
      success: true,
      status: response.status,
      data: {
        status: response.data.status,
        message: response.data.message,
        space: response.data.space,
      },
      latency,
    };
  } catch (error: unknown) {
    const latency = Date.now() - startTime;
    const errorMsg = error instanceof Error ? error.message : String(error);
    return {
      success: false,
      error: errorMsg || 'Failed to execute SDK handshake ping.',
      latency,
    };
  }
}
