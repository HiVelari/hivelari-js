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
      <div style={{ marginBottom: 40 }}>
        <p className="section-label">Commerce</p>
        <h1 className="section-title" style={{ fontSize: 36 }}>Product catalog</h1>
        <p className="section-sub">
          Products fetched server-side via{' '}
          <code className="mono" style={{ fontSize: 13, color: 'var(--accent-text)' }}>client.commerce.listProducts()</code>
        </p>
      </div>

      <StatsPanel spaceId={client.spaceId} baseUrl={client.baseUrl} publicKey={client.pubKey} />
      <SearchForm initialSearch={search} />

      {errorMessage ? (
        <div className="card card-p" style={{ maxWidth: 640 }}>
          <p style={{ fontWeight: 600, color: 'var(--fail)', marginBottom: 8, fontSize: 15 }}>Sandbox offline</p>
          <p className="ink-2" style={{ fontSize: 14, marginBottom: 20, lineHeight: 1.65 }}>
            Could not reach <code className="mono" style={{ fontSize: 12 }}>{client.baseUrl}</code>.
            Start the local sandbox to see products.
          </p>
          <div
            className="terminal"
            style={{ borderRadius: 6 }}
          >
            <div className="terminal-body" style={{ padding: '14px 18px', minHeight: 'auto' }}>
              <span className="t-prompt">❯ </span>
              <span className="t-cmd">pnpm --filter @hivelari/sandbox run serve</span>
            </div>
          </div>
        </div>
      ) : (
        <ProductGrid products={productsResponse?.data ?? []} />
      )}
    </div>
  );
}
