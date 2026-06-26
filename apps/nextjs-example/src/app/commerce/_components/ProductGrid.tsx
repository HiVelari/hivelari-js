import type { Product } from '@hivelari/sdk';
import { DevBadge } from '@/providers/AppProviders';
import Link from 'next/link';

export default function ProductGrid({ products }: { products: Product[] }) {
  if (products.length === 0) {
    return (
      <div className="empty">
        <div style={{ fontSize: 40, marginBottom: 16 }}>🔍</div>
        <h3 className="empty-title">No products found</h3>
        <p className="empty-sub">Try a different search term or clear the filter.</p>
      </div>
    );
  }

  return (
    <div>
      <div style={{ marginBottom: 10, display: 'flex', justifyContent: 'flex-end' }}>
        <DevBadge method="client.commerce.listProducts()" />
      </div>
      <div className="product-grid">
        {products.map((product) => {
          const hasSale = product.salePrice !== null && product.salePrice < product.originalPrice;
          const displayPrice = hasSale && product.salePrice !== null
            ? product.salePrice / 100
            : product.originalPrice / 100;

          return (
            <div key={product.id} className="card product-card card-lift">
              <div className="product-thumb">
                <span>{product.type === 'physical' ? '📦' : '⚡'}</span>
                <span
                  className={`pill ${product.type === 'physical' ? 'pill-accent' : 'pill-neutral'}`}
                  style={{ position: 'absolute', top: 12, right: 12 }}
                >
                  {product.type}
                </span>
              </div>

              <div className="product-body">
                <span className="product-cat">{product.customCategory ?? 'General'}</span>
                <h3 className="product-name">{product.name}</h3>
                <p className="product-desc">{product.description ?? 'No description provided.'}</p>

                <div className="product-foot">
                  <div>
                    {hasSale && (
                      <span className="product-was">${(product.originalPrice / 100).toFixed(2)}</span>
                    )}
                    <span className="product-price">${displayPrice.toFixed(2)}</span>
                  </div>
                  <Link href={`/commerce/products/${product.id}`} className="btn btn-primary btn-sm">
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
