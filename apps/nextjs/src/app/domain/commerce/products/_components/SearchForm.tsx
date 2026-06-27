export default function SearchForm({
  initialSearch,
}: { initialSearch?: string }) {
  const hasSearch = !!initialSearch;

  return (
    <form
      method="GET"
      action="/domain/commerce/products"
      className="flex items-center gap-2"
    >
      <div className="relative flex-1">
        <input
          name="search"
          type="text"
          defaultValue={initialSearch}
          placeholder="Search products…"
          className="input w-full pr-10"
          autoComplete="off"
        />
        {hasSearch && (
          <a
            href="/domain/commerce/products"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[18px] leading-none text-ink-3 hover:text-ink"
            aria-label="Clear search"
          >
            ×
          </a>
        )}
      </div>
      <button type="submit" className="btn btn-ghost btn-sm shrink-0">
        Search
      </button>
    </form>
  );
}
