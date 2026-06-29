import { RequestDefinition, z } from '@simapi/simapi';

export const listPersonalProfilesRequest: RequestDefinition = {
  query: {
    search: z.string().optional(),
    availability: z.string().optional(),
    sort: z.enum(['name_asc', 'name_desc', 'featured', 'latest']).optional(),
    page: z.string().optional().default('1'),
    per_page: z.string().optional().default('15'),
  },
};
