import { getVelariClient } from '@/lib/velari';
import type { Metadata } from 'next';
import Link from 'next/link';
import ProductViewer from './_components/ProductViewer';

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { id } = await params;
  try {
    const client = await getVelariClient();
    const { data } = await client.commerce.getProduct(id);
    return {
      title: `${data.name} — HiVelari SDK`,
      description: data.description || `View details for ${data.name}`,
    };
  } catch {
    return { title: 'Product — HiVelari SDK' };
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const client = await getVelariClient();

  let product = null;
  let errorMessage: string | null = null;

  try {
    const { data } = await client.commerce.getProduct(id);
    product = data;
  } catch (error: unknown) {
    errorMessage = error instanceof Error ? error.message : String(error);
  }

  if (!product) {
    return (
      <div className="mx-auto max-w-[1040px] px-16 pt-16 pb-28 max-[768px]:max-w-full max-[768px]:px-6 max-[768px]:pt-10 max-[768px]:pb-20">
        <Link
          href="/domain/commerce/products"
          className="btn btn-ghost btn-sm mb-8 inline-flex"
        >
          ← Back to catalog
        </Link>
        <div className="rounded-md border border-line bg-surface p-8">
          <p className="mb-2 text-[15px] font-semibold text-red">
            Failed to load product
          </p>
          <p className="text-[13.5px] text-ink-2">
            {errorMessage ?? 'Product not found.'}
          </p>
        </div>
      </div>
    );
  }

  return <ProductViewer product={product} />;
}
