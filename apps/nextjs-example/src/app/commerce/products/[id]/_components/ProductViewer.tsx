import type { Product } from '@hivelari/sdk';
import { DevBadge } from '@/providers/AppProviders';
import Link from 'next/link';

export default function ProductViewer({ product }: { product: Product }) {
  const hasSale =
    product.salePrice !== null && product.salePrice < product.originalPrice;
  const displayPrice =
    hasSale && product.salePrice !== null
      ? product.salePrice / 100
      : product.originalPrice / 100;

  return (
    <div className="wrap page">
      <Link
        href="/commerce"
        className="btn btn-ghost btn-sm"
        style={{ marginBottom: 28, display: 'inline-flex' }}
      >
        ← Back to catalog
      </Link>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 380px',
          gap: 32,
          alignItems: 'start',
        }}
      >
        {/* Left: details */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* Hero thumb */}
          <div
            className="card"
            style={{
              aspectRatio: '16/9',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 56,
              position: 'relative',
              background: 'var(--bg-raised)',
            }}
          >
            {product.type === 'physical' ? '📦' : '⚡'}
            <span
              className={`pill ${product.type === 'physical' ? 'pill-accent' : 'pill-neutral'}`}
              style={{ position: 'absolute', top: 14, right: 14 }}
            >
              {product.type}
            </span>
          </div>

          {/* Specs */}
          <div className="card card-p">
            <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>
              Specifications
            </h3>
            <div className="kv-table">
              <div className="kv-row">
                <span className="kv-key">Product ID</span>
                <span className="kv-val">{product.id}</span>
              </div>
              <div className="kv-row">
                <span className="kv-key">Category</span>
                <span className="kv-val">
                  {product.customCategory ?? 'General'}
                </span>
              </div>
              <div className="kv-row">
                <span className="kv-key">Currency</span>
                <span className="kv-val">{product.currency}</span>
              </div>
              <div className="kv-row">
                <span className="kv-key">Requires approval</span>
                <span className="kv-val">
                  {product.requiresApproval ? 'Yes' : 'No'}
                </span>
              </div>

              {product.type === 'physical' && (
                <>
                  <div className="kv-row">
                    <span className="kv-key">Unit</span>
                    <span className="kv-val">
                      {product.physicalUnit ?? 'piece'}
                    </span>
                  </div>
                  <div className="kv-row">
                    <span className="kv-key">Stock</span>
                    <span
                      className="kv-val"
                      style={{
                        color:
                          (product.physicalQuantityAvailable ?? 0) > 10
                            ? 'var(--ok)'
                            : 'var(--warn)',
                      }}
                    >
                      {product.physicalQuantityAvailable !== null
                        ? `${product.physicalQuantityAvailable} units`
                        : 'Out of stock'}
                    </span>
                  </div>
                </>
              )}

              {product.type !== 'physical' && (
                <div className="kv-row">
                  <span className="kv-key">Files</span>
                  <span className="kv-val">
                    {product.files?.length ?? 0} included
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* File list for digital */}
          {product.files && product.files.length > 0 && (
            <div className="card card-p">
              <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>
                Included Files
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {product.files.map((file) => (
                  <div
                    key={file.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                      fontSize: 13,
                    }}
                  >
                    <span>📄</span>
                    <span style={{ flex: 1 }}>
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
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div>
            <span
              className="pill pill-accent"
              style={{ marginBottom: 14, display: 'inline-flex' }}
            >
              {product.customCategory ?? 'General'}
            </span>
            <h1
              style={{
                fontSize: 26,
                fontWeight: 700,
                lineHeight: 1.2,
                marginBottom: 14,
              }}
            >
              {product.name}
            </h1>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
              {hasSale && (
                <span
                  style={{
                    fontSize: 15,
                    textDecoration: 'line-through',
                    color: 'var(--ink-3)',
                  }}
                >
                  ${(product.originalPrice / 100).toFixed(2)}
                </span>
              )}
              <span
                style={{
                  fontSize: 28,
                  fontWeight: 800,
                  letterSpacing: '-0.03em',
                }}
              >
                ${displayPrice.toFixed(2)}
              </span>
              <span className="ink-2" style={{ fontSize: 13 }}>
                {product.currency}
              </span>
            </div>
          </div>

          <hr className="divider" />

          <p style={{ fontSize: 14, color: 'var(--ink-2)', lineHeight: 1.7 }}>
            {product.description ?? 'No product description provided.'}
          </p>

          <hr className="divider" />

          <div
            className="card card-p"
            style={{ display: 'flex', flexDirection: 'column', gap: 14 }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div>
                <span
                  className="ink-2"
                  style={{ fontSize: 12, display: 'block' }}
                >
                  Total
                </span>
                <span style={{ fontSize: 20, fontWeight: 700 }}>
                  ${displayPrice.toFixed(2)}
                </span>
              </div>
              <span className="pill pill-ok">Available</span>
            </div>
            <button type="button" className="btn btn-primary btn-full btn-lg">
              Purchase
            </button>
            <p
              style={{
                fontSize: 12,
                color: 'var(--ink-2)',
                textAlign: 'center',
              }}
            >
              Simulated checkout — no real charges.
            </p>
            <div style={{ textAlign: 'center', paddingTop: 4 }}>
              <DevBadge method="client.commerce.getProduct()" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
