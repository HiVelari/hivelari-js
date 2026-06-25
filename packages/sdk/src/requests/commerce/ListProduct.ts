export interface ListProductsParams {
  search?: string;
  category_id?: string;
  custom_category?: string;
  type?: string;
  min_price?: number;
  max_price?: number;
  sort?: 'price_asc' | 'price_desc' | 'latest';
  per_page?: number;
  page?: number;
}
