import type { Velari } from '@/core/client';
import type { ListBusinessProfilesParams } from '@/requests/profiles/ListBusinessProfiles';
import type { ListPersonalProfilesParams } from '@/requests/profiles/ListPersonalProfiles';
import { PaginatedResponse } from '@/resources/PaginatedResponse';
import { VelariResponse } from '@/resources/VelariResponse';
import { BusinessProfile } from '@/resources/profiles/BusinessProfile';
import { PersonalProfile } from '@/resources/profiles/PersonalProfile';
import type { PaginatedPayload } from '@/types/core';
import type {
  BusinessProfilePayload,
  PersonalProfilePayload,
} from '@/types/profiles';

/**
 * Service for personal profiles — `client.profile.personal`.
 */
export class PersonalProfileService {
  constructor(private client: Velari) {}

  /**
   * Fetch a paginated list of personal profiles.
   *
   * @example
   * ```ts
   * const response = await client.profile.personal.list({ search: 'Jane' });
   * const { data: profiles, meta } = response.data;
   * ```
   */
  async list(
    params?: ListPersonalProfilesParams,
  ): Promise<VelariResponse<PaginatedResponse<PersonalProfile>>> {
    return this.client.request<PaginatedResponse<PersonalProfile>>({
      method: 'GET',
      url: '/api/profiles/personal/v1',
      params,
      transform: (data) =>
        new PaginatedResponse(
          data as PaginatedPayload<unknown>,
          (item) => new PersonalProfile(item as PersonalProfilePayload),
        ),
    });
  }

  /**
   * Fetch a single personal profile by identifier (id, slug, email, or phone).
   *
   * @example
   * ```ts
   * const response = await client.profile.personal.get('jane-doe');
   * const profile = response.data;
   * console.log(profile.fullName, profile.availability);
   * ```
   */
  async get(identifier: string): Promise<VelariResponse<PersonalProfile>> {
    return this.client.request<PersonalProfile>({
      method: 'GET',
      url: `/api/profiles/personal/v1/${encodeURIComponent(identifier)}`,
      transform: (data: unknown) => {
        const payload = data as { data: PersonalProfilePayload };
        return new PersonalProfile(payload.data);
      },
    });
  }
}

/**
 * Service for business profiles — `client.profile.business`.
 */
export class BusinessProfileService {
  constructor(private client: Velari) {}

  /**
   * Fetch a paginated list of business profiles.
   *
   * @example
   * ```ts
   * const response = await client.profile.business.list({ industry: 'Technology' });
   * const { data: profiles, meta } = response.data;
   * ```
   */
  async list(
    params?: ListBusinessProfilesParams,
  ): Promise<VelariResponse<PaginatedResponse<BusinessProfile>>> {
    return this.client.request<PaginatedResponse<BusinessProfile>>({
      method: 'GET',
      url: '/api/profiles/business/v1',
      params,
      transform: (data) =>
        new PaginatedResponse(
          data as PaginatedPayload<unknown>,
          (item) => new BusinessProfile(item as BusinessProfilePayload),
        ),
    });
  }

  /**
   * Fetch a single business profile by identifier (id, slug, email, or phone).
   *
   * @example
   * ```ts
   * const response = await client.profile.business.get('acme-corp');
   * const profile = response.data;
   * console.log(profile.name, profile.industry);
   * ```
   */
  async get(identifier: string): Promise<VelariResponse<BusinessProfile>> {
    return this.client.request<BusinessProfile>({
      method: 'GET',
      url: `/api/profiles/business/v1/${encodeURIComponent(identifier)}`,
      transform: (data: unknown) => {
        const payload = data as { data: BusinessProfilePayload };
        return new BusinessProfile(payload.data);
      },
    });
  }
}

/**
 * Profile service — `client.profile`.
 *
 * Access personal and business profiles:
 * - `client.profile.personal.list(params?)`
 * - `client.profile.personal.get(identifier)`
 * - `client.profile.business.list(params?)`
 * - `client.profile.business.get(identifier)`
 */
export class ProfileService {
  readonly personal: PersonalProfileService;
  readonly business: BusinessProfileService;

  constructor(client: Velari) {
    this.personal = new PersonalProfileService(client);
    this.business = new BusinessProfileService(client);
  }
}
