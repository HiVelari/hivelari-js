import Link from 'next/link';
import { velari } from '@/lib/velari';
import type { Metadata } from 'next';

interface ProductProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({
  params,
}: ProductProps): Promise<Metadata> {
  const { id } = await params;
  try {
    const response = await velari.commerce.getProduct(id);
    return {
      title: `${response.data.name} | Velari Storefront`,
      description:
        response.data.description || `View details of ${response.data.name}`,
    };
  } catch {
    return {
      title: 'Product Details | Velari Storefront',
      description: 'Detailed product profile page',
    };
  }
}

export default async function ProductPage({ params }: ProductProps) {
  const { id } = await params;

  let product = null;
  let errorMsg: string | null = null;

  try {
    const response = await velari.commerce.getProduct(id);
    product = response.data;
  } catch (error: unknown) {
    console.error(`❌ Failed loading product ${id}:`, error);
    errorMsg = error instanceof Error ? error.message : String(error);
  }

  if (errorMsg || !product) {
    return (
      <div style={{ padding: '40px 0', maxWidth: '800px', margin: '0 auto' }}>
        <Link
          href="/"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            color: 'var(--color-primary)',
            fontWeight: 600,
            marginBottom: '24px',
          }}
        >
          ← Back to Catalog
        </Link>
        <div
          className="glass-panel"
          style={{
            padding: '32px',
            borderLeft: '4px solid var(--color-error)',
          }}
        >
          <h3 style={{ color: 'var(--color-error)', marginBottom: '8px' }}>
            Error Loading Product
          </h3>
          <p style={{ color: 'var(--text-muted)' }}>
            {errorMsg || 'Product not found.'}
          </p>
        </div>
      </div>
    );
  }

  const hasSale =
    product.salePrice !== null && product.salePrice < product.originalPrice;
  const displayPrice =
    hasSale && product.salePrice !== null
      ? product.salePrice / 100
      : product.originalPrice / 100;
  const originalDisplay = product.originalPrice / 100;

  return (
    <div
      style={{
        padding: '40px 0',
        maxWidth: '1000px',
        margin: '0 auto',
        width: '100%',
      }}
    >
      <Link
        href="/"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          color: 'var(--color-primary)',
          fontWeight: 600,
          marginBottom: '32px',
        }}
      >
        ← Back to Catalog
      </Link>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '48px',
        }}
      >
        {/* Left Column: Visual Showcase & Specifications */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div
            className="glass-panel"
            style={{
              aspectRatio: '1.2',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background:
                'linear-gradient(135deg, rgba(99, 102, 241, 0.05), rgba(168, 85, 247, 0.05))',
              fontSize: '4rem',
              position: 'relative',
            }}
          >
            {product.type === 'physical' ? '📦' : '⚡'}

            <span
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                padding: '6px 12px',
                borderRadius: '20px',
                fontSize: '0.8rem',
                fontWeight: 600,
                textTransform: 'uppercase',
                background:
                  product.type === 'physical'
                    ? 'rgba(99, 102, 241, 0.15)'
                    : 'rgba(168, 85, 247, 0.15)',
                border: `1px solid ${product.type === 'physical' ? 'rgba(99, 102, 241, 0.3)' : 'rgba(168, 85, 247, 0.3)'}`,
                color: product.type === 'physical' ? '#a5b4fc' : '#e9d5ff',
              }}
            >
              {product.type} Product
            </span>
          </div>

          {/* Detailed Specifications Panel */}
          <div className="glass-panel" style={{ padding: '24px' }}>
            <h3
              style={{
                fontSize: '1.1rem',
                marginBottom: '16px',
                fontWeight: 600,
              }}
            >
              Specifications
            </h3>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                fontSize: '0.9rem',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  borderBottom: '1px solid rgba(255,255,255,0.05)',
                  paddingBottom: '8px',
                }}
              >
                <span style={{ color: 'var(--text-muted)' }}>Category</span>
                <span style={{ color: 'white', fontWeight: 500 }}>
                  {product.customCategory || 'General'}
                </span>
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  borderBottom: '1px solid rgba(255,255,255,0.05)',
                  paddingBottom: '8px',
                }}
              >
                <span style={{ color: 'var(--text-muted)' }}>Product ID</span>
                <span style={{ color: 'white', fontFamily: 'monospace' }}>
                  {product.id}
                </span>
              </div>

              {product.type === 'physical' ? (
                <>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      borderBottom: '1px solid rgba(255,255,255,0.05)',
                      paddingBottom: '8px',
                    }}
                  >
                    <span style={{ color: 'var(--text-muted)' }}>
                      Unit Type
                    </span>
                    <span style={{ color: 'white' }}>
                      {product.physicalUnit || 'piece'}
                    </span>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      borderBottom: '1px solid rgba(255,255,255,0.05)',
                      paddingBottom: '8px',
                    }}
                  >
                    <span style={{ color: 'var(--text-muted)' }}>In Stock</span>
                    <span
                      style={{
                        color:
                          (product.physicalQuantityAvailable || 0) > 10
                            ? 'var(--color-success)'
                            : 'var(--color-warning)',
                        fontWeight: 600,
                      }}
                    >
                      {product.physicalQuantityAvailable !== null
                        ? `${product.physicalQuantityAvailable} units`
                        : 'Out of stock'}
                    </span>
                  </div>
                </>
              ) : (
                <>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      borderBottom: '1px solid rgba(255,255,255,0.05)',
                      paddingBottom: '8px',
                    }}
                  >
                    <span style={{ color: 'var(--text-muted)' }}>
                      Files Included
                    </span>
                    <span style={{ color: 'white' }}>
                      {product.files?.length || 0} file(s)
                    </span>
                  </div>
                  {product.files && product.files.length > 0 && (
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '6px',
                        paddingLeft: '12px',
                        marginTop: '4px',
                      }}
                    >
                      {product.files.map((file) => (
                        <div
                          key={file.id}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            fontSize: '0.85rem',
                            color: 'var(--text-muted)',
                          }}
                        >
                          <span>📄</span>
                          <span>{file.title || 'File attachment'}</span>
                          {file.license && (
                            <span
                              style={{
                                fontSize: '0.75rem',
                                background: 'rgba(255,255,255,0.05)',
                                padding: '1px 6px',
                                borderRadius: '4px',
                              }}
                            >
                              {file.license}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  paddingTop: '4px',
                }}
              >
                <span style={{ color: 'var(--text-muted)' }}>
                  Requires Approval
                </span>
                <span style={{ color: 'white' }}>
                  {product.requiresApproval ? 'Yes' : 'No'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Title, Description, and Order Panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div>
            <span
              style={{
                background: 'rgba(99, 102, 241, 0.1)',
                border: '1px solid rgba(99, 102, 241, 0.2)',
                color: '#a5b4fc',
                padding: '6px 12px',
                borderRadius: '6px',
                fontSize: '0.75rem',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '1px',
                display: 'inline-block',
                marginBottom: '16px',
              }}
            >
              {product.customCategory || 'General'}
            </span>

            <h1
              style={{
                fontSize: '2.25rem',
                fontWeight: 700,
                color: 'white',
                lineHeight: '1.2',
                marginBottom: '16px',
              }}
            >
              {product.name}
            </h1>

            <div
              style={{
                display: 'flex',
                alignItems: 'baseline',
                gap: '12px',
                marginBottom: '24px',
              }}
            >
              {hasSale && (
                <span
                  style={{
                    fontSize: '1.1rem',
                    textDecoration: 'line-through',
                    color: 'var(--text-muted)',
                  }}
                >
                  ${originalDisplay.toFixed(2)}
                </span>
              )}
              <span
                style={{
                  fontSize: '2rem',
                  fontWeight: 700,
                  color: 'white',
                }}
              >
                ${displayPrice.toFixed(2)} {product.currency}
              </span>
            </div>
          </div>

          <div
            style={{
              borderTop: '1px solid var(--border-color)',
              borderBottom: '1px solid var(--border-color)',
              padding: '24px 0',
            }}
          >
            <h3
              style={{
                fontSize: '1.1rem',
                marginBottom: '12px',
                fontWeight: 600,
              }}
            >
              Description
            </h3>
            <p
              style={{
                color: 'var(--text-muted)',
                lineHeight: '1.6',
                fontSize: '1rem',
              }}
            >
              {product.description || 'No product description provided.'}
            </p>
          </div>

          {/* Action Order Box */}
          <div
            className="glass-panel"
            style={{
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
            }}
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
                  style={{
                    display: 'block',
                    fontSize: '0.8rem',
                    color: 'var(--text-muted)',
                  }}
                >
                  Total Price
                </span>
                <span
                  style={{
                    fontSize: '1.3rem',
                    fontWeight: 700,
                    color: 'white',
                  }}
                >
                  ${displayPrice.toFixed(2)}
                </span>
              </div>
              <span
                style={{
                  fontSize: '0.85rem',
                  color: 'var(--text-success)',
                  background: 'rgba(16, 185, 129, 0.1)',
                  padding: '4px 10px',
                  borderRadius: '20px',
                }}
              >
                ✔ Instantly Available
              </span>
            </div>

            <button
              type="button"
              className="btn-primary"
              style={{ width: '100%', padding: '14px' }}
            >
              Purchase Product
            </button>

            <p
              style={{
                fontSize: '0.75rem',
                color: 'var(--text-muted)',
                textAlign: 'center',
              }}
            >
              Secure simulated checkout checkout. No real money will be charged.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
