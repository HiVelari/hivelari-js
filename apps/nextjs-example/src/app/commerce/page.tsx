import { getVelariClient } from '@/lib/velari';
import type { Metadata } from 'next';
import ProductGrid from './_components/ProductGrid';
import SearchForm from './_components/SearchForm';
import StatsPanel from './_components/StatsPanel';

interface PageProps {
  searchParams: Promise<{
    search?: string;
    page?: string;
  }>;
}

export const metadata: Metadata = {
  title: 'Commerce Domain Catalog | HiVelari',
  description:
    'Browse product collections and check digital/physical specifications via HiVelari commerce endpoints.',
};

export default async function CommerceCatalogPage({ searchParams }: PageProps) {
  const client = await getVelariClient();
  const params = await searchParams;
  const search = params.search || '';

  let productsResponse = null;
  let errorMessage: string | null = null;

  try {
    const response = await client.commerce.listProducts({
      search: search || undefined,
    });
    productsResponse = response.data;
  } catch (error: unknown) {
    console.error('❌ Catalog Page Load Failed:', error);
    errorMessage = error instanceof Error ? error.message : String(error);
  }

  return (
    <div className="wrap page">
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 6 }}>Commerce Catalog</h1>
        <p className="text-secondary" style={{ fontSize: 14 }}>
          Products fetched server-side via <code className="mono">client.commerce.listProducts()</code>
        </p>
      </div>

      <StatsPanel spaceId={client.spaceId} baseUrl={client.baseUrl} publicKey={client.pubKey} />
      <SearchForm initialSearch={search} />

      {errorMessage ? (
        <div className="card card-body">
          <p style={{ fontWeight: 600, color: 'var(--red)', marginBottom: 8 }}>Sandbox offline</p>
          <p className="text-secondary" style={{ fontSize: 14, marginBottom: 16 }}>
            Could not reach <code className="mono">{client.baseUrl}</code>. Start the sandbox server:
          </p>
          <code
            className="mono"
            style={{
              display: 'block',
              background: 'var(--bg)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-sm)',
              padding: '10px 14px',
              fontSize: 13,
              color: 'var(--accent)',
            }}
          >
            pnpm --filter @hivelari/sandbox run serve
          </code>
        </div>
      ) : (
        <ProductGrid products={productsResponse?.data ?? []} />
      )}
    </div>
  );
}
