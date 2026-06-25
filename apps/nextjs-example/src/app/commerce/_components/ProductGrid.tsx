import type { Product } from '@hivelari/sdk';
import Link from 'next/link';

interface ProductGridProps {
  products: Product[];
}

export default function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div
        style={{
          textAlign: 'center',
          padding: '64px 24px',
          color: 'var(--text-muted)',
        }}
      >
        <h2>No Products Found</h2>
        <p style={{ marginTop: '8px' }}>
          Try searching for a different keyword or custom category.
        </p>
      </div>
    );
  }

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '24px',
        width: '100%',
      }}
    >
      {products.map((product) => {
        const hasSale =
          product.salePrice !== null &&
          product.salePrice < product.originalPrice;
        const displayPrice =
          hasSale && product.salePrice !== null
            ? product.salePrice / 100
            : product.originalPrice / 100;
        const originalDisplay = product.originalPrice / 100;

        return (
          <div
            key={product.id}
            className="glass-panel"
            style={{
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
              overflow: 'hidden',
            }}
          >
            {/* Aspect ratio box for product image placeholder */}
            <div
              style={{
                width: '100%',
                aspectRatio: '1.6',
                background:
                  'linear-gradient(135deg, rgba(99, 102, 241, 0.05), rgba(168, 85, 247, 0.05))',
                borderBottom: '1px solid var(--border-color)',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <span
                style={{
                  background:
                    'linear-gradient(135deg, var(--color-primary), #a855f7)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontWeight: 700,
                  fontSize: '1.5rem',
                }}
              >
                {product.type === 'physical' ? '📦' : '⚡'}
              </span>

              <span
                style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  padding: '4px 8px',
                  borderRadius: '20px',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  background:
                    product.type === 'physical'
                      ? 'rgba(99, 102, 241, 0.15)'
                      : 'rgba(168, 85, 247, 0.15)',
                  border: `1px solid ${product.type === 'physical' ? 'rgba(99, 102, 241, 0.3)' : 'rgba(168, 85, 247, 0.3)'}`,
                  color: product.type === 'physical' ? '#a5b4fc' : '#e9d5ff',
                  boxShadow:
                    product.type === 'physical'
                      ? '0 0 10px rgba(99, 102, 241, 0.1)'
                      : '0 0 10px rgba(168, 85, 247, 0.1)',
                }}
              >
                {product.type}
              </span>
            </div>

            <div
              style={{
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                flex: 1,
              }}
            >
              <span
                style={{
                  fontSize: '0.75rem',
                  color: 'var(--color-primary)',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  marginBottom: '6px',
                  display: 'block',
                }}
              >
                {product.customCategory || 'General'}
              </span>

              <h3
                style={{
                  fontSize: '1.15rem',
                  fontWeight: 600,
                  marginBottom: '8px',
                  lineHeight: '1.4',
                }}
              >
                {product.name}
              </h3>

              <p
                style={{
                  fontSize: '0.875rem',
                  color: 'var(--text-muted)',
                  lineHeight: '1.5',
                  marginBottom: '20px',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                }}
              >
                {product.description || 'No description provided.'}
              </p>

              <div
                style={{
                  marginTop: 'auto',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  {hasSale && (
                    <span
                      style={{
                        fontSize: '0.85rem',
                        textDecoration: 'line-through',
                        color: 'var(--text-muted)',
                        marginRight: '8px',
                      }}
                    >
                      ${originalDisplay.toFixed(2)}
                    </span>
                  )}
                  <span
                    style={{
                      fontSize: '1.25rem',
                      fontWeight: 700,
                      color: 'white',
                    }}
                  >
                    ${displayPrice.toFixed(2)}
                  </span>
                </div>

                <Link
                  href={`/commerce/products/${product.id}`}
                  className="btn-primary"
                  style={{
                    padding: '8px 16px',
                    borderRadius: '8px',
                    fontSize: '0.875rem',
                  }}
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
