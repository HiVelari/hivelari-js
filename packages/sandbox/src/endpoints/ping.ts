import {
  AppResponse,
  type AppRequest,
  type EndpointDefinition,
} from '@simapi/simapi';

export const getPing: EndpointDefinition = {
  path: '/api/ping',
  method: 'GET',
  type: 'secure',
  title: 'Handshake Ping',
  description: 'Returns connection status and space identifier.',
  handler: (req: AppRequest) => {
    const spaceId = req.header('X-HVL-SPACEID') || 'unknown';

    return AppResponse.success({
      status: 'ok',
      message: 'ponged back from sandbox',
      space: spaceId,
    });
  },
};
