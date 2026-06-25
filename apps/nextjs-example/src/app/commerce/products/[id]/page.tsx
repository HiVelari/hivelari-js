import { getVelariClient } from '@/lib/velari';
import type { Metadata } from 'next';
import Link from 'next/link';
import ProductViewer from './_components/ProductViewer';

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
    const client = await getVelariClient();
    const response = await client.commerce.getProduct(id);
    return {
      title: `${response.data.name} | Velari Commerce`,
      description:
        response.data.description || `View details of ${response.data.name}`,
    };
  } catch {
    return {
      title: 'Product Details | Velari Commerce',
      description: 'Detailed product profile page',
    };
  }
}

export default async function CommerceProductPage({ params }: ProductProps) {
  const { id } = await params;

  let product = null;
  let errorMsg: string | null = null;

  try {
    const client = await getVelariClient();
    const response = await client.commerce.getProduct(id);
    product = response.data;
  } catch (error: unknown) {
    console.error(`❌ Failed loading product ${id}:`, error);
    errorMsg = error instanceof Error ? error.message : String(error);
  }

  if (errorMsg || !product) {
    return (
      <div style={{ padding: '40px 0', maxWidth: '800px', margin: '0 auto' }}>
        <Link
          href="/commerce"
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

  return <ProductViewer product={product} />;
}
