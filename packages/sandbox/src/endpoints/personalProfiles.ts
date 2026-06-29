import { mockPersonalProfiles } from '@models/personalProfile.js';
import { listPersonalProfilesRequest } from '@requests/list-personal-profiles.js';
import {
  type AppRequest,
  AppResponse,
  type EndpointDefinition,
} from '@simapi/simapi';

export const getPersonalProfiles: EndpointDefinition = {
  path: '/api/profiles/personal/v1',
  method: 'GET',
  type: 'secure',
  title: 'List Personal Profiles',
  description: 'Returns a paginated list of personal profiles.',
  request: listPersonalProfilesRequest,
  handler: (req: AppRequest) => {
    const search = req.param('search')?.toLowerCase() || '';
    const availability = req.param('availability') || '';
    const sort = req.param('sort') || 'latest';
    const page = Number.parseInt(req.param('page') || '1', 10);
    const perPage = Number.parseInt(req.param('per_page') || '15', 10);

    let filtered = [...mockPersonalProfiles];

    if (search) {
      filtered = filtered.filter(
        (p) =>
          p.first_name.toLowerCase().includes(search) ||
          p.last_name.toLowerCase().includes(search) ||
          (p.display_name?.toLowerCase() || '').includes(search) ||
          (p.tagline?.toLowerCase() || '').includes(search),
      );
    }

    if (availability) {
      filtered = filtered.filter((p) => p.availability === availability);
    }

    if (sort === 'name_asc') {
      filtered.sort((a, b) => a.first_name.localeCompare(b.first_name));
    } else if (sort === 'name_desc') {
      filtered.sort((a, b) => b.first_name.localeCompare(a.first_name));
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

export const getPersonalProfileDetail: EndpointDefinition = {
  path: '/api/profiles/personal/v1/:identifier',
  method: 'GET',
  type: 'secure',
  title: 'Get Personal Profile',
  description:
    'Returns a single personal profile by id, slug, email, or phone.',
  handler: (req: AppRequest) => {
    const identifier = req.urlParam('identifier');

    const profile = mockPersonalProfiles.find(
      (p) =>
        p.id === identifier ||
        p.slug === identifier ||
        p.email === identifier ||
        p.phone === identifier,
    );

    if (!profile) {
      return AppResponse.notFound({
        message: `Personal profile '${identifier}' not found.`,
      });
    }

    return AppResponse.success({ data: profile });
  },
};
