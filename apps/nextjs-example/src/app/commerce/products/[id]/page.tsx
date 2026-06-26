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
      <div className="wrap page">
        <Link href="/commerce" className="btn btn-ghost btn-sm" style={{ marginBottom: 24, display: 'inline-flex' }}>
          ← Back to catalog
        </Link>
        <div className="card card-body">
          <p style={{ fontWeight: 600, color: 'var(--red)', marginBottom: 6 }}>Failed to load product</p>
          <p className="text-secondary" style={{ fontSize: 14 }}>{errorMsg ?? 'Product not found.'}</p>
        </div>
      </div>
    );
  }

  return <ProductViewer product={product} />;
}
