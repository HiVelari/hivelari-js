import {
  CommerceProductPayload,
  ProductFilePayload,
  ProductImagePayload,
  ProductOptionPayload,
  ProductSeoPayload,
  ProductSpecificationPayload,
  ProductVariantPayload,
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

export interface ProductSpecification {
  id: string;
  productId: string;
  key: string;
  value: string;
  isActive: boolean;
  createdAt: string | null;
  updatedAt: string | null;
}

export interface ProductSeo {
  id: string;
  productId: string;
  metaTitle: string | null;
  metaDescription: string | null;
  metaKeywords: string | null;
  canonicalUrl: string | null;
  ogTitle: string | null;
  ogDescription: string | null;
  ogImageId: string | null;
  ogImage: unknown;
  twitterTitle: string | null;
  twitterDescription: string | null;
  twitterImageId: string | null;
  twitterImage: unknown;
  createdAt: string | null;
  updatedAt: string | null;
}

export interface ProductOptionValue {
  id: string;
  value: string;
  position: number;
}

export interface ProductOption {
  id: string;
  productId: string;
  name: string;
  position: number;
  values: ProductOptionValue[];
}

export interface ProductVariantOptionValue {
  id: string;
  optionId: string;
  value: string;
}

export interface ProductVariant {
  id: string;
  productId: string;
  sku: string | null;
  barcode: string | null;
  originalPrice: number | null;
  salePrice: number | null;
  quantityAvailable: number | null;
  isActive: boolean;
  optionValues: ProductVariantOptionValue[];
  createdAt: string | null;
  updatedAt: string | null;
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
  readonly files: ProductFile[];
  readonly images: ProductImage[];

  // Specifications
  readonly specifications: ProductSpecification[];

  // SEO
  readonly seo: ProductSeo | null;

  // Options & Variants
  readonly options: ProductOption[];
  readonly variants: ProductVariant[];

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

    this.files = (data.files ?? []).map((file: ProductFilePayload) => ({
      id: file.id,
      fileId: file.file_id,
      title: file.title,
      description: file.description,
      license: file.license,
      media: file.media,
    }));

    this.images = (data.images ?? []).map((img: ProductImagePayload) => ({
      id: img.id,
      imageId: img.image_id,
      alt: img.alt,
      media: img.media,
    }));

    this.specifications = (data.specifications ?? []).map(
      (spec: ProductSpecificationPayload) => ({
        id: spec.id,
        productId: spec.product_id,
        key: spec.key,
        value: spec.value,
        isActive: spec.is_active,
        createdAt: spec.created_at,
        updatedAt: spec.updated_at,
      }),
    );

    this.seo = data.seo
      ? {
          id: data.seo.id,
          productId: data.seo.product_id,
          metaTitle: data.seo.meta_title,
          metaDescription: data.seo.meta_description,
          metaKeywords: data.seo.meta_keywords,
          canonicalUrl: data.seo.canonical_url,
          ogTitle: data.seo.og_title,
          ogDescription: data.seo.og_description,
          ogImageId: data.seo.og_image_id,
          ogImage: data.seo.og_image,
          twitterTitle: data.seo.twitter_title,
          twitterDescription: data.seo.twitter_description,
          twitterImageId: data.seo.twitter_image_id,
          twitterImage: data.seo.twitter_image,
          createdAt: data.seo.created_at,
          updatedAt: data.seo.updated_at,
        }
      : null;

    this.options = (data.options ?? []).map((opt: ProductOptionPayload) => ({
      id: opt.id,
      productId: opt.product_id,
      name: opt.name,
      position: opt.position,
      values: (opt.values ?? []).map((v) => ({
        id: v.id,
        value: v.value,
        position: v.position,
      })),
    }));

    this.variants = (data.variants ?? []).map((v: ProductVariantPayload) => ({
      id: v.id,
      productId: v.product_id,
      sku: v.sku,
      barcode: v.barcode,
      originalPrice: v.original_price,
      salePrice: v.sale_price,
      quantityAvailable: v.quantity_available,
      isActive: v.is_active,
      optionValues: (v.option_values ?? []).map((ov) => ({
        id: ov.id,
        optionId: ov.option_id,
        value: ov.value,
      })),
      createdAt: v.created_at,
      updatedAt: v.updated_at,
    }));
  }
}
