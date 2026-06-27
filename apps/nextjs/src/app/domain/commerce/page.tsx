import CartIcon from '@/app/_icons/cart.svg';
import InfoIcon from '@/app/_icons/info.svg';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Commerce — HiVelari SDK',
};

const PAGES = [
  {
    label: 'Products',
    href: '/domain/commerce/products',
    desc: 'Browse, search, and filter the product catalog with client.commerce.listProducts().',
    method: 'client.commerce.listProducts()',
  },
];

export default function CommerceOverviewPage() {
  return (
    <div className="mx-auto max-w-[920px] px-16 pt-16 pb-28 max-[768px]:max-w-full max-[768px]:px-6 max-[768px]:pt-10 max-[768px]:pb-20">
      <div className="mb-10">
        <p className="mb-2.5 font-mono text-[11px] font-medium uppercase tracking-[0.1em] text-accent-light">
          Domain
        </p>
        <div className="mb-3 flex items-center gap-3">
          <div className="flex size-9 items-center justify-center rounded-sm border border-line-accent bg-accent-dim text-accent-light">
            <CartIcon width={18} height={18} />
          </div>
          <h1 className="text-[32px] font-extrabold tracking-[-0.05em] text-ink max-[768px]:text-[26px]">
            Commerce
          </h1>
        </div>
        <p className="max-w-[520px] text-[15px] leading-[1.7] text-ink-2">
          Product listings, digital and physical items, purchasing flows, and
          file delivery — all through a single{' '}
          <code className="inline-code">Velari</code> client.
        </p>
      </div>

      <div className="mb-8 grid grid-cols-2 gap-3 max-[640px]:grid-cols-1">
        {PAGES.map((page, i) => (
          <Link
            key={page.href}
            href={page.href}
            data-reveal
            data-reveal-delay={i + 1}
            className="group flex flex-col gap-3 rounded-md border border-line bg-surface p-6 no-underline transition-[border-color,background,transform] duration-200 hover:-translate-y-[3px] hover:border-line-accent hover:bg-surface-2"
          >
            <div>
              <p className="mb-1 text-[15px] font-semibold tracking-[-0.03em] text-ink">
                {page.label}
              </p>
              <p className="text-[13px] leading-[1.6] text-ink-2">
                {page.desc}
              </p>
            </div>
            <code className="sdk-badge self-start">{page.method}</code>
          </Link>
        ))}

        <div className="flex flex-col gap-3 rounded-md border border-line bg-surface p-6 opacity-50">
          <div>
            <p className="mb-1 text-[15px] font-semibold tracking-[-0.03em] text-ink">
              Purchase
            </p>
            <p className="text-[13px] leading-[1.6] text-ink-2">
              Initiate a product purchase flow with
              client.commerce.purchaseProduct().
            </p>
          </div>
          <div className="flex items-center gap-2">
            <code className="sdk-badge self-start">
              client.commerce.purchaseProduct()
            </code>
            <span className="pill pill-neutral">Coming soon</span>
          </div>
        </div>
      </div>

      <div className="flex gap-4 rounded-md border border-line bg-surface p-5 max-[640px]:flex-col max-[640px]:gap-3">
        <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-sm border border-line-accent bg-accent-dim text-accent-light">
          <InfoIcon width={16} height={16} />
        </div>
        <p className="text-[13px] leading-[1.65] text-ink-2">
          Commerce pages are server-rendered — products are fetched directly
          from the SDK on the server and streamed to the browser. No client-side
          loading states.
        </p>
      </div>
    </div>
  );
}
