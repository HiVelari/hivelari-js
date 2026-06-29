import { mockBusinessProfiles } from '@models/businessProfile.js';
import { listBusinessProfilesRequest } from '@requests/list-business-profiles.js';
import {
  type AppRequest,
  AppResponse,
  type EndpointDefinition,
} from '@simapi/simapi';

export const getBusinessProfiles: EndpointDefinition = {
  path: '/api/profiles/business/v1',
  method: 'GET',
  type: 'secure',
  title: 'List Business Profiles',
  description: 'Returns a paginated list of business profiles.',
  request: listBusinessProfilesRequest,
  handler: (req: AppRequest) => {
    const search = req.param('search')?.toLowerCase() || '';
    const industry = req.param('industry') || '';
    const businessType = req.param('business_type') || '';
    const sort = req.param('sort') || 'latest';
    const page = Number.parseInt(req.param('page') || '1', 10);
    const perPage = Number.parseInt(req.param('per_page') || '15', 10);

    let filtered = [...mockBusinessProfiles];

    if (search) {
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(search) ||
          (p.tagline?.toLowerCase() || '').includes(search) ||
          (p.description?.toLowerCase() || '').includes(search),
      );
    }

    if (industry) {
      filtered = filtered.filter((p) => p.industry === industry);
    }

    if (businessType) {
      filtered = filtered.filter((p) => p.business_type === businessType);
    }

    if (sort === 'name_asc') {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sort === 'name_desc') {
      filtered.sort((a, b) => b.name.localeCompare(a.name));
    } else if (sort === 'featured') {
      filtered.sort(
        (a, b) => (b.is_featured ? 1 : 0) - (a.is_featured ? 1 : 0),
      );
    }

    const total = filtered.length;
    const lastPage = Math.max(1, Math.ceil(total / perPage));
    const currentPage = Math.min(page, lastPage);
    const offset = (currentPage - 1) * perPage;
    const paginated = filtered.slice(offset, offset + perPage);

    return AppResponse.success({
      data: paginated,
      meta: {
        current_page: currentPage,
        last_page: lastPage,
        per_page: perPage,
        total,
      },
    });
  },
};

export const getBusinessProfileDetail: EndpointDefinition = {
  path: '/api/profiles/business/v1/:identifier',
  method: 'GET',
  type: 'secure',
  title: 'Get Business Profile',
  description:
    'Returns a single business profile by id, slug, email, or phone.',
  handler: (req: AppRequest) => {
    const identifier = req.urlParam('identifier');

    const profile = mockBusinessProfiles.find(
      (p) =>
        p.id === identifier ||
        p.slug === identifier ||
        p.email === identifier ||
        p.phone === identifier,
    );

    if (!profile) {
      return AppResponse.notFound({
        message: `Business profile '${identifier}' not found.`,
      });
    }

    return AppResponse.success({ data: profile });
  },
};
