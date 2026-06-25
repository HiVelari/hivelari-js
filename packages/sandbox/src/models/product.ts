import { faker } from "@simapi/simapi";

// Seed faker for consistent values across startup
faker.seed(42);

export interface ProductFile {
  id: string;
  file_id: string;
  title: string;
  description: string | null;
  license: string;
  media: string | null;
}

export interface ProductImage {
  id: string;
  image_id: string;
  alt: string;
  media: string | null;
}

export interface CommerceProduct {
  id: string;
  name: string;
  currency: string;
  original_price: number;
  sale_price: number | null;
  description: string;
  category_id: string;
  custom_category: string;
  type: "physical" | "digital";
  requires_approval: boolean;
  visibility: string;
  limit_purchase: number | null;
  redirect_on_purchase: string | null;
  physical_unit: string | null;
  physical_quantity_available: number | null;
  service_duration_minutes: number | null;
  service_requires_booking: boolean | null;
  service_delivery_timeframe: string | null;
  files: ProductFile[];
  images: ProductImage[];
}

export function makeProduct(): CommerceProduct {
  const isPhysical = Math.random() > 0.3;
  const originalPrice = faker.number.int({ min: 15, max: 250 }) * 100; // stored in cents
  const salePrice = Math.random() > 0.6 ? faker.number.int({ min: 10, max: Math.floor(originalPrice / 100) - 5 }) * 100 : null;

  return {
    id: `prod_${faker.string.alphanumeric(10)}`,
    name: faker.commerce.productName(),
    currency: "USD",
    original_price: originalPrice,
    sale_price: salePrice,
    description: faker.commerce.productDescription(),
    category_id: `cat_${faker.string.alphanumeric(8)}`,
    custom_category: faker.commerce.department(),
    type: isPhysical ? "physical" : "digital",
    requires_approval: Math.random() > 0.85,
    visibility: "public",
    limit_purchase: null,
    redirect_on_purchase: null,
    physical_unit: isPhysical ? "piece" : null,
    physical_quantity_available: isPhysical ? faker.number.int({ min: 5, max: 120 }) : null,
    service_duration_minutes: !isPhysical ? faker.number.int({ min: 30, max: 180 }) : null,
    service_requires_booking: !isPhysical ? Math.random() > 0.4 : null,
    service_delivery_timeframe: null,
    files: !isPhysical ? [
      {
        id: `file_${faker.string.alphanumeric(8)}`,
        file_id: `media_file_${faker.string.alphanumeric(8)}`,
        title: "Digital product download file",
        description: null,
        license: "Standard license",
        media: null,
      }
    ] : [],
    images: [
      {
        id: `img_${faker.string.alphanumeric(8)}`,
        image_id: `media_img_${faker.string.alphanumeric(8)}`,
        alt: "Product showcase image",
        media: null,
      },
    ],
  };
}

// Generate 25 stable fake products on startup
export const mockProducts: CommerceProduct[] = Array.from({ length: 25 }, makeProduct);
