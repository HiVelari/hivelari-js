import { type AppRequest, AppResponse } from '@simapi/simapi';

export function authHandler(req: AppRequest) {
  // Bypass credentials check for local sandbox mock social auth screen
  if (req.param('redirect_url') && req.param('client_seckey')) {
    return;
  }

  const spaceId = req.header('X-HVL-SPACEID');
  const pubKey = req.header('X-HVL-PUBKEY');
  const secKey = req.header('X-HVL-SECKEY');

  if (!spaceId || !pubKey || !secKey) {
    return AppResponse.unauthenticated({
      message:
        'Unauthorized: Missing Space credentials headers (X-HVL-SPACEID, X-HVL-PUBKEY, X-HVL-SECKEY)',
    });
  }

  if (!pubKey.startsWith('hvl_pub_') || !secKey.startsWith('hvl_sec_')) {
    return AppResponse.unauthenticated({
      message:
        'Unauthorized: Invalid key prefix formatting. Keys must start with hvl_pub_ and hvl_sec_.',
    });
  }
}
