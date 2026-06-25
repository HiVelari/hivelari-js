import {
  CommerceProductPayload,
  ProductFilePayload,
  ProductImagePayload,
} from '@/types/commerce';

export interface ProductFile {
  id: string;
  fileId: string;
  title: string | null;
  description: string | null;
  license: string | null;
  media: unknown;
}

export interface ProductImage {
  id: string;
  imageId: string;
  alt: string | null;
  media: unknown;
}

export class Product {
  readonly id: string;
  readonly name: string;
  readonly currency: string;
  readonly originalPrice: number;
  readonly salePrice: number | null;
  readonly description: string | null;
  readonly categoryId: string | null;
  readonly customCategory: string | null;
  readonly type: string;
  readonly requiresApproval: boolean;
  readonly visibility: string;
  readonly limitPurchase: number | null;
  readonly redirectOnPurchase: string | null;

  // Physical specifics
  readonly physicalUnit: string | null;
  readonly physicalQuantityAvailable: number | null;

  // Service specifics
  readonly serviceDurationMinutes: number | null;
  readonly serviceRequiresBooking: boolean | null;
  readonly serviceDeliveryTimeframe: string | null;

  // Media & Attachments
  readonly files?: ProductFile[];
  readonly images?: ProductImage[];

  constructor(data: CommerceProductPayload) {
    this.id = data.id;
    this.name = data.name;
    this.currency = data.currency;
    this.originalPrice = data.original_price;
    this.salePrice = data.sale_price ?? null;
    this.description = data.description ?? null;
    this.categoryId = data.category_id ?? null;
    this.customCategory = data.custom_category ?? null;
    this.type = data.type;
    this.requiresApproval = data.requires_approval ?? false;
    this.visibility = data.visibility;
    this.limitPurchase = data.limit_purchase ?? null;
    this.redirectOnPurchase = data.redirect_on_purchase ?? null;

    this.physicalUnit = data.physical_unit ?? null;
    this.physicalQuantityAvailable = data.physical_quantity_available ?? null;

    this.serviceDurationMinutes = data.service_duration_minutes ?? null;
    this.serviceRequiresBooking = data.service_requires_booking ?? null;
    this.serviceDeliveryTimeframe = data.service_delivery_timeframe ?? null;

    if (data.files && Array.isArray(data.files)) {
      this.files = data.files.map((file: ProductFilePayload) => ({
        id: file.id,
        fileId: file.file_id,
        title: file.title,
        description: file.description,
        license: file.license,
        media: file.media,
      }));
    }

    if (data.images && Array.isArray(data.images)) {
      this.images = data.images.map((img: ProductImagePayload) => ({
        id: img.id,
        imageId: img.image_id,
        alt: img.alt,
        media: img.media,
      }));
    }
  }

  static fake(overrides: Partial<CommerceProductPayload> = {}): Product {
    return new Product({
      id: 'prod_mock_123',
      name: 'Mock Product',
      currency: 'USD',
      original_price: 2999,
      sale_price: 2499,
      description: 'A premium mock product description.',
      category_id: 'cat_mock_123',
      custom_category: 'Mock Category',
      type: 'physical',
      requires_approval: false,
      visibility: 'public',
      limit_purchase: null,
      redirect_on_purchase: null,
      physical_unit: 'piece',
      physical_quantity_available: 50,
      files: [],
      images: [
        {
          id: 'img_mock_123',
          image_id: 'media_mock_123',
          alt: 'Mock Product Image',
          media: null,
        },
      ],
      ...overrides,
    });
  }
}
