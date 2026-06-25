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
    <div style={{ padding: '40px 0' }}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1
          style={{
            fontSize: '2.5rem',
            fontWeight: 700,
            background: 'linear-gradient(135deg, white, var(--text-muted))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '12px',
            letterSpacing: '-1px',
          }}
        >
          Storefront Catalog
        </h1>
        <p
          style={{
            fontSize: '1.1rem',
            color: 'var(--text-muted)',
            maxWidth: '600px',
            margin: '0 auto',
          }}
        >
          Explore products using type-safe queries powered by the server-side
          Velari SDK Client.
        </p>
      </div>

      <StatsPanel
        spaceId={client.spaceId}
        baseUrl={client.baseUrl}
        publicKey={client.pubKey}
      />

      <SearchForm initialSearch={search} />

      {errorMessage ? (
        <div
          className="glass-panel"
          style={{
            padding: '32px',
            maxWidth: '800px',
            margin: '0 auto',
            borderLeft: '4px solid var(--color-error)',
            borderRadius: '12px',
          }}
        >
          <h3
            style={{
              color: 'var(--color-error)',
              marginBottom: '8px',
              fontSize: '1.15rem',
            }}
          >
            🔌 Sandbox Offline
          </h3>
          <p
            style={{
              color: 'var(--text-muted)',
              marginBottom: '16px',
              fontSize: '0.95rem',
            }}
          >
            The Velari SDK client failed to connect to the target API host at{' '}
            <code>{client.baseUrl}</code>.{errorMessage && ` (${errorMessage})`}
          </p>
          <div
            style={{
              background: 'rgba(0, 0, 0, 0.2)',
              padding: '16px',
              borderRadius: '8px',
              fontSize: '0.85rem',
            }}
          >
            <p style={{ marginBottom: '8px', fontWeight: 600, color: 'white' }}>
              Start the local sandbox server from your terminal:
            </p>
            <code style={{ color: '#a5b4fc' }}>
              pnpm --filter @hivelari/sandbox run serve
            </code>
          </div>
        </div>
      ) : (
        <ProductGrid products={productsResponse?.data || []} />
      )}
    </div>
  );
}
