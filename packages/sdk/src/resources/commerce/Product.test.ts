import { Product } from '@/resources/commerce/Product';
import { describe, expect, it } from 'vitest';

describe('Product Resource', () => {
  it('should parse raw product payload successfully', () => {
    const rawPayload = {
      id: 'prod_1',
      name: 'Sample Product',
      currency: 'EUR',
      original_price: 1500,
      sale_price: 1200,
      description: 'A test description',
      category_id: 'cat_1',
      custom_category: 'Custom Cat',
      type: 'physical',
      requires_approval: true,
      visibility: 'public',
      limit_purchase: 5,
      redirect_on_purchase: 'https://sample.com',
      physical_unit: 'box',
      physical_quantity_available: 10,
      service_duration_minutes: null,
      service_requires_booking: null,
      service_delivery_timeframe: null,
      files: [],
      images: [
        {
          id: 'img_1',
          image_id: 'media_1',
          alt: 'Product alt text',
          media: null,
        },
      ],
    };

    const product = new Product(rawPayload);

    expect(product.id).toBe('prod_1');
    expect(product.name).toBe('Sample Product');
    expect(product.currency).toBe('EUR');
    expect(product.originalPrice).toBe(1500);
    expect(product.salePrice).toBe(1200);
    expect(product.description).toBe('A test description');
    expect(product.categoryId).toBe('cat_1');
    expect(product.customCategory).toBe('Custom Cat');
    expect(product.type).toBe('physical');
    expect(product.requiresApproval).toBe(true);
    expect(product.visibility).toBe('public');
    expect(product.limitPurchase).toBe(5);
    expect(product.redirectOnPurchase).toBe('https://sample.com');
    expect(product.physicalUnit).toBe('box');
    expect(product.physicalQuantityAvailable).toBe(10);
    expect(product.images).toBeDefined();
    expect(product.images?.[0].id).toBe('img_1');
    expect(product.images?.[0].alt).toBe('Product alt text');
  });

  it('should generate a valid fake model using static fake helper', () => {
    const faked = Product.fake({ name: 'Faked Name' });

    expect(faked.id).toBe('prod_mock_123');
    expect(faked.name).toBe('Faked Name');
    expect(faked.currency).toBe('USD');
    expect(faked.originalPrice).toBe(2999);
    expect(faked.salePrice).toBe(2499);
    expect(faked.type).toBe('physical');
    expect(faked.requiresApproval).toBe(false);
  });
});
