import type { Product } from '@hivelari/sdk';
import Link from 'next/link';

export default function ProductGrid({ products }: { products: Product[] }) {
  if (products.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon">🔍</div>
        <h3 className="empty-state-title">No products found</h3>
        <p className="empty-state-text">Try a different search term or clear the filter.</p>
      </div>
    );
  }

  return (
    <div className="grid-auto">
      {products.map((product) => {
        const hasSale = product.salePrice !== null && product.salePrice < product.originalPrice;
        const displayPrice = hasSale && product.salePrice !== null
          ? product.salePrice / 100
          : product.originalPrice / 100;

        return (
          <div key={product.id} className="card product-card card-hover">
            <div className="product-thumb">
              <span style={{ fontSize: 32 }}>{product.type === 'physical' ? '📦' : '⚡'}</span>
              <span
                className={`badge ${product.type === 'physical' ? 'badge-blue' : 'badge-neutral'}`}
                style={{ position: 'absolute', top: 10, right: 10 }}
              >
                {product.type}
              </span>
            </div>

            <div className="product-body">
              <span className="product-category">{product.customCategory ?? 'General'}</span>
              <h3 className="product-name">{product.name}</h3>
              <p className="product-desc">{product.description ?? 'No description provided.'}</p>

              <div className="product-footer">
                <div>
                  {hasSale && (
                    <span className="product-original">${(product.originalPrice / 100).toFixed(2)}</span>
                  )}
                  <span className="product-price">${displayPrice.toFixed(2)}</span>
                </div>
                <Link href={`/commerce/products/${product.id}`} className="btn btn-primary btn-sm">
                  View →
                </Link>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
