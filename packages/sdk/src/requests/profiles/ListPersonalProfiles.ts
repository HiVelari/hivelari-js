export interface ListPersonalProfilesParams {
  search?: string;
  availability?: string;
  sort?: 'name_asc' | 'name_desc' | 'featured' | 'latest';
  per_page?: number;
  page?: number;
}
