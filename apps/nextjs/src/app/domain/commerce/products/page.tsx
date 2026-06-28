import velariClient from '@/lib/velari';
import type { Metadata } from 'next';
import ProductGrid from './_components/ProductGrid';
import SearchForm from './_components/SearchForm';

export const metadata: Metadata = {
  title: 'Products — HiVelari SDK',
};

interface PageProps {
  searchParams: Promise<{ search?: string }>;
}

export default async function ProductsPage({ searchParams }: PageProps) {
  const { search } = await searchParams;

  let products:
    | Awaited<ReturnType<typeof velariClient.commerce.listProducts>>['data']
    | null = null;
  let errorMessage: string | null = null;

  try {
    const response = await velariClient.commerce.listProducts({
      search: search || undefined,
    });
    products = response.data;
  } catch (error: unknown) {
    errorMessage = error instanceof Error ? error.message : String(error);
  }

  return (
    <div className="mx-auto max-w-[1040px] px-16 pt-16 pb-28 max-[768px]:max-w-full max-[768px]:px-6 max-[768px]:pt-10 max-[768px]:pb-20">
      <div className="mb-10">
        <p className="mb-2 font-mono text-[11px] font-medium uppercase tracking-[0.1em] text-accent-light">
          commerce.listProducts
        </p>
        <h1 className="mb-2.5 text-[28px] font-extrabold tracking-[-0.04em] text-ink">
          Product catalog
        </h1>
        <p className="text-[14px] leading-[1.7] text-ink-2">
          Products are fetched server-side on every request. Use the search box
          to filter — the query is forwarded to the SDK.
        </p>
      </div>

      <div className="mb-8">
        <SearchForm initialSearch={search} />
      </div>

      {errorMessage ? (
        <div className="flex flex-col gap-4 rounded-md border border-line bg-surface p-8">
          <p className="text-[15px] font-semibold text-red">Sandbox offline</p>
          <p className="text-[13.5px] leading-[1.65] text-ink-2">
            Could not reach the API. Make sure the sandbox is running, then
            reload.
          </p>
          <div className="rounded-sm border border-line bg-bg px-5 py-4 font-mono text-[12.5px] text-ink-2">
            <span className="text-accent-light">❯ </span>
            pnpm --filter @hivelari/sandbox run serve
          </div>
          <p className="font-mono text-[11.5px] text-red">{errorMessage}</p>
        </div>
      ) : (
        <ProductGrid products={products?.data ?? []} />
      )}
    </div>
  );
}
