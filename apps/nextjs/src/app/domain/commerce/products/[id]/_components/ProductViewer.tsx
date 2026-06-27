import FileIcon from '@/app/_icons/file.svg';
import type { Product } from '@hivelari/sdk';
import Link from 'next/link';

function formatPrice(cents: number) {
  return (cents / 100).toFixed(2);
}

export default function ProductViewer({ product }: { product: Product }) {
  const hasSale =
    product.salePrice !== null && product.salePrice < product.originalPrice;
  const displayPrice =
    hasSale && product.salePrice !== null
      ? product.salePrice
      : product.originalPrice;

  const stock = product.physicalQuantityAvailable ?? 0;

  return (
    <div className="mx-auto max-w-[1040px] px-16 pt-16 pb-28 max-[768px]:max-w-full max-[768px]:px-6 max-[768px]:pt-10 max-[768px]:pb-20">
      <Link
        href="/domain/commerce/products"
        className="btn btn-ghost btn-sm mb-8 inline-flex"
      >
        ← Back to catalog
      </Link>

      <div
        className="grid gap-10 max-[860px]:grid-cols-1"
        style={{ gridTemplateColumns: '1fr 360px' }}
      >
        {/* Left: hero + specs */}
        <div className="flex flex-col gap-6">
          {/* Hero */}
          <div className="relative flex aspect-[16/9] items-center justify-center rounded-md border border-line bg-surface-3 text-6xl">
            {product.type === 'physical' ? '📦' : '⚡'}
            <span
              className={`pill absolute right-4 top-4 ${product.type === 'physical' ? 'pill-accent' : 'pill-neutral'}`}
            >
              {product.type}
            </span>
          </div>

          {/* Specs */}
          <div className="rounded-md border border-line bg-surface p-7">
            <p className="mb-4 text-[13px] font-semibold text-ink">
              Specifications
            </p>
            <div className="flex flex-col divide-y divide-line">
              {[
                { k: 'Product ID', v: product.id },
                { k: 'Category', v: product.customCategory ?? 'General' },
                { k: 'Currency', v: product.currency },
                {
                  k: 'Requires approval',
                  v: product.requiresApproval ? 'Yes' : 'No',
                },
                ...(product.type === 'physical'
                  ? [
                      { k: 'Unit', v: product.physicalUnit ?? 'piece' },
                      {
                        k: 'Stock',
                        v:
                          product.physicalQuantityAvailable !== null
                            ? `${product.physicalQuantityAvailable} units`
                            : 'Out of stock',
                        className: stock > 10 ? 'text-green' : 'text-amber',
                      },
                    ]
                  : [
                      {
                        k: 'Files',
                        v: `${product.files?.length ?? 0} included`,
                      },
                    ]),
              ].map(({ k, v, className }) => (
                <div
                  key={k}
                  className="flex items-center justify-between py-2.5 text-[13px]"
                >
                  <span className="text-ink-3">{k}</span>
                  <span
                    className={`font-mono text-[12px] text-ink ${className ?? ''}`}
                  >
                    {v}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Files (digital) */}
          {product.files && product.files.length > 0 && (
            <div className="rounded-md border border-line bg-surface p-7">
              <p className="mb-4 text-[13px] font-semibold text-ink">
                Included Files
              </p>
              <div className="flex flex-col gap-3">
                {product.files.map((file) => (
                  <div
                    key={file.id}
                    className="flex items-center gap-3 text-[13px]"
                  >
                    <span className="text-ink-3">
                      <FileIcon width={14} height={14} />
                    </span>
                    <span className="flex-1 text-ink">
                      {file.title ?? 'Untitled file'}
                    </span>
                    {file.license && (
                      <span className="pill pill-neutral">{file.license}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right: buy panel */}
        <div className="flex flex-col gap-6">
          <div>
            <span className="pill pill-accent mb-4 inline-flex">
              {product.customCategory ?? 'General'}
            </span>
            <h1 className="mb-4 text-[26px] font-bold leading-[1.2] tracking-[-0.04em] text-ink">
              {product.name}
            </h1>
            <div className="flex items-baseline gap-2.5">
              {hasSale && (
                <span className="text-[15px] text-ink-3 line-through">
                  ${formatPrice(product.originalPrice)}
                </span>
              )}
              <span className="text-[30px] font-extrabold tracking-[-0.04em] text-ink">
                ${formatPrice(displayPrice)}
              </span>
              <span className="text-[13px] text-ink-2">{product.currency}</span>
            </div>
          </div>

          <hr className="border-line" />

          <p className="text-[14px] leading-[1.7] text-ink-2">
            {product.description ?? 'No product description provided.'}
          </p>

          <hr className="border-line" />

          {/* Purchase box */}
          <div className="flex flex-col gap-5 rounded-md border border-line bg-surface p-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="mb-0.5 block text-[12px] text-ink-3">
                  Total
                </span>
                <span className="text-[22px] font-bold tracking-[-0.03em] text-ink">
                  ${formatPrice(displayPrice)}
                </span>
              </div>
              <span className="pill pill-green">Available</span>
            </div>
            <button type="button" className="btn btn-primary btn-full btn-lg">
              Purchase
            </button>
            <p className="text-center text-[12px] text-ink-3">
              Simulated checkout — no real charges.
            </p>
            <div className="text-center">
              <code className="sdk-badge">client.commerce.getProduct()</code>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
