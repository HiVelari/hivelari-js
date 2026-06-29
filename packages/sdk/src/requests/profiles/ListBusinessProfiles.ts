export interface ListBusinessProfilesParams {
  search?: string;
  industry?: string;
  business_type?: string;
  sort?: 'name_asc' | 'name_desc' | 'featured' | 'latest';
  per_page?: number;
  page?: number;
}
