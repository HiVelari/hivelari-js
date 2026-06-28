import { createCallbackRouteHandler } from '@hivelari/nextjs';

export const { GET } = createCallbackRouteHandler({
  social: {
    loginSuccessRedirect: '/domain/auth/profile',
    loginFailedRedirect: '/domain/auth/oauth',
  },
});
