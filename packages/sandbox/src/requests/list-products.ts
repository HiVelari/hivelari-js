import { RequestDefinition, z } from '@simapi/simapi';

export const listProductsRequest: RequestDefinition = {
  query: {
    search: z.string().optional(),
    page: z.string().optional().default('1'),
    per_page: z.string().optional().default('15'),
  },
};
