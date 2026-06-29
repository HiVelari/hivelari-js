import { RequestDefinition, z } from '@simapi/simapi';

export const listBusinessProfilesRequest: RequestDefinition = {
  query: {
    search: z.string().optional(),
    industry: z.string().optional(),
    business_type: z.string().optional(),
    sort: z.enum(['name_asc', 'name_desc', 'featured', 'latest']).optional(),
    page: z.string().optional().default('1'),
    per_page: z.string().optional().default('15'),
  },
};
