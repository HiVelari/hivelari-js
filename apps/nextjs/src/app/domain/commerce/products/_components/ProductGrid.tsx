import type { Product } from '@hivelari/sdk';
import Link from 'next/link';

function formatPrice(cents: number) {
  return (cents / 100).toFixed(2);
}

export default function ProductGrid({ products }: { products: Product[] }) {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 rounded-md border border-line bg-surface py-20 text-center">
        <span className="text-5xl">🔍</span>
        <div>
          <p className="mb-1 text-[15px] font-semibold text-ink">
            No products found
          </p>
          <p className="text-[13px] text-ink-2">
            Try a different search term or clear the filter.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <p className="text-[13px] text-ink-3">
          {products.length} product{products.length !== 1 ? 's' : ''}
        </p>
        <code className="sdk-badge">client.commerce.listProducts()</code>
      </div>

      <div className="product-grid">
        {products.map((product) => {
          const hasSale =
            product.salePrice !== null &&
            product.salePrice < product.originalPrice;
          const displayPrice =
            hasSale && product.salePrice !== null
              ? product.salePrice
              : product.originalPrice;

          return (
            <div
              key={product.id}
              className="group flex flex-col rounded-md border border-line bg-surface transition-[border-color,background,transform] duration-200 hover:-translate-y-[3px] hover:border-line-accent hover:bg-surface-2"
            >
              {/* Thumb */}
              <div className="relative flex aspect-[4/3] items-center justify-center rounded-t-md bg-surface-3 text-5xl">
                {product.type === 'physical' ? '📦' : '⚡'}
                <span
                  className={`pill absolute right-3 top-3 ${product.type === 'physical' ? 'pill-accent' : 'pill-neutral'}`}
                >
                  {product.type}
                </span>
              </div>

              {/* Body */}
              <div className="flex flex-1 flex-col gap-2 p-5">
                <p className="font-mono text-[11px] uppercase tracking-[0.06em] text-accent-light">
                  {product.customCategory ?? 'General'}
                </p>
                <h3 className="text-[15px] font-semibold tracking-[-0.02em] text-ink leading-snug">
                  {product.name}
                </h3>
                {product.description && (
                  <p className="line-clamp-2 text-[12.5px] leading-[1.6] text-ink-2">
                    {product.description}
                  </p>
                )}

                <div className="mt-auto flex items-center justify-between pt-4">
                  <div className="flex items-baseline gap-2">
                    {hasSale && (
                      <span className="text-[13px] text-ink-3 line-through">
                        ${formatPrice(product.originalPrice)}
                      </span>
                    )}
                    <span className="text-[18px] font-bold tracking-[-0.03em] text-ink">
                      ${formatPrice(displayPrice)}
                    </span>
                  </div>
                  <Link
                    href={`/domain/commerce/products/${product.id}`}
                    className="btn btn-primary btn-sm"
                  >
                    View
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
