import { AppResponse, type EndpointDefinition } from '@simapi/simapi';

const mockCategories = [
  {
    id: 'cat_01HXYZ001',
    name: 'Digital Products',
    slug: 'digital-products',
    parent_id: null,
    description: 'Downloadable and digital goods',
    is_active: true,
    children: [
      {
        id: 'cat_01HXYZ002',
        name: 'Software',
        slug: 'software',
        parent_id: 'cat_01HXYZ001',
        description: null,
        is_active: true,
        children: [],
      },
      {
        id: 'cat_01HXYZ003',
        name: 'E-Books',
        slug: 'e-books',
        parent_id: 'cat_01HXYZ001',
        description: null,
        is_active: true,
        children: [],
      },
    ],
  },
  {
    id: 'cat_01HXYZ004',
    name: 'Physical Goods',
    slug: 'physical-goods',
    parent_id: null,
    description: 'Tangible items that are shipped',
    is_active: true,
    children: [
      {
        id: 'cat_01HXYZ005',
        name: 'Apparel',
        slug: 'apparel',
        parent_id: 'cat_01HXYZ004',
        description: null,
        is_active: true,
        children: [],
      },
    ],
  },
  {
    id: 'cat_01HXYZ006',
    name: 'Services',
    slug: 'services',
    parent_id: null,
    description: 'Bookable and session-based services',
    is_active: true,
    children: [],
  },
];

const mockCurrencies = [
  {
    code: 'EUR',
    country_code: 'DE',
    name: 'Euro',
    symbol: '€',
    subunit_name: 'Cent',
    subunit_symbol: 'c',
    subunit_factor: 100,
    is_active: true,
  },
  {
    code: 'GBP',
    country_code: 'GB',
    name: 'British Pound',
    symbol: '£',
    subunit_name: 'Penny',
    subunit_symbol: 'p',
    subunit_factor: 100,
    is_active: true,
  },
  {
    code: 'NGN',
    country_code: 'NG',
    name: 'Nigerian Naira',
    symbol: '₦',
    subunit_name: 'Kobo',
    subunit_symbol: 'k',
    subunit_factor: 100,
    is_active: true,
  },
  {
    code: 'USD',
    country_code: 'US',
    name: 'United States Dollar',
    symbol: '$',
    subunit_name: 'Cent',
    subunit_symbol: '¢',
    subunit_factor: 100,
    is_active: true,
  },
];

export const getCommerceCategories: EndpointDefinition = {
  path: '/api/records/commerce/categories',
  method: 'GET',
  type: 'secure',
  title: 'List Commerce Categories',
  description: 'Returns all active categories with their subcategories.',
  handler: () => {
    return AppResponse.success({ data: mockCategories });
  },
};

export const getCurrencies: EndpointDefinition = {
  path: '/api/records/currencies',
  method: 'GET',
  type: 'secure',
  title: 'List Currencies',
  description: 'Returns all active currencies ordered by code.',
  handler: () => {
    return AppResponse.success({ data: mockCurrencies });
  },
};
